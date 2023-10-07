const canvas = window.document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const content = window.document.querySelector('.content');
const pSize = document.querySelectorAll(".p")[0].clientWidth+3;
const cords = [
    [Math.floor(pSize*0.5), Math.floor(pSize*0.5)],
    [Math.floor(pSize*1.5), Math.floor(pSize*0.5)],
    [Math.floor(pSize*2.5), Math.floor(pSize*0.5)],
    [Math.floor(pSize*0.5), Math.floor(pSize*1.5)],
    [Math.floor(pSize*1.5), Math.floor(pSize*1.5)],
    [Math.floor(pSize*2.5), Math.floor(pSize*1.5)],
    [Math.floor(pSize*0.5), Math.floor(pSize*2.5)],
    [Math.floor(pSize*1.5), Math.floor(pSize*2.5)],
    [Math.floor(pSize*2.5), Math.floor(pSize*2.5)]
];
var line=undefined;
var roundLines=[];
var request;

window.addEventListener('DOMContentLoaded', ()=>{
    canvas.width = content.clientWidth-30;
    canvas.height = content.clientHeight-30;
});
window.addEventListener('resize', ()=>{
    canvas.width = content.clientWidth-30;
    canvas.height = content.clientHeight-30;
});

ctx.shadowBlur = 25;
ctx.shadowColor = "rgba(0, 0, 0, 1)";
ctx.shadowOffsetX = -10;
ctx.shadowOffsetY = 10;

function drawLine(i, i2, clr){
    animaLine();
    canvas.style.display="block";
    let start={
        x: cords[i][0],
        y: cords[i][1],
    };
    let end={
        x: cords[i2][0],
        y: cords[i2][1],
    };
    line=new LineObject(start.x, start.y, end.x, end.y, clr);
}

class LineObject{
    constructor(x1,y1,x2,y2, clr){
        this.x1=x1;
        this.y1=y1;
        this.x2=x1;
        this.y2=y1;
        this.xTo=x2;
        this.yTo=y2;
        this.speedX=(this.x1>this.xTo)?-2:2;
        this.speedY=(this.y1>this.yTo)?-2:2;
        this.clr=clr;
        this.lineW=8; 
        this.ang=0;
        if(this.x1==this.xTo){
            this.ang=180;
        }else if(this.y1==this.yTo){
            this.ang=90;
        }else if(this.x1<this.xTo){
            this.ang=135;
        }else if(this.x1>this.xTo){
            this.ang=225;
        }
        roundLines.push(new RoundLine(this.x1, this.y1, this.lineW/2-1, this.ang, this.clr));
    }
    update(){
        if(this.x1<this.xTo&&this.x1!=this.xTo){
            this.x2=(this.x2>=this.xTo)?this.xTo:this.x2+this.speedX;
        }else{
            if(this.x1!=this.xTo){
                this.x2=(this.x2<=this.xTo)?this.xTo:this.x2+this.speedX;
            }
        }
        if(this.y1<this.yTo&&this.y1!=this.yTo){
            this.y2=(this.y2>=this.yTo)?this.yTo:this.y2+this.speedY;
        }else{
            if(this.x1!=this.xTo){
                this.y2=(this.y2<=this.yTo)?this.yTo:this.y2+this.speedY;
            }
        }
    }
    draw(){
        ctx.beginPath();
        ctx.strokeStyle=this.clr;
        ctx.lineWidth=this.lineW;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        if(this.x2==this.xTo&&this.y2==this.yTo&&roundLines.length==1){
            roundLines.push(new RoundLine(this.x2, this.y2, this.lineW/2-1, this.ang+180, this.clr));
            msgBox.show(modalMsg);
        }
    }
}

class RoundLine{
    constructor(x, y, width, ang, clr){
        this.x=x;
        this.y=y;
        this.width=width;
        this.ang=ang;
        this.clr=clr;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle=this.clr;
        ctx.arc(this.x, this.y, this.width, (Math.PI*2/360)*(this.ang), (Math.PI*2/360)*(this.ang+180));
        ctx.fill();
    }

}

function animaLine(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if(line){
        line.draw();
        line.update();
        roundLines.forEach(v=>{
            v.draw();
        });
    }
    request = requestAnimationFrame(animaLine);
}