let numbersInCalculation = [];
let operator;
let displayValue = '0';
let lastKeyPressed = '';

let AC = document.querySelector('#AC');
AC.addEventListener('click', clearDisplay);

let numbers = document.querySelectorAll('.number');
numbers.forEach((button) => {
    button.addEventListener('click', calculateDisplay);
});

let operators = document.querySelectorAll('.operator');
operators.forEach((operatorValue) => {
    operatorValue.addEventListener('click', getOperator);
});

let modulators = document.querySelectorAll('.modulator');
modulators.forEach((modulatorValue) => {
    modulatorValue.addEventListener('click', enactModulator);
});

let equals = document.querySelector('#equals');
equals.addEventListener('click', equalsCalculation);

let allButtons = document.querySelectorAll('.column');
allButtons.forEach((button) => {
    button.addEventListener('click', addHighlight);
    button.addEventListener('transitionend', removeHighlight);
});

function equalsCalculation(e) {
    if (operator) {
        if (
            e &&
            lastKeyPressed != 'equals' &&
            numbersInCalculation.length >= 1
        ) {
            if (displayValue != '') {
                numbersInCalculation.push(displayValue);
            } else {
                displayValue = '0';
                populateDisplay();
                lastKeyPressed = '';
                numbersInCalculation = [];
                operator = '';
                console.log('reset');
                return;
            }
        } else if (e) {
            if ((lastKeyPressed = 'operator')) {
                return;
            }
        }

        displayValue = operate(operator, ...numbersInCalculation);
        numbersInCalculation.splice(0, numbersInCalculation.length - 1);
        numbersInCalculation.unshift(displayValue);
        console.log(numbersInCalculation);
        if (e) {
            if (numbersInCalculation.length <= 1) {
                return;
            }
            populateDisplay();
            lastKeyPressed = 'equals';
        }
    }
}

function clearDisplay() {
    displayValue = '0';
    lastKeyPressed = '';
    numbersInCalculation = [];
    populateDisplay();
}

function calculateDisplay(event) {
    if (event.target.textContent.includes('.') && displayValue.includes('.')) {
        return;
    }
    if (displayValue === '0' && event.target.textContent.includes('0')) {
        return;
    } else if (event.target.querySelector('.text') && displayValue.length < 7) {
        if (
            displayValue === '0' ||
            lastKeyPressed === 'operator' ||
            lastKeyPressed === 'equals'
        ) {
            if (lastKeyPressed === 'equals') {
                displayValue = '0';
                populateDisplay();
                lastKeyPressed = '';
                numbersInCalculation = [];
                operator = '';
                console.log('reset');
            }
            displayValue = event.target.querySelector('.text').textContent;
        } else {
            displayValue += event.target.querySelector('.text').textContent;
        }
    } else if (displayValue.length < 7) {
        if (
            displayValue === '0' ||
            lastKeyPressed === 'operator' ||
            lastKeyPressed === 'equals'
        ) {
            if (lastKeyPressed === 'equals') {
                displayValue = '0';
                populateDisplay();
                lastKeyPressed = '';
                numbersInCalculation = [];
                operator = '';
                console.log('reset');
            }
            displayValue = event.target.textContent;
        } else {
            displayValue += event.target.textContent;
        }
    }
    lastKeyPressed = 'number';
    populateDisplay();
}

function populateDisplay() {
    const display = document.querySelector('.display .text');
    display.textContent = `${displayValue}`;
}

function add() {
    total = Number(arguments[0]);
    for (let i = 1; i < arguments.length; i++) {
        total += Number(arguments[i]);
    }
    if (typeof total === 'string') {
        return total;
    } else if (typeof total === 'number') {
        return total.toString();
    } else {
        return displayValue;
    }
}

function subtract() {
    total = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        total -= arguments[i];
    }
    if (typeof total === 'string') {
        return total;
    } else if (typeof total === 'number') {
        return total.toString();
    } else {
        return displayValue;
    }
}

function divide() {
    total = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        total /= arguments[i];
    }
    if (typeof total === 'string') {
        return total;
    } else if (typeof total === 'number') {
        return total.toString();
    } else {
        return displayValue;
    }
}

function multiply() {
    total = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        total *= arguments[i];
    }
    if (typeof total === 'string') {
        return total;
    } else if (typeof total === 'number') {
        return total.toString();
    } else {
        return displayValue;
    }
}

function operate(operator, ...numbers) {
    if (operator === 'add') {
        return add(...numbers);
    } else if (operator === 'subtract') {
        return subtract(...numbers);
    } else if (operator === 'multiply') {
        return multiply(...numbers);
    } else if (operator === 'divide') {
        return divide(...numbers);
    }
}

function getOperator(e) {
    if (displayValue != '') {
        numbersInCalculation.push(displayValue);
    }
    console.log(numbersInCalculation);
    if (numbersInCalculation.length >= 2) {
        if (lastKeyPressed != 'equals') {
            equalsCalculation();
        }
        if (lastKeyPressed === 'equals') {
            numbersInCalculation.pop();
        }
        populateDisplay();
        numbersInCalculation.pop();
        console.log(numbersInCalculation);
    } else {
        displayValue = '';
    }
    switch (e.target.id) {
        case 'plus':
            operator = 'add';
            break;

        case 'addition':
            operator = 'add';
            break;

        case 'minus':
            operator = 'subtract';
            break;

        case 'subtraction':
            operator = 'subtract';
            break;

        case 'times':
            operator = 'multiply';
            break;

        case 'multiplication':
            operator = 'multiply';
            break;

        case 'division':
            operator = 'divide';
            break;

        case 'dividedby':
            operator = 'divide';
            break;
    }
    lastKeyPressed = 'operator';
    console.log(operator);
    return operator;
}

function addHighlight(e) {
    if (e.target.classList.contains('column')) {
        e.target.classList.add('highlight');
    } else {
        e.target.parentNode.classList.add('highlight');
    }
}

function removeHighlight(e) {
    if (e.target.classList.contains('column')) {
        e.target.classList.remove('highlight');
    } else {
        e.target.parentNode.classList.remove('highlight');
    }
}

function enactModulator(e) {
    if (lastKeyPressed != 'number') {
        return;
    }
    if (e.target.textContent.includes('%')) {
        displayValue = displayValue * 0.01;
        populateDisplay();
    } else {
        displayValue = displayValue * -1;
        populateDisplay();
    }
}

populateDisplay();
