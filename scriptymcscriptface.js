function generateHexCode(amount){
    const randomList = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
    var returnList = []
    for (let i = 0; i < amount; i++) {
        newCode = []
        for (let j = 0; j < 6; j++) {
            newCode[j] = randomList[Math.floor(Math.random() * randomList.length)]
        }
        returnList.push(newCode.join(""))
    }

    return returnList
}

const chosenHexCode = generateHexCode(1)

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
        newInput.oninput = ((e) => moveAlong(e, `r${rowNum}t${i}`))
        row.append(newInput)
    }
}

generateRow(1)

function moveAlong(event, elementID){
    const rowNum = elementID.split("r")[1].split("t")[0]
    const textNum = parseInt(elementID.split("t")[1])
// IF BACKSPACE, move backwards instead!!!!
    if(textNum === 5) return

    document.getElementById(`r${rowNum}t${textNum + 1}`).focus()
}