const add = (a,b) =>{
	return a + b;
}
const substract = (a, b) =>{
	return a-b;
}

const multiply = (a, b) =>{
	return a*b;
}

const divide = (a, b) =>{
	return a/b;
}


const operate = (x, y, op) => {
	if(op === '+') return add(x,y);
	if(op === '-') return substract(x,y);
	if(op === '*') return multiply(x,y);
	if(op === '/') return divide(x,y);
}

let displayValue = '0';
let firstNum = null;
let secondNum = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');


const updateDisplay = () => {
	display.innerText = displayValue;
	if(displayValue.length > 9) {
		display.innerText = displayValue.substring(0, 9);
	}
}
  
updateDisplay();

const clickButton = () => {
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function() {
			if (buttons[i].value.match(/[0-9.]/)) {
				inputOperand(buttons[i].value);
				updateDisplay();
			} else if (buttons[i].value.match(/[/*-+]/)) {
				inputOperator(buttons[i].value);
			} else if (buttons[i].value == '=') {
				inputEquals();
				updateDisplay();
			} else if (buttons[i].value == 'clear')
				clearDisplay();
				updateDisplay();
		}
	)}
}

clickButton();

const inputOperand = operand => {
	if (firstOperator === null) {
		if (displayValue === '0' || displayValue === 0) {
			displayValue = operand;
		} else if (displayValue === firstNum) {
			displayValue = operand;
		} else {
			displayValue += operand;
		}
	} else {
		if (displayValue === firstNum) {
			displayValue = operand;
		} else {
			displayValue += operand;
		}
	}
}

const inputOperator = operator => {
	if (firstOperator != null && secondOperator === null) {
		secondOperator = operator;
		secondNum = displayValue;
		result = operate(Number(firstNum), Number(secondNum), firstOperator);
		displayValue = roundAccurately(result, 15).toString();
		firstNum = displayValue;
		result = null;
	} else if (firstOperator != null && secondOperator != null) {
		secondNum = displayValue;
		result = operate(Number(firstNum), Number(secondNum), secondOperator);
		secondOperator = operator;
		displayValue = roundAccurately(result, 15).toString();
		firstNum = displayValue;
		result = null;
	} else { 
		firstOperator = operator;
		firstNum = displayValue;
	}
}


const inputEquals = () => {
	if (firstOperator === null) {
		displayValue = displayValue;
	} else if (secondOperator != null) {
		secondNum = displayValue;
		result = operate(Number(firstNum), Number(secondNum), secondOperator);
		displayValue = roundAccurately(result, 15).toString();
		firstNum = displayValue;
		secondNum = null;
		firstOperator = null;
		secondOperator = null;
		result = null;
	} else {
		secondNum = displayValue;
		result = operate(Number(firstNum), Number(secondNum), firstOperator);
		displayValue = roundAccurately(result, 15).toString();
		firstNum = displayValue;
		secondNum = null;
		firstOperator = null;
		secondOperator = null;
		result = null;
	}
}

const clearDisplay = () => {
	displayValue = '0';
	firstNum = null;
	secondNum = null;
	firstOperator = null;
	secondOperator = null;
	result = null;
}



const roundAccurately = (num, places) => {
	return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}