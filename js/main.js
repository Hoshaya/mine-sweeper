

// const MINE = '🧨'
const MINE = '🎆'
// const MINE = '🎇'
const FLAG = '🚩'
// const MINE = 'mine'

var gBoard
var gMatSize = 4

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var maxLloss = 3
var gMines = 2
var maxFlegs = gMines
var gMinesLocation = []
var starter = 0










function onInit() {
    // gGame.isOn = true
    starter = 0


    board = createBoard()
    gBoard = runGeneration(board)
    gGame.shownCount = 0
    maxLloss = 3
    console.log(gGame.isOn)

    // if (gGame.isOn) gInterval = setInterval(timer, 1000)
    var elFlag = document.querySelector('.markedCount')
    elFlag.innerHTML = gMines - gGame.markedCount


    renderBoard(gBoard)

}


function setLevel(size) {

    clearInterval(gInterval)


    if (size === 4) {
        gMatSize = size
        gMines = 2
        maxLloss = 3

    } else if (size === 8) {
        gMatSize = size
        gMines = 14
        maxLloss = 3

        console.log('maxLloss', maxLloss)
    } else if (size === 12) {
        gMatSize = size
        gMines = 32
        maxLloss = 3

    }

    gGame.isOn = true
    // clearInterval(gInterval)
    var elLife = document.querySelector('.life')
    elLife.innerHTML = maxLloss





    onInit()

}


function createBoard() {
    var board = []

    // gMatSize = 4
    for (var i = 0; i < gMatSize; i++) {
        board.push([])
        for (var j = 0; j < gMatSize; j++) {
            board[i][j] = {
                minesAroundCount: '',
                isShown: false,
                isMine: '',
                isMarked: true,
            }
        }
    }
    for (var i = 0; i < gMines; i++) {

        var randomLocation = getRandomLocation()
        gMinesLocation.push(randomLocation)

        board[randomLocation.indexI][randomLocation.indexJ].isMine = MINE


    }
    return board
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var negsCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) negsCount++
            if (board[i][j].isMine === MINE) negsCount++
        }
    }
    return negsCount
}

function renderBoard(board) {
    var strHTML = ''
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var isMine = board[i][j].isMine
            var numNegsMine = board[i][j].minesAroundCount
            var currCell = isMine ? isMine : numNegsMine


            // }
            // strHTML += `<td class="td${i}${j}" data-i="${i}" data-j="${j}" onclick="onCellClicked(this, '${currCell}',${i},${j})" >${currCell}</td>`
            // strHTML += `<td  class="td${i}${j}" data-i="${i}" data-j="${j}" onclick="onCellClicked(this, '${currCell}',${i},${j})  onmousedown="cellMarked(event,0,1)" ></td>`
            // strHTML += `<td class="td${i}${j}" data-i="${i}" data-j="${j}" onmousedown="onCellClicked(this,0,1, '${currCell}',${i},${j})"  ></td>`
            strHTML += `<td class="td" data-i="${i}" data-j="${j}" onmousedown="onCellClicked(this,'${currCell}',${i},${j},event,0,1)"  ></td>`
            // showElement(strHTML)
            // var elBoard = document.querySelector('.td')
            // elBoard.innerText = 'hidden'
        }
        strHTML += '</tr>'
    }

    elBoard.innerHTML += strHTML
}



// var starter = 0
function onCellClicked(elTd, currCell, i, j, elCell, num1, num2) {
    if (!starter) {
        starter++
        gGame.isOn = true

        if (gGame.isOn) gInterval = setInterval(timer, 1000)
    }

    // expandShown(gBoard, elTd, i, j)

    if (!gGame.isOn) return


    cellMarkedMine(elTd, currCell, i, j, elCell)
    cellMarkedFlags(elTd, elCell, i, j)
}


// for (var k = i - 1; k <= i + 1; k++) {
//     if (k < 0 || k >= board.length) continue
//     for (var c = j - 1; c <= j + 1; c++) {
//         if (k === i && c === j) continue
//         if (c < 0 || c >= board[0].length) continue
//         // if (mat[k][c] === LIFE || mat[k][c] === SUPER_LIFE) negsCount++
//         if (board[k][c].isMine !== MINE) {
//             // var elTdd = document.queryCommandValue(`.td${k}${j}`)
//             var elTdd = document.queryCommandValue('.td11')
//             elTdd.style.backgroundColor = 'rgb(251, 245, 245)'


//             console.log(board[k][c])
//         }
//     }
// }

