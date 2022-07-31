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

