let board ;
let bw=380;
let bh= 800;
let context;
window.onload = function(){
    board = document.getElementById("board");
    board.height=bh;
    board.width=bw;
    context = board.getContext("2d");
}