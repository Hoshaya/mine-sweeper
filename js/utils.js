//* GETS AN EMPTY GLOBAL VAR OF GNUMS AND BUILDS IT ACCORDING TO THE GNUMSRANGE LENGTH
function resetNums(NumRange) {
  nums = []
  for (var i = 1; i <= NumRange; i++) {
    gNums.push(i)
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
//* DRAWS A RANDOM NUMBER FROM GNUMS ARRAY AND SPLICES THAT NUM SO IT WONT REPEAT ITSELF
function drawNum(nums) {
  var randIdx = getRandomInt(0, nums.length)
  var num = nums[randIdx]
  nums.splice(randIdx, 1)
  return num
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* GET RANDOM INT INCLUSIVE / EXLUCIVE
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

//!/

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


///////////////////////////////////////////////////////////////////////////////////////////////
//* CREATES BOARD ACCORDING TO GLOBAL SIZE VAR 
function createBoard() {
  var size = gSize
  const board = []
  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = VAR
    }
  }
  return board
}
///////////////////////////////////////////////////////////////////////////////////////////////
//* GETS A BOARD FROM CREATEBOARD AND RENDERING IT TO THE DOM
function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j]
      strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${currCell})" >${currCell}</td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML += strHTML
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* INCASE WE NEED TO WORK/RENDER ON NEW MATRIX
function copyMat(mat) {
  var newMat = []
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j]
    }
  }
  return newMat
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* CREATE ANY ITEM 
function createBalloons(count) {
  var balloons = []
  for (var i = 0; i < count; i++) {
    var balloon = createBalloon(i)
    balloons.push(balloon)
  }
  return balloons
}

///////////////////////////////////////////////////////////////////////////////////////////////
function shuffle(items) {
  var randIdx, keep, i;
  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* RENDER ONLY CELL TO DOM
// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}
////////////////////////////////////////////////////////////////
//* GET RANDOM COLOR
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
///////////////////////////////////////////////////////////////////////////////////////////////

//* SHOW / HIDE ELEMENT
function hideElement(selector) {
  const el = document.querySelector(selector)
  el.classList.add('hidden')
}

function showElement(selector) {
  const el = document.querySelector(selector)
  el.classList.remove('hidden')
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* GET ANY CELL TO AN ARRAY
function getEmptyCell(board) {
  const emptyCells = []
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var currCell = board[i][j]
      if (currCell.gameElement === null && currCell.type !== WALL)
        emptyCells.push({ i: i, j: j })
    }
  }
  //* CHOOSE A RANDOM INDEX FROM THAT ARRAY AND RETURN THE CELL ON THAT INDEX
  const randomIdx = getRandomInt(0, emptyCells.length - 1)
  return emptyCells[randomIdx]
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* NEIGHBORS LOOP
function countFoodAround(board, rowIdx, colIdx) {

  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue
      if (j < 0 || j >= board[0].length) continue
      if (board[i][j]) negsCount++
    }
  }
  return negsCount
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


function restartTimer() {

  clearInterval(gInterval)
  document.querySelector('.min').innerText = '00'
  document.querySelector('.sec').innerText = '00'



}
