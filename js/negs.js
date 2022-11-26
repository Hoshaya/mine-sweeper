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
