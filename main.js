const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea')
    car = document.createElement('div')
car.classList.add('car')


start.addEventListener('click, startGame')
document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stoptRun)

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,

}

const setting ={
    start: false,
    score: 0,
    speed: 3
}

function startGame(){
    start.classList.add('hide')
    setting.start = true
    gameArea.appendChild(car)
    requestAnimationFrame(playGame)
}
function playGame(){
    console.log('play')
    if( setting.start === true){
        requestAnimationFrame(playGame)
    }
}

function startRun(){
    event.preventDefault()
    keys[event.keys]=true
}


function stoptRun(){
    event.preventDefault()
    keys[event.keys]=false
}

