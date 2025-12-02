let board;
let bw = 380;
let bh = 800;
let ctx;

let ashx = 90;
let ashy = 400;
let ashwidth = 50;
let ashheight = 50;

let ash = {
    x: ashx,
    y: ashy,
    hh: ashwidth,
    ww: ashheight,
};

let ashImage;
let pipeImage;

let gravity = 0.25;
let velocityY = 0;

let pokearray = [];
let pipeWidth = 120;
let pipeheight = 512;
let pipex = bw;
let pipey = 0;
let pipeGap = 300;
let pipeSpeed = -1.2;

let frameCount = 0;
let score = 0;
let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = bh;
    board.width = bw;
    ctx = board.getContext("2d");

    ashImage = new Image();
    ashImage.src = "./pokee.png";

    pipeImage = new Image();
    pipeImage.src = "./pole.jpeg";

    document.addEventListener("keydown", handleInput);
    document.addEventListener("click", handleInput);

    ashImage.onload = function() {
        requestAnimationFrame(update);
    };
};

function handleInput(e) {
    if (e.type === "click" || e.code === "Space" || e.code === "ArrowUp") {
        if (gameOver) {
            resetGame();
        } else {
            velocityY = -8;
        }
    }
}

function resetGame() {
    ashy = 400;
    ash.y = ashy;
    velocityY = 0;
    pokearray = [];
    pipex = bw;
    frameCount = 0;
    score = 0;
    gameOver = false;
    requestAnimationFrame(update);
}

function update() {
    if (gameOver) {
        drawFrame();
        return;
    }

    requestAnimationFrame(update);

    velocityY += gravity;
    ashy += velocityY;
    ash.y = ashy;

    if (ash.y + ash.hh >= bh) {
        ash.y = bh - ash.hh;
        gameOver = true;
    }

    frameCount++;
    if (frameCount % 120 === 0) {
        placePipes();
    }

    pokearray.forEach(pipe => {
        pipe.x += pipeSpeed;
    });

    pokearray = pokearray.filter(pipe => pipe.x + pipe.width > 0);

    const birdRect = { x: ash.x, y: ash.y, width: ash.ww, height: ash.hh };

    pokearray.forEach(pipe => {
        const pipeRect = { x: pipe.x, y: pipe.y, width: pipe.width, height: pipe.height };
        if (!gameOver && isColliding(birdRect, pipeRect)) {
            gameOver = true;
        }
        if (!gameOver && pipe.isTop && !pipe.scored && pipe.x + pipe.width < ash.x) {
            pipe.scored = true;
            score++;
        }
    });

    drawFrame();
}

function placePipes() {
    const minGapY = 80;
    const maxGapY = bh - pipeGap - 80;
    const gapY = minGapY + Math.random() * (maxGapY - minGapY);

    const topPipeY = gapY - pipeheight;
    const bottomPipeY = gapY + pipeGap;

    pokearray.push({ x: bw, y: topPipeY, width: pipeWidth, height: pipeheight, isTop: true, scored: false });
    pokearray.push({ x: bw, y: bottomPipeY, width: pipeWidth, height: pipeheight, isTop: false });
}

function drawFrame() {
    ctx.clearRect(0, 0, bw, bh);

    ctx.drawImage(ashImage, ash.x, ash.y, ash.ww, ash.hh);

    pokearray.forEach(pipe => {
        ctx.drawImage(pipeImage, pipe.x, pipe.y, pipe.width, pipe.height);
    });

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "36px Arial";
        ctx.fillText("Game Over", 90, bh / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Press Space or Click to restart", 10, bh / 2 + 40);
    }
}

function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
