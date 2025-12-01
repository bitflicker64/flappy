// 380 800 90 4000
let board;
let bw = 380;
let bh = 800;
let ctx;
let ashx = 90;
let ashy = 400; 
let ashwidth = 50;
let ashheight = 50;

let ash = {
    x: ashx , 
    y: ashy ,
    hh: ashwidth,
    ww: ashheight,
};

window.onload = function() {
    board= document.getElementById("board");
    board.height=bh; 
    board.width=bw;
    ctx=board.getContext("2d");
    ctx.fillRect(ash.x,ash.y,ash.hh,ash.ww)
    const ashimage = new Image();
    ashimage.src ="./ash101.png"
    ctx.drawImage(ashimage,ash.hh,ash.ww);
        ashimage.onload = function() {
        ctx.drawImage(ashimage, ash.x, ash.y, ash.ww, ash.hh);
    }
}