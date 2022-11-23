

const MINE = '🧨'
const FLAG = '🚩'
// const MINE = 'mine'

var gBoard
var gMatSize







function onInit() {

    // gBoard = createBoard()
    board = createBoard()
    gBoard = runGeneration(board)

    renderBoard(gBoard)

}


function createBoard() {
    var board = []
    gMatSize = 4
    for (var i = 0; i < gMatSize; i++) {
        board.push([])
        for (var j = 0; j < gMatSize; j++) {
            board[i][j] = {
                minesAroundCount: '',
                isShown: false,
                isMine: '',
                isMarked: true,
                id: { indexI: i, indexJ: j }

            }

            // board[i][j] = (Math.random() > 0.5) ? LIFE : ''
        }
    }
    for (var i = 0; i < 2; i++) {

        var randomLocation = getRandomLocation()
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
            strHTML += `<td class="td${i}${j}" data-i="${i}" data-j="${j}" onmousedown="onCellClicked(this,'${currCell}',${i},${j},event,0,1)"  ></td>`
            // showElement(strHTML)
            // var elBoard = document.querySelector('.td')
            // elBoard.innerText = 'hidden'
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML += strHTML
}



function onCellClicked(elTd, currCell, i, j, elCell, num1, num2) {

    var tdText = elTd.innerHTML


    console.log(elCell.button)
    if (elCell.button === 0) {
        if (elTd.innerHTML === FLAG) return
        gBoard.isShown = true
        var count = 0

        if (elTd.innerHTML === '' && count === 0) {

        }
        // gBoard.

        // var elBoard = document.querySelector('.td11')

        // elBoard.style.color = 'red'
        elTd.innerHTML = gBoard[i][j].minesAroundCount
        gBoard[i][j].isShown = true


        if (currCell === MINE) elTd.innerHTML = gBoard[i][j].isMine


        //     elTd.style.backgroundColor = 'red'


    }
    if (!gBoard[i][j].isShown) {
        if (elCell.button === 2 && (elTd.innerHTML === '' || elTd.innerHTML === FLAG)) {


            if (elTd.innerHTML === FLAG) {
                elTd.innerHTML = ''
                return
            }

            elTd.innerHTML = FLAG

            // if (elTd.innerHTML === FLAG) elTd.innerHTML = ''





        }
    }
}

function cellMarked(elBtn, num) {
    console.log(elCell.button)

    // if (num === 0)


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
                console.log(currCell)
            }

        }
    }
    return newBoard
}


function checkGameOver() {


}

function expandShown(board, elCell, i, j) { }




function getLocationsArr(sizeMat) {
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

    var LocationsArr = getLocationsArr(gMatSize)

    return drawNum(LocationsArr)

}

// oncontextmenu = (event) => { };


// function fdhfg(elCell, i, g) {
    // console.log('fsd')

    // if (g === 1) {
    //     console.log(elCell.button)
    // }

//     if (elCell.button === 2) {

//         console.log('hhh')
//     }
// }