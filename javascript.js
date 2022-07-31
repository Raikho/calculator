function add(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {return a / b;}

function operate(op, a, b) {
    switch (op) {
        case 'add':
            return add(a, b);
        case 'sub':
            return subtract(a, b);
        case 'mul':
            return multiply(a, b);
        case 'div':
            return divide(a, b); 
    }
}


const screen = document.querySelector('.screen');
const MAX_CHAR = 16;
let fullScreenText = '';
updateScreen();

function updateScreen() {
    screen.innerText = (fullScreenText.length==0) ? '0'
            : fullScreenText.slice(-MAX_CHAR);    
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', update);
});

function update() {
    let value = this.innerText;
    let type = this.dataset.type;
    switch (value) {
        case 'clr':
            break;
        case '=':
            break;
        default:
            fullScreenText += value;
            updateScreen();
    }
}