
function cellMarkeCountNegsMines(elTd, currCell, i, j, elCell) {


    if (elCell.button === 0) {
        if (elTd.innerHTML === FLAG) return


        if (elTd.innerHTML !== MINE) {

            expandShown(gBoard, i, j, currCell)
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) gGame.shownCount++
            gBoard[i][j].isShown = true

            elTd.style.backgroundColor = 'rgb(251, 245, 245)'

            checkWin()


            elTd.innerHTML = currCell
            gBoard[i][j].isShown = true
            return
        }


    }
}

// cellMarkedCountNegsMines(elTd, currCell, cellI, cellJ, elCell)
// cellMarkedMine(elTd, currCell, cellI, cellJ, elCell)
// cellMarkedFlags(elTd, elCell, cellI, cellJ)
// }




function expandShown(board, rowIdx, colIdx, currCellInnerText) {

    // var currCellMinesAround = board[rowIdx][colIdx].minesAroundCount
    // var currCellIsMine = board[rowIdx][colIdx].isMine
    // if (!currCellMinesAround && !currCellIsMine) {

    if (!currCellInnerText) {
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i < 0 || i >= board.length) continue
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (i === rowIdx && j === colIdx) continue
                if (j < 0 || j >= board[0].length) continue
                if (board[i][j].isMine !== MINE) {
                    // optin 2
                    // var elTdd = document.querySelector(`.td${i}${j}`)
                    var elTdd = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                    elTdd.style.backgroundColor = 'rgb(251, 245, 245)'
                    elTdd.innerHTML = board[i][j].minesAroundCount
                    if (!board[i][j].isShown) gGame.shownCount++
                    board[i][j].isShown = true


                    checkWin()

                }


            }
        }

    }
    return
}



function cellMarkeMine(elTd, currCell, i, j, elCell) {

    if (elCell.button === 0) {

        if (currCell === MINE) {
            maxLloss--
            var elLive = document.querySelector('.live')
            elLive.innerHTML = maxLloss


            if (!maxLloss) {
                elTd.innerHTML = gBoard[i][j].isMine
                elTd.style.backgroundColor = ' rgb(235, 57, 57)'
                checkGameOver()
                exposeAllMines(elTd, i, j)
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

function exposeAllMines(elTd, indexI, indexJ) {
    var a = 0

    for (var i = 0; i < gMinesLocation.length; i++) {
        var gMinesLocationI = gMinesLocation[i].indexI
        var gMinesLocationJ = gMinesLocation[i].indexJ
        elMine = document.querySelector(`[data-i="${gMinesLocationI}"][data-j="${gMinesLocationJ}"]`)


        // if (indexI !== gMinesLocationI || indexJ !== gMinesLocationJ) {
        a++
        console.log('indexI', indexI)
        console.log('indexJ', indexJ)
        console.log('a', a)
        elMine.innerHTML = MINE
        elMine.style.backgroundColor = 'rgb(251, 245, 245)'
        elTd.style.backgroundColor = ' rgb(235, 57, 57)'
        // }

    }
}


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