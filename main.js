themeChange.addEventListener('change', () => swapTheme(true));

p.forEach((v) => {
    v.addEventListener("click", (e) => {
        if(e.target.children.length == 0 && verif(e.target)){
            let icon = document.createElement("i");
            if(iconACT=="O"){
                icon.setAttribute('class', 'fa-regular fa-circle faIcon');
            }else{
                icon.setAttribute('class', 'fa-solid fa-x faIcon');
            }
            e.target.appendChild(icon);
            e.target.classList.add("inUse");
            swapXOC("TURN");
            swapXOC("BLOCK");
        }
        console.log(verifWin());
    });
});

xoc.forEach((v) => {
    v.addEventListener("click", swapXOC);
});

reload.addEventListener("click", (e) => {
    p.forEach((v) => {
        for(child of v.children){
            v.removeChild(child);
        }
        v.classList.remove("inUse");
    });
    swapXOC("ALLOW");
});