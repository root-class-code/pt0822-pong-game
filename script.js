let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = "#302c2c"

// getting the paintbrush
let ctx = canvas.getContext('2d')
console.log(ctx)
// The DOM of the start and the restart buttons
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')

let intervalID = null;
let gameOver = false;

let circleX = 150, circleY = 150, circleRadius = 30;
let incrX = 5, incrY = 5

let paddleX = 100, paddleHeight = 30, paddleWidth = 200

let isRight = false, isLeft = false;

let score = 0

function drawCircle(){
    ctx.beginPath()
    ctx.fillStyle = '#c9f53b'
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2)
    ctx.fill();
    ctx.closePath();
}

function drawRect(){
    ctx.beginPath()
    ctx.fillStyle = '#28d9fc'
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.closePath();
}

function collision(){
    //right side
    if(circleX + circleRadius > canvas.width) {
        incrX = -incrX
    }
    //bottom side
    if (circleY + circleRadius > canvas.height) {
        // check if circle is within x co-ordinates of the paddle as it touches the bootm side
        if (circleX > paddleX && (circleX < paddleX + paddleWidth)) {
            incrY = -incrY;
            score++;
        }
        else {
            gameOver = true;
        }
    }
    //left side
    if (circleX - circleRadius < 0) {
        incrX = -incrX
    }
    //top
    if (circleY - circleRadius < 0) {
        incrY = -incrY
    }
}

function animation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCircle();
    drawRect();

    circleX = circleX + incrX
    circleY = circleY + incrY

    ctx.fillStyle = 'white';
    ctx.font = '24px Roboto';
    ctx.fillText(`Score : ${score}`, 30, 40)

    // paddle movements
    if (isRight && (paddleX + paddleWidth < canvas.width) ) {
            paddleX = paddleX + 5
    }
    else if (isLeft && (paddleX > 0) ) {
        paddleX = paddleX - 5
    }

    collision()

    intervalID = requestAnimationFrame(animation)
    if (gameOver) {
        cancelAnimationFrame(intervalID)
        canvas.style.display = 'none';
        restartBtn.style.display = 'block';
    }
}

function start(){
    startBtn.style.display = 'none';
    canvas.style.display = 'block';
    restartBtn.style.display = 'none';
    animation()
}

 //Everything begins here
window.addEventListener('load', () => {
    canvas.style.display = 'none';
    restartBtn.style.display = 'none';

    startBtn.addEventListener('click', () => {
        start();
    })

    restartBtn.addEventListener('click', () => {
        circleX = 150
        circleY = 150
        gameOver = false;
        score = 0;
        start();
    })

    document.addEventListener('keydown', (event) => {
        if (event.code == 'ArrowRight') {
            isRight = true;
            isLeft = false;
        }
        if (event.code == 'ArrowLeft') {
            isRight = false;
            isLeft = true;
        }
    })

    document.addEventListener('keyup', () => {
        isRight = false;
        isLeft = false;
    })
})