let numbersInCalculation = [];
let operator;
let displayValue = '0';

let AC = document.querySelector('#AC');
AC.addEventListener('click', clearDisplay);

let numbers = document.querySelectorAll('.number');
    numbers.forEach(button => {
        button.addEventListener("click", calculateDisplay);
    });

let operators = document.querySelectorAll('.operator');
    operators.forEach(operatorValue => {
        operatorValue.addEventListener('click', getOperator); 
    })

let modulators = document.querySelectorAll('.modulator');
    modulators.forEach(modulatorValue => {
        modulatorValue.addEventListener('click', enactModulator); 
    })

let equals = document.querySelector('#equals');
    equals.addEventListener('click', e => {
        if (numbersInCalculation.length === 0)
        {
            return;
        }
        else if (numbersInCalculation.length === 1)
        {
            numbersInCalculation.push(displayValue);
        }
        displayValue = operate(numbersInCalculation[0], numbersInCalculation[1], operator);
        numbersInCalculation.shift();
        numbersInCalculation.unshift(displayValue);
        populateDisplay();
    });

let allButtons = document.querySelectorAll('.column');
    allButtons.forEach(button => {
        button.addEventListener("click", addHighlight);
        button.addEventListener("transitionend", removeHighlight);
    });

function clearDisplay() {
    displayValue = '0';
    numbersInCalculation = [];
    populateDisplay();
}

function calculateDisplay(event) {
    if (event.target.textContent.includes(".") && displayValue.includes("."))
    {
        return;
    }
    if (displayValue === '0' && event.target.textContent.includes('0'))
    {
        return;
    }
    else if (event.target.querySelector('.text') && displayValue.length < 7)
    {
        if (displayValue === '0')
        {
            displayValue = event.target.querySelector('.text').textContent;
        }
        else
        {
            displayValue += event.target.querySelector('.text').textContent;
        } 
    }
    else if (displayValue.length < 7)
    {
        if (displayValue === '0')
        {
            displayValue = event.target.textContent;
        }
        else
        {
            displayValue += event.target.textContent;
        }
    }

    else if (numbersInCalculation.length >= 2)
    {
        clearDisplay(); 
        displayValue = event.target.textContent;
    }

    populateDisplay();
}

function populateDisplay() {
    const display = document.querySelector(".display .text");
    display.textContent = `${displayValue}`;
}

function add(number1, number2) {
    return Number(number1) + Number(number2);
}

function subtract(number1, number2) {
    return number1 - number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function operate(number1, number2, operator)
{
    if (operator === "add")
    {
        return add(number1, number2);
    }
    else if (operator === "subtract")
    {
        return subtract(number1, number2);
    }
    else if (operator === "multiply")
    {
        return multiply(number1, number2);
    }
    else if (operator === "divide")
    {
        return divide(number1, number2);
    }
}

function getOperator(e) {
    switch (e.target.id) {
        case 'plus':
        operator = 'add'
        break;

        case 'addition':
        operator = 'add'
        break;

        case 'minus':
        operator = 'subtract'
        break;

        case 'subtraction':
        operator = 'subtract'
        break;

        case 'times':
        operator = 'multiply'
        break;

        case 'multiplication':
        operator = 'multiply'
        break;

        case 'division':
        operator = 'divide'
        break;

        case 'dividedby':
        operator = 'divide'
        break;
    }
    if (numbersInCalculation.length === 0)
    {
        numbersInCalculation.push(displayValue);
    }
    else if (numbersInCalculation.length === 2)
    {
        numbersInCalculation = numbersInCalculation.slice(0,1);
    }
    displayValue = '';
    return operator;
}

function addHighlight(e) {
    if (e.target.classList.contains("column"))
    {
        e.target.classList.add('highlight');
    }
    else
    {
        e.target.parentNode.classList.add('highlight');
    }
}

function removeHighlight(e) {
    if (e.target.classList.contains("column"))
    {
        e.target.classList.remove('highlight');
    }
    else
    {
        e.target.parentNode.classList.remove('highlight');
    }
}

function enactModulator(e) {
    if (e.target.textContent.includes('%'))
    {
        displayValue = displayValue * 0.01;
        populateDisplay();
    }
    else
    {
        displayValue = displayValue * -1;
        populateDisplay();
    }
}

populateDisplay();
