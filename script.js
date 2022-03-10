const btnRules = document.querySelector(".btn--rules");
const btnClose = document.querySelector(".btn--close");
const rulesEl = document.querySelector(".rules");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//GAME
let score = 0;
let bricksRowCount = 5;
let bricksColumnCount = 9;
//create ball props
const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 10,
	speed: 4,
	dx: 4,
	dy: -4,
};
// create paddle props
const paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	w: 80,
	h: 10,
	speed: 8,
	dx: 0,
};
const brickInfo = {
	w: 70,
	h: 20,
	padding: 10,
	offsetX: 45,
	offsetY: 60,
	visible: true,
};
//create brickes
const bricks = [];
for (let i = 0; i < bricksRowCount; i++) {
	bricks[i] = [];
	for (let j = 0; j < bricksColumnCount; j++) {
		const x = j * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
		const y = i * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
		bricks[i][j] = { x, y, ...brickInfo };
	}
}

const drawBall = function () {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
};

const drawPaddle = function () {
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
};
const drawScore = function () {
	ctx.font = "20px Arial";
	ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
};
const drawBricks = function () {
	bricks.forEach((row) => {
		row.forEach((brick) => {
			ctx.beginPath();
			ctx.rect(brick.x, brick.y, brick.w, brick.h);
			ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
			ctx.fill();
			ctx.closePath();
		});
	});
};

const draw = function () {
	//clear canvas before each drawing
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	drawScore();
	drawBricks();
};

const movePaddle = function () {
	paddle.x += paddle.dx;
	//wall detection
	if (paddle.x + paddle.w >= canvas.width) paddle.x = canvas.width - paddle.w;
	if (paddle.x < 0) paddle.x = 0;
};

const keyDown = function (e) {
	if (e.key === "ArrowRight") {
		paddle.dx = paddle.speed;
	}
	if (e.key === "ArrowLeft") {
		paddle.dx = -paddle.speed;
	}
};

const keyUp = function (e) {
	if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
		paddle.dx = 0;
	}
};

const moveBall = function () {
	ball.x += ball.dx;
	ball.y += ball.dy;
	//wall detection (left/right)
	if (ball.x === 0 || ball.x + ball.size > canvas.width) {
		ball.dx *= -1;
	}
	if (ball.y < 0 || ball.y + ball.size > canvas.height) {
		ball.dy *= -1;
	}
	// paddle collision
	if (
		ball.y + ball.size >= paddle.y &&
		ball.x >= paddle.x &&
		ball.x + ball.size <= paddle.x + paddle.w
	) {
		ball.dy = -ball.speed;
    }
    // bricks collision
\
};

const update = function () {
	movePaddle();
	moveBall();
	//draw everything
	draw();
	requestAnimationFrame(update);
};

update();

//keyboard events
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// for showing and closing  the rules
btnRules.addEventListener("click", () => {
	rulesEl.classList.add("show");
});

btnClose.addEventListener("click", () => {
	rulesEl.classList.remove("show");
});
