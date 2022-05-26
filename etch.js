let timeSwitch = false;
let valiColor = false;
let colorIs = "";

let colorPick = document.querySelector('#color');
colorPick.addEventListener("input", () => {
    valiColor = true;
    colorIs = colorPick.value;
})

let bntRandomColor = document.querySelector('#bntRanColor');
bntRandomColor.addEventListener("click", () => {
    valiColor = false;
})



let maindiv = document.querySelector(".mainDiv");
let sliders = document.querySelectorAll(".slider");
let divChilds = document.querySelectorAll(".divChild");

let spanY = document.querySelector("#valueY");
let spanX = document.querySelector("#valueX");


let numY = 50;
let numX = 50;

let bntClear = document.querySelector('#bntClear');
bntClear.addEventListener("click", remover);

let eraser = document.querySelector('#bntEraser');
eraser.addEventListener("click", () => {
    event.preventDefault();
    eraser.classList.toggle('active')
    if (eraser.classList == 'active') {
        valiColor = true;
        colorIs = 'white';

    } else {
        valiColor = false;

    }
})

let bntTime = document.querySelector("#bntTime");
bntTime.addEventListener('click', () => {
    bntTime.classList.toggle('active');
    timeSwitch = !timeSwitch;
    filter();

})

let seeGrid = document.querySelector('#bntGrid');
seeGrid.addEventListener("click", grid);

function grid(){
        seeGrid.classList.toggle('active');
        let divsActuales = document.querySelectorAll('.divChild');
        divsActuales.forEach(element => {
            element.classList.toggle('watching');
        });
}


maindiv.style.gridTemplateColumns = `repeat(${50}, 1fr)`;
maindiv.style.gridTemplateRows = `repeat(${50}, 1fr)`;

sliders.forEach((element) => {
    element.addEventListener('mouseup', filter)
});

function filter() {

    maindiv.innerHTML = "";

    let value = parseInt(this.value);
    if (this.id == 'rangeY') {
        maindiv.style.gridTemplateRows = `repeat(${value}, 1fr)`;
        spanY.textContent = value;
        numY = value

    } if (this.id == 'rangeX') {
        maindiv.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
        spanX.textContent = value;
        numX = value;
    }if(seeGrid.classList == 'active'){
        seeGrid.classList.toggle('active')
    }
    let numOfDiv = numY * numX;
    drawTable(numOfDiv);
}


function drawTable(num) {
    divChilds.forEach(element => {
        element.parentNode.removeChild(element)
    });
    for (let h = 1; h <= num; h++) {
        let divFrame = document.createElement("div");
        divFrame.setAttribute('id', h);
        divFrame.classList.add("divChild");
        maindiv.appendChild(divFrame);
    }
    asotiation();
}

function randomNum() {
    let numRand = Math.floor(Math.random() * (0, 255));
    return numRand
}
let validation = false;

function asotiation() {
    let hoverDiv = document.querySelectorAll(".divChild");
    hoverDiv.forEach(element => {
        element.addEventListener('mousedown', () => {
            event.preventDefault();
            if (this.event.button == 0) {
                validation = !validation;
            }
        })
    });

    hoverDiv.forEach((divC) => {
        divC.addEventListener("mouseover", () => {
            if (validation == true) {
                if (timeSwitch == true) {
                    setTimeout(remover, 800)
                    function remover() {
                        divC.style.backgroundColor = "";
                    }
                }
                if (valiColor == true) {
                    divC.style.backgroundColor = `${colorIs}`;
                } else {
                    divC.style.backgroundColor = `rgb(${randomNum()},${randomNum()},${randomNum()})`
                }
            }
        });
    })
}

function remover() {
    maindiv.innerHTML = "";
    filter();
}

filter();