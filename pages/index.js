import Row from '@/components/row';
import { useEffect } from 'react';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Home(){
  const { data: session, status } = useSession()
  const router = useRouter();

  // Always should hold the current row that is being typed into
  var currentRow = 0;

  // All are strings for simplicity when comparing to key presses
  const validChars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]

  // Generate the HEX code to guess and set the background to that colour

  var hexCode = [];

  for (let i = 0; i < 6; i++) {
    hexCode.push(validChars[Math.floor(Math.random() * validChars.length)])
  }

  hexCode = hexCode.join("")

  function keypressHandler(event){
    // Get the key pressed as a string in uppercase
    var keyPressed = String(event.key).toUpperCase()

    // If the key pressed is not a hex value, ignore it UNLESS it is a backspace or an enter, which are handled in another function
    if(keyPressed === "ENTER" || keyPressed === "BACKSPACE") return handleSpecial(keyPressed)
    if(!validChars.includes(keyPressed)) return

    var nextWriteElement = getNextEmptyElementInRow()

    // If the key is pressed after all text has been inputted, ignore it
    if(!nextWriteElement) return

    nextWriteElement.innerHTML = keyPressed
    
  }

  function handleSpecial(keyPressed){
    // Handle the pressing of the backspace key
    if(keyPressed === "BACKSPACE"){
      // This is the next empty one, so we can just move left once using the ID attribute
      var nextEmpty = getNextEmptyElementInRow()

      // If there is no next box in the row, it must be the last box (rowXbox5), just empty that.
      if(!nextEmpty) return document.getElementById(`row${currentRow}box5`).innerHTML = null
      var elToEmpty = document.getElementById(`row${currentRow}box${parseInt(nextEmpty.id.split("box")[1]) - 1}`)

      // If elToEmpty is null, it means we are at the first box in the row (rowXbox0), just stop here.
      if(!elToEmpty) return 

      elToEmpty.innerHTML = null;
    }

    // Handle the pressing of the enter key
    if(keyPressed === "ENTER"){
      // Ensure that all of the elements have a value in them and also store each value into a list to compare later
      var rowBoxes = document.getElementById("row"+currentRow).children;
      var userInput = []
      var hasFilledAllBoxes = true
      for (let i = 0; i < rowBoxes.length; i++) {
        if(!rowBoxes[i].innerHTML) hasFilledAllBoxes = false
        userInput.push(rowBoxes[i].innerHTML)
      }

      if(!hasFilledAllBoxes){
        // TODO: Do something to indicate this is wrong e.g. shake screen
        return
      }

      // Remove the hash from the list, which will be the first element of the list 
      userInput.shift()

      var compareCode = hexCode.split("")

      var correctCount = 0

      userInput.forEach((e, count) => {
        // The value is in the correct place, it should be marked green

        const el = document.getElementById(`row${currentRow}box${count}`)

        if(e === compareCode[count]){
          el.style.backgroundColor = "#00FF00"
          compareCode[count] = "Y"
          correctCount++;
          return
        }
      })

      userInput.forEach((e, count) => {
        const el = document.getElementById(`row${currentRow}box${count}`)
        if(compareCode[count] === "Y") return
        if(compareCode[count] === "X") return el.style.backgroundColor = "#808080"
        
        if(!compareCode.includes(userInput[count])){
          return el.style.backgroundColor = "#808080"
        }else{
          compareCode[compareCode.indexOf(userInput[count])] = "X"
          el.style.backgroundColor = "#FFA500"
        }
      })


      console.log(correctCount)
      if(correctCount === 6){
        // They have succeeded!!!!
        return router.push("/win?ans="+hexCode)
      }
      if(currentRow === 9){
        // They completed the last row, it should only get here if they have failed :(
        return router.push("/lose?ans="+hexCode)
      }
      // Move to next row
      currentRow++;
    }
  }

  function getNextEmptyElementInRow(){
    // Get all the boxes in the current row
    var rowBoxes = document.getElementById("row"+currentRow).children;
    // Store the empty element (the furthest left in the row that has no content)
    var nextWriteElement;

    // Finds the first empty element (the hash is therefore also ignored)
    for (let i = 6; i > 0; i--) {
      if(rowBoxes[i].innerHTML.length === 0){
        nextWriteElement = rowBoxes[i]
      }
    }

    return nextWriteElement
  }

  useEffect(() => {
    const signInToKeycloak = async () => {
      await signIn('keycloak');
    };

    if (status === 'loading') {
      // Session is being fetched, do nothing until it's ready
      return;
    }
    
    if (!session) {
      // User is not logged in, redirect to Keycloak login
      signInToKeycloak();
    } else {
      // User is already logged in, you can perform actions for authenticated users here
      console.log('User is logged in.');
    }
    
    window.addEventListener("keydown", keypressHandler)

    // Set the background colour to the hex code to guess
    document.getElementById("main").style.backgroundColor = "#"+hexCode

    // While testing, I learnt that the auto reloading of nextjs doubled the eventlistener being ran, this functions clears it out before it is re-created.
    return () => {
      window.removeEventListener('keydown', keypressHandler)
    }
  })

  if(status === "unauthenticated"){
    return (
      <body className='bg-slate-600'>
        <div className='hidden' id='main'></div>
      </body>
    )
  }

  if(status === "authenticated"){
    return (
      <div className="w-screen min-h-screen" id="main">
        <title>What The Hexle?</title>
  
        <div className="flex items-center justify-center w-full h-32">
          <h1 className={`text-5xl ${roboto.className} bg-slate-400 text-white py-4 px-4 rounded`}>What The Hexle?</h1>
        </div>
  
        <div className="flex justify-center w-full">
          <div className="p-10 rounded bg-slate-400">
            <Row rowNum={0} />
            <Row rowNum={1} />
            <Row rowNum={2} />
            <Row rowNum={3} />
            <Row rowNum={4} />
            <Row rowNum={5} />
            <Row rowNum={6} />
            <Row rowNum={7} />
            <Row rowNum={8} />
            <Row rowNum={9} />
          </div>
        </div>
  
      </div>
    )
  }

}