const hexList = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];

function generateHexCode(amount){
    var returnList = []
    for (let i = 0; i < amount; i++) {
        newCode = []
        for (let j = 0; j < 6; j++) {
            newCode[j] = hexList[Math.floor(Math.random() * hexList.length)]
        }
        returnList.push(newCode.join(""))
    }

    return returnList
}

const chosenHexCode = generateHexCode(1)
console.log(chosenHexCode+" is the correct answer")
document.getElementById("hexImageBlock").style.backgroundColor = "#"+chosenHexCode;

function generateRow(rowNum){
    const row = document.getElementById("row"+rowNum)

    var hash = document.createElement("p")
    hash.innerHTML = "#"
    hash.classList = "w-10 h-10 bg-slate-100 m-2 text-center"
    row.append(hash)
    
    for (let i = 0; i < 6; i++) {
        var newInput = document.createElement("input");
        newInput.maxLength = "1"
        newInput.classList = "w-10 h-10 m-2 text-center uppercase"
        newInput.type = "text"
        newInput.id = `r${rowNum}t${i}`
        // newInput.onkeydown =
        newInput.onkeyup = ((e) => moveAlong(e, `r${rowNum}t${i}`))
        row.append(newInput)
    }
}

generateRow(1)
generateRow(2)
generateRow(3)
generateRow(4)
generateRow(5)
generateRow(6)

function moveAlong(event, elementID){
    const rowNum = elementID.split("r")[1].split("t")[0]
    const textNum = parseInt(elementID.split("t")[1])
    const key = event.keyCode || event.charCode;
    const element = document.getElementById(elementID)

    //Enter key pressed
    if(key === 13){
        // NEXT ROW, CHECK GUESS HERE
        checkGuess(rowNum)
        return
    }


        //backspace handling, ignoring the first as you cannot go back from there
    //also emptying the element you backspaced into unless moving back from text5
    if(key === 8){
        if(textNum === 0) return
        var el = document.getElementById(`r${rowNum}t${textNum - 1}`)
        // if(textNum !== 5){
        //     el.value = ""
        // }
        el.focus();
        return
    }

    // if not a hexidecimal value
    
    if(!hexList.includes(event.key.toUpperCase())){
        //perhaps move this to onkeydown so it doesn't flicker
        element.value = ""
        return
    }
    //ENSURE THAT IF TYPED, IT IS ACTUALLY PUT IN THE ELEMENT
    element.value = event.key.toUpperCase()

    if(textNum === 5) return
    document.getElementById(`r${rowNum}t${textNum + 1}`).focus()
}

function checkGuess(rowNum){
    const rowEl = document.getElementById("row"+rowNum)
    const textEls = rowEl.children

    var userInput = []

    for (let i = 1; i < 7; i++) {
        userInput.push(textEls[i].value)
    }

    if(userInput.includes("")) return

    var answer = chosenHexCode[0].split("")

    for (let i = 0; i < 6; i++){
        document.getElementById(`r${rowNum}t${i}`).setAttribute("disabled", "true")
        document.getElementById(`r${parseInt(rowNum) + 1}t0`).focus()
        if(answer[i] === userInput[i]){
            document.getElementById(`r${rowNum}t${i}`).classList.add("bg-green-500")
            continue
        }
        if(answer.includes(userInput[i])){
            document.getElementById(`r${rowNum}t${i}`).classList.add("bg-orange-500")
            continue
        }
        document.getElementById(`r${rowNum}t${i}`).classList.add("bg-slate-500")
    }

}