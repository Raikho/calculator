function operate(op, a, b) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return a / b;
}

function evaluate() {
    while (buffer.items.length > 1) {
        let op = buffer.items[1].value;
        let a = Number(buffer.items[0].value);
        let b = Number(buffer.items[2].value);
        let ans = operate(op, a, b);
        buffer.items.splice(0, 3, {type: 'operand', value: ans});
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
    },
    addOperator(value) {
        this.items.push({type: 'operator', value: value});
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
    let bufferType = buffer.getType();

    switch (type) {
        case 'num':
            if (bufferType === 'operand') {
                buffer.appendOperand(value);
            }
            else if (bufferType == 'operator') {
                buffer.addOperand(value);
            }
            break;
        case 'op':
            if (bufferType === 'operand') {
                buffer.addOperator(value);
            }
            break;
        case 'eql':
            evaluate();
            break;
    }
    //console.log(buffer.items);
    updateScreen();
}
