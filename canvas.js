const canvas = window.document.querySelector("canvas");
const c = canvas.getContext('2d');

class line {
    constructor(x1, y1, x2, y2){
        this.xI = x1;
        this.yI = y1;
        this.xTo = this.xI;
        this.yTo = this.yI;
        this.speed = 5;
    }
    update(){

    }
    draw(){
        line(this.xI, this.yI, this.xTo, this.yTo, "var(--destaque)");
        resetColor();
    }
}

function line(x1, y1, x2, y2, clr="#000"){
    c.beginPath();
    c.strokeStyle=clr;
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
    resetColor();
}

function resetColor(){
    c.fillStyle="#000";
    c.strokeStyle="#000";
}

function init(){

    loop(true);
}

function loop(op=true){
    requestAnimationFrame(() => loop(op));
    
    if(op){
        c.clearRect(0,0,canvas.width, canvas.height);
    }
}
init();