// caching the DOM and variables for number and operator storage
const KEYPAD_BUTTONS = document.querySelectorAll('.keyPad-btn');
const RESULT_DISPLAY = document.getElementById('display');
let numOne = 0;
let numTwo = 0;
let operator = undefined;
let currentSequence = '';

// operate() functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// function takes two numbers and an operator as parameters, 
// allowing it to perform the specified operation on the given numbers and returning the result.
const operate = (num1, num2, operator) => {
  const result;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case  "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  };
  return result;
};

// Function to add event listeners that update display with inputted data
const setupKeyPadBtnListeners = () => {
  KEYPAD_BUTTONS.forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.getAttribute('data-value');
      processInput(input);
     });
  });
};

// Function to handle keyboard events
const handleKeyDown = (event) => {
  const key = event.key;
  if (!isNaN(key) || ['+', '-', '*', '/'].includes(key)) {
    processInput(key);    
  } else if (key === '=' || key === 'Enter') {
    processInput('=');
  } else if (key === 'Delete') {
    processInput('AC')
  } else if (key === 'Backspace') {
    processInput('DEL');
  }; 
};

// Add event listener for keyboard events.
document.addEventListener('keydown', handleKeyDown);

// function returns true if user selects an operator.
const operatorCheck = (userInput) => ['+', '-', '/', '*'].includes(userInput)

// handles all incoming inputs
const  processInput = (userInput) => {
  debugger
  const convertedString = parseFloat(currentSequence);

  if (operatorCheck(userInput)) {
    if (operator === undefined && numOne === 0) {
      numOne = convertedString;  
      numTwo = convertedString;
      operator = userInput;
      clearCurrentSequence();
    } else if (operator !== undefined && numOne !== 0) {
      operator = userInput;
    } else if (operator !== undefined && currentSequence === 0) {
      operator = userInput;
    } else if (operator !== undefined && currentSequence !== 0) {
      numTwo = convertedString;
      result = operate(numOne, numTwo, operator);
      displayResult(result);
      numOne = result;
      numTwo = 0;
      operator = userInput;
      clearCurrentSequence();
    };
  } else if (userInput === "=") {
    numTwo = convertedString;

    if (numTwo === 0 && operator === "/") {
      alert("Yeah, yeah. Nice try, bub.")
      allClear();
      return;
    } else if (operator !== undefined && currentSequence !== 0) {
      result = operate(numOne, numTwo, operator);
      clearCurrentSequence();
      operator = undefined;
      numOne = result;
      numTwo = 0;
      displayResult(result);
    } else {
      // Do nothing if the user presses "=" without a valid expression
    };
  } else if (userInput === "AC") {
    allClear();
  } else if (userInput === "DEL") {
    currentSequence = currentSequence.slice(0, -1);
    currentSequence === '' ? displayDefault() : displayCurSeq();
  } else if (userInput === ".") {
    (currentSequence.includes('.')) ? alert("Only one '.' per number please") : currentSequence += userInput;

    displayCurSeq();
  } else {
    currentSequence += userInput;
    currentSequence = (currentSequence.charAt(0) === '0' && currentSequence.length > 1) ? currentSequence.substring(1) : currentSequence //removes zero from beginning of string

    displayCurSeq();
  };
};

// clears current sequence
const clearCurrentSequence = () => currentSequence = '';

// display functions 

// display results that have been rounded to prevent container runoff
const displayResult = (num) => RESULT_DISPLAY.textContent = Math.round(num * 10000) / 10000;

// displays current sequence
const displayCurSeq = () => RESULT_DISPLAY.textContent = currentSequence;

//displays zero for appropriate instances
const displayDefault = () => RESULT_DISPLAY.textContent = 0; 

// function clears currentSequence and resets all variables
const allClear = () => {
  clearCurrentSequence();
  numOne = 0;
  numTwo = 0;
  operator = undefined;
  displayDefault();
};

// setup event listeners and sets initial display
setupKeyPadBtnListeners();
displayDefault();