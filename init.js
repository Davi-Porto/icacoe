const themeStart = localStorage.getItem('theme-color');
const themeChange = window.document.getElementById('theme-change-btn');
const p = window.document.querySelectorAll(".p");
const xoc = window.document.querySelectorAll(".xoc");
const reload = window.document.querySelector("#reload");
const moons = window.document.querySelectorAll(".fa-moon");
const suns = window.document.querySelectorAll(".fa-sun");
var iconACT = window.document.querySelector(".xoc.active-i").id;
var win = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

if(themeStart==null){
    localStorage.setItem('theme-color', 'light');
}else{
    themeChange.checked = themeStart === 'light';
    if(!themeChange.checked){
        swapTheme(false);
    }
}

function verif(target){
    let r=false;
    p.forEach((v) => {
        if(v==target){
            r=true;
        }
    });
    return r;
}

function verifWin(){
    let acc=0;
    win.forEach((lines)=>{
        let ic=0;
        lines.forEach((box, i)=>{
            if(i==0 && p[box].children.item(0).classList.contains('fa-circle')){
                ic=1;
            }
            if(p[box].children.item(0)){
                if(ic==0){
                    if(p[box].children.item(0).classList.contains('fa-x')){
                        acc++;
                    }else{
                        acc--;
                    }
                }else{
                    if(p[box].children.item(0).classList.contains('fa-circle')){
                        acc++;
                    }else{
                        acc--;
                    }
                }
            }
        });
    })
    if(acc==3){
        return "win";
    }else{
        return "none";
    }
}

async function swapTheme(wt, e){
    let state = window.document.querySelector('#theme-change-btn:checked');
    if(wt){
        document.documentElement.style.setProperty('--transition-global', '1s');
    }
    if(state){
        document.documentElement.style.setProperty('--primaria', '#fff');
        document.documentElement.style.setProperty('--contraste', '#000');
        document.documentElement.style.setProperty('--destaque', '#3838f9');
        localStorage.setItem('theme-color', 'light');
    }else{
        document.documentElement.style.setProperty('--primaria', '#282828');
        document.documentElement.style.setProperty('--contraste', '#fff');
        document.documentElement.style.setProperty('--destaque', '#ffa600');
        localStorage.setItem('theme-color', 'dark');
    }
    moons.forEach((v)=>{
        v.classList.toggle("none");
    });
    suns.forEach((v)=>{
        v.classList.toggle("none");
    });
    await new Promise(res => {
        document.body.addEventListener('transitionend', res, { once: true });
    });
    document.documentElement.style.setProperty('--transition-global', '0s');
}

function swapXOC(e){
    let act = window.document.querySelector(".active-i");
    if(e=="BLOCK"){
        xoc.forEach((v) => {
            v.classList.remove("act");
            v.removeEventListener('click',  swapXOC);
        });
    }else if(e=="ALLOW"){
        xoc.forEach((v) => {
            v.classList.add("act");
            v.addEventListener("click", swapXOC);
            if(act!=window.document.getElementById("X")){
                v.classList.toggle("active-i");
            }
        });
        iconACT="X";
    }else if(e=="TURN" || (e.target != act && e.target != act.children[0])){
        xoc.forEach((v) => {
            v.classList.toggle("active-i");
            if(act!=v){
                iconACT=v.id;
            }
        });
    }
}