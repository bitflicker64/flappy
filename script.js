let board;
let bw = 380;
let bh = 800;
let ctx;

let ashx = 90;
let ashy = 400;
let ashwidth = 20;
let ashheight = 30;
let ash = {
    x: ashx,
    y: ashy,
    hh: ashheight,
    ww: ashwidth,
};

window.onload = function () {
    board = document.getElementById("board");
    board.height = bh;
    board.width = bw;

    ctx = board.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(ash.x, ash.y, ash.ww, ash.hh);
};
