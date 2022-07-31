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


function updateScreen() {
    let text = '';
    buffer.items.forEach(item => {
        text += item.value;
    });
    screen.innerText = (text.length==0) ? '0'
            : text.slice(-MAX_CHAR);    
}

const buffer = {
    items: [{type: 'operand', value: '0'}],
    getType() {
        return this.items[this.items.length-1].type;
    },
    addOperand(value) {
        this.items.push({type: 'operand', value: '0'});
        this.appendOperand(value);
    },
    appendOperand(value) {
        const item = this.items[this.items.length-1];
        if (value === '.') {
            if (item.value.includes('.'))
                return;
            else
                item.value += value;
        } else if (item.value === '0') {
            item.value = value;
        } else {
            item.value += value;
        }
    }
}

const screen = document.querySelector('.screen');
const MAX_CHAR = 16;
let fullScreenText = '';
updateScreen();

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', update);
});


function update() {
    let value = this.innerText;
    let type = this.dataset.type;

    switch (type) {
        case 'num':
            if (buffer.getType() === 'operand') {
                buffer.appendOperand(value);
            }
            break;
    }
    //console.log(buffer.items);
    updateScreen();
}
