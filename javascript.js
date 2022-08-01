function operate(op, a, b) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return a / b;
}

function evaluate() {
    const items = buffer.items;
    while (items.length > 1) {
        let i = getNextSet(items);

        let op = items[i].value;
        let a = Number(items[i-1].value);
        let b = Number(items[i+1].value);
        let ans = operate(op, a, b);

        if (isError(ans)) {
            buffer.error();
            break;
        }

        buffer.collapseOperator(i, ans.toString())
    }
}

function isError(num) {
    console.log("num to check: " + num);
    if (num == Infinity) return true;
    if (num === -Infinity) return true;
    if (Number.isNaN(num)) return true;
    return false;
}

function getNextSet(array) {
    let firstIndex = 0;
    let bestPriority = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].type === 'operator') {
            let priority = getOperatorPriority(array[i].value);
            if (priority > bestPriority) {
                firstIndex = i;
                bestPriority = priority;
            }
        }
    }
    return firstIndex;
}

function getOperatorPriority(op) {
    if (op === '+' || op === '-')
        return 1;
    if (op === '*' || op === '/')
        return 2;
}

function updateScreen() {
    let text = '';
    buffer.items.forEach(item => {
        text += item.value;
    });
    screen.innerText = (text.length==0) ? '0'
            : text.slice(-MAX_CHAR);    
}

function debug() {
    const items = buffer.items;
    let length = buffer.items.length;
    for (let i = 0; i < length; i++) {
        let type = items[i].type;
        let value = items[i].value;
        console.log(`#${i}: ${type} ${value}`);
    }
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
    },
    convertToOperand() {
        const item = this.items[this.items.length-1];
        item.type = 'operand';
    },
    resetOperand() {
        const item = this.items[this.items.length-1];
        item.type = 'operand';
        item.value = '0';
    },
    clear() {
        this.items = [{type: 'operand', value: '0'}];
    },
    collapseOperator(index, ans) {
        this.items.splice(index-1, 3, {type: 'answer', value: ans})
    },
    error() {
        this.items = [{type: 'error', value: 'ERROR'}];
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
            if (bufferType === 'answer') {
                buffer.resetOperand();
                buffer.appendOperand(value);
            }
            break;
        case 'op':
            if (bufferType === 'operand') {
                buffer.addOperator(value);
            } else if (bufferType === 'answer') {
                buffer.convertToOperand();
                buffer.addOperator(value);
            }
            break;
        case 'eql':
            evaluate();
            break;
        case 'clr':
            buffer.clear();
            break;
    }
    //console.log(buffer.items);
    updateScreen();
    debug();
}
