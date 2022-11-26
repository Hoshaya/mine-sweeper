

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
var gInterval




function onInit() {
    // gGame.isOn = true
    starter = 0



    board = createBoard()
    gBoard = runGeneration(board)
    gGame.shownCount = 0
    maxLloss = 3
    // console.log(gGame.isOn)
    var elEmoji = document.querySelector('.emoji')
    elEmoji.innerHTML = '🙂'


    // if (gGame.isOn) gInterval = setInterval(timer, 1000)
    var elFlag = document.querySelector('.markedCount')
    elFlag.innerHTML = gMines - gGame.markedCount


    renderBoard(gBoard)

}


function setLevel(size) {



    if (size === 4) {
        gMatSize = size
        gMines = 2
        maxLloss = 3

    } else if (size === 8) {
        gMatSize = size
        gMines = 14
        maxLloss = 3

        // console.log('maxLloss', maxLloss)
    } else if (size === 12) {
        gMatSize = size
        gMines = 32
        maxLloss = 3

    }

    // clearInterval(gInterval)
    gGame.isOn = true
    // clearInterval(gInterval)
    var elLive = document.querySelector('.live')
    elLive.innerHTML = maxLloss

    restartTimer()





    onInit()

}


function createBoard() {
    var board = []
    gMinesLocation = []

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

        console.log(gMines)


        var randomLocation = getRandomLocation()
        gMinesLocation.push(randomLocation)

        board[randomLocation.indexI][randomLocation.indexJ].isMine = MINE


    }
    return board
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


            strHTML += `<td  data-i="${i}" data-j="${j}" onmousedown="onCellClicked(this,'${currCell}',${i},${j},event)"  ></td>`
            // optin 2
            // strHTML += `<td class="td${i}${j}" onmousedown="onCellClicked(this,'${currCell}',${i},${j},event)"  ></td>`

        }
        strHTML += '</tr>'
    }

    elBoard.innerHTML += strHTML
}



// var starter = 0
function onCellClicked(elTd, currCell, cellI, cellJ, elCell) {
    if (!starter) {
        starter++
        gGame.isOn = true

        if (gGame.isOn) gInterval = setInterval(timer, 1000)
    }

    if (starter === 2) {

        clearInterval(gInterval)
        return
    }

    if (!gGame.isOn) return

    cellMarkedFlags(elTd, elCell, cellI, cellJ)
    cellMarkeCountNegsMines(elTd, currCell, cellI, cellJ, elCell)
    cellMarkeMine(elTd, currCell, cellI, cellJ, elCell)
}



function checkWin() {

    var sumCells = gMatSize ** 2


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

