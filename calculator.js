let number1;
let number2;
let operator;
let displayValue = '0';

let AC = document.querySelector('#AC');
AC.addEventListener('click', clearDisplay);

let buttons = document.querySelectorAll('.number');
    buttons.forEach(button => {
        button.addEventListener("click", calculateDisplay);
    });

function clearDisplay() {
    displayValue = '0';
    populateDisplay();
}

function calculateDisplay(event) {
    if (displayValue === '0' && event.target.textContent.includes('0'))
    {
        return;
    }
    if (event.target.querySelector('.text') && displayValue.length < 7)
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
    populateDisplay();
}

function populateDisplay() {
    const display = document.querySelector(".display .text");
    display.textContent = `${displayValue}`;
}

function add(number1, number2) {
    return number1 + number2;
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

populateDisplay();