function cellMarkedMine(elTd, currCell, i, j, elCell) {



    if (elCell.button === 0) {
        if (elTd.innerHTML === FLAG) return
        // gBoard.isShown = true

        if (elTd.innerHTML !== MINE) {

            if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) gGame.shownCount++
            gBoard[i][j].isShown = true

            elTd.style.backgroundColor = 'rgb(251, 245, 245)'
            console.log(gGame.shownCount)
            checkWin()
            // console.log(gGame.shownCount)

            elTd.innerHTML = gBoard[i][j].minesAroundCount
            gBoard[i][j].isShown = true
        }

        // expandShown(gBoard, elTd, i, j)

        var count = 0
        if (currCell === MINE) {
            maxLloss--
            var elLife = document.querySelector('.life')
            elLife.innerHTML = maxLloss


            if (!maxLloss) {
                elTd.innerHTML = gBoard[i][j].isMine
                elTd.style.backgroundColor = ' rgb(235, 57, 57)'

                checkGameOver()

                return

            }
            gBoard[i][j].isShown = false

            elTd.innerHTML = gBoard[i][j].isMine
            elTd.style.backgroundColor = ' rgb(235, 57, 57)'

            setTimeout(() => {
                elTd.innerHTML = ''
                elTd.style.backgroundColor = 'gray'
            }, 400)


            // elTd.innerHTML = gBoard[i][j].isMine




        }

    }

}

// function cellMarkedCountNegsMines(elTd, currCell, i, j, elCell){


// }

function cellMarkedFlags(elTd, elCell, i, j) {

    if (!gBoard[i][j].isShown) {
        if (elCell.button === 2 && (elTd.innerHTML === '' || elTd.innerHTML === FLAG)) {


            if (elTd.innerHTML === FLAG) {
                elTd.innerHTML = ''
                gGame.markedCount--
                var elFlag = document.querySelector('.markedCount')
                elFlag.innerHTML = gMines - gGame.markedCount
                return
            }



            elTd.innerHTML = FLAG
            gGame.markedCount++
            console.log(gGame.markedCount)
            var elFlag = document.querySelector('.markedCount')
            elFlag.innerHTML = gMines - gGame.markedCount


        }
    }








}

function runGeneration(board) {
    var newBoard = copyMat(board)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {

            var currCell = board[i][j].isMine
            var numOfNegs = setMinesNegsCount(board, i, j)
            if (currCell !== MINE) {
                currCell = numOfNegs
                if (currCell === 0) currCell = ''

                board[i][j].minesAroundCount = currCell

            }

        }
    }
    return newBoard
}


function checkWin() {

    var sumCells = gMatSize ** 2
    // console.log('gMines', gMines)
    // console.log('sumCells', sumCells)
    // console.log('gGame.shownCount', gGame.shownCount)

    if (gGame.shownCount === sumCells - gMines) {

        gGame.isOn = false
        clearInterval(gInterval)

        var elEmoji = document.querySelector('.emoji')
        elEmoji.innerHTML = '🤩'

    }

}


function checkGameOver() {





    if (!maxLloss) {

        gGame.isOn = false
        clearInterval(gInterval)
        var elEmoji = document.querySelector('.emoji')
        elEmoji.innerHTML = '😖'

    }


}

// function expandShown(board, elTd, rowIdx, colIdx) {





//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= board.length) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (i === rowIdx && j === colIdx) continue
//             if (j < 0 || j >= board[0].length) continue
//             // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) negsCount++
//             if (board[i][j].isMine !== MINE) {
//                 elTd.style.backgroundColor = 'rgb(251, 245, 245)'
//                 board[i][j].isShown = true




//                 console.log(board[i][j].isShown, i, j)
//             }
//         }
//     }




// }





function getArrOfMatLocations(sizeMat) {
    var mat = []
    var locationsArr = []
    for (var i = 0; i < sizeMat; i++) {
        mat[i] = []
        for (var j = 0; j < sizeMat; j++) {
            var currObject = { indexI: i, indexJ: j }
            locationsArr.push(currObject)

        }
    }
    return locationsArr
}


function getRandomLocation() {

    var LocationsArr = getArrOfMatLocations(gMatSize)

    return drawNum(LocationsArr)

}

function timer() {
    //sec
    var elSec = document.querySelector('.sec')
    var currSec = elSec.innerText
    currSec++
    elSec.innerText = currSec
    //min
    var elMin = document.querySelector('.min')
    var currMin = elMin.innerText
    if (currSec > 60) {
        currMin++
        elMin.innerText = currMin
        //need to reset the sec
        currSec = 0
        elSec.innerText = currSec
    }

}


function restart() {
    gNextNum = 1
    gNums = createNums(gLevel)
    clearInterval(gInterval)
    document.querySelector('.min').innerText = '00'
    document.querySelector('.sec').innerText = '00'
    document.querySelector('.counter').innerText = gNextNum
    onInit()

}