let wordLines = document.querySelector(".word-lines")

alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let row = 0
let column = 0
let guess = ""
let win = false

const words = ["horse", "train", "paste", "tooth", "fruit", "eight", "skate", "human", "climb", "chair", "house"]
const answer = words[Math.floor(Math.random()*words.length)].toUpperCase()

function getRow() {
    return wordLines.childNodes[1 + row * 2]
}
function getColumn() {
    return wordLines.childNodes[1 + row * 2].childNodes[1 + column * 2]
}


function checkGuess(guess, answer) {
    for (let i = 0; i < 5; i++) {
        if (guess[i] === answer[i]) {
            wordLines.childNodes[1 + row * 2].childNodes[1 + i * 2].style.backgroundColor = "green"
            let answerWord = document.querySelector("h2").innerText
            document.querySelector("h2").innerText = answerWord.substring(0, i) + guess[i] + answerWord.substring(i + 1) // this replaces an '_' in the h2 element at index 'i' with the correct character
        } else if (answer.includes(guess[i])) {
            wordLines.childNodes[1 + row * 2].childNodes[1 + i * 2].style.backgroundColor = "yellow"
        }
    }
    if (guess === answer) {
        win = true
        document.querySelector("h1").innerText = "You Won!"
        document.querySelector("h2").style.color = "green"
    }
}

document.body.onkeydown = function(event) {
    keypress = event.key.toUpperCase()

    if (row < 6 && win === false) {
        let currentRow = getRow()
        let currentColumn = getColumn()
    
        if (alphabet.includes(keypress)) {
            if (column < 5) {
                guess += keypress
                currentColumn.innerText = keypress
                column += 1
            }
        } else if (keypress === "ENTER") {
            if (column === 5) {
                checkGuess(guess, answer)
                row += 1
                column = 0
                guess = ""
            }

            if (row === 6 && win === false) {
                document.querySelector("h1").innerText = "You Lost :("
                document.querySelector("h2").innerText = answer
                document.querySelector("h2").style.color = "red"
            }
        } else if (keypress === "BACKSPACE") {
            if (column > 0) {
                guess = guess.substring(0, guess.length - 1)
                column -= 1
                currentColumn = getColumn()
                currentColumn.innerText = ""
            }
        }
    }
}

function createWordLines() {
    for (let i = 0; i < 6; i++) {
        wordLines.innerHTML += `
        <ul id="${i}">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>`
    }
}

createWordLines()
