const X_CLASS='x'
const CIRCLE_CLASS='circle'
const winingCombination=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winingMessageElement = document.getElementById('winingMessage')
const winingMessageText=document.querySelector('[data-winingText]')
const restart = document.getElementById(restartButton)

let circleTurn

startGame()
restartButton.addEventListener('click', startGame)
function startGame()
{
    circleTurn = false
    
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)

        cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true})
})
setBoardHoverClass()
winingMessageElement.classList.remove('show')
}
function handleClick(e){
    // place for mark
    const cell=e.target
    const currentClass= circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    // check for win
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else {
        swapTurns()
        setBoardHoverClass()
    }
    
}

function endGame(draw){
    if(draw){
        winingMessageText.innerText = 'Draw!'
    }else{
        // winingMessageText.innerText =  '${circleTurn ? "Os" : "Xs"}Wins!'
        if(circleTurn)
            winingMessageText.innerText = "O's Wins!"
        else winingMessageText.innerText = "X's Wins!"
    }
    winingMessageElement.classList.add('show')

    
}

function isDraw()
{
    return [...cellElements].every(cell =>{
        return cell.classList.contains(CIRCLE_CLASS) ||
        cell.classList.contains(X_CLASS)
    })
}

function placeMark(cell, currentClass)
{
    cell.classList.add(currentClass)
}

function swapTurns()
{
    circleTurn=!circleTurn
}

function setBoardHoverClass()
{
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn)
    {
        board.classList.add(CIRCLE_CLASS)
    }else board.classList.add(X_CLASS)

}

function checkWin(currentClass)
{
    return winingCombination.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


