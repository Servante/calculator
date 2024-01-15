//variables for number and operator storage

let keyPadButtons = document.querySelectorAll('.keyPad-btn');
let resultDisplay = document.getElementById('display');
let numOne = 0;
let numTwo = 0;
let operator = undefined;
let currentSequence = '';

//operation functions

const add = function(a, b) {    //rewrite as arrow functions
  return a + b;
};

const subtract = function(a, b) {
  return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const divide = function(a, b) {
  return a / b
};

//-write a function that takes two numbers and an operator as parameters, 
//allowing it to perform the specified operation on the given numbers and returning the result."

const operate = function(num1, num2, operator) {
  let result;

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

// Function to update display with inputted data
function setupKeyPadBtnListeners() {
  keyPadButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      input = button.getAttribute('data-value');
      processInput(input);
     });
  });
};

// Function to handle keyboard events
function handleKeyDown(event) {
  debugger
  const key = event.key;
  if (!isNaN(key) || key === '.' || key  === '+' || key == "-" || key === '*' || key === '/') {
    processInput(key);    
  } else if (key === '=' || key === 'Enter') {
    processInput('=');
  } else if (key === 'Delete') {
    processInput('AC')
  } else if (key === 'Backspace') {
    processInput('DEL');
  }; 
};

// Add event listener for keyboard events
document.addEventListener('keydown', handleKeyDown);

function operatorCheck(userInput) {
  const ALLOWED_OPERATORS = ['+', '-', '/', '*'];
  return (ALLOWED_OPERATORS.includes(userInput));
};

function processInput(userInput) {
  // debugger
  if (operatorCheck(userInput)) {
    if (operator === undefined && numOne === 0) {
      numOne = convertString(currentSequence);  
      numTwo = convertString(currentSequence);
      operator = userInput;
      clearCurrentSequence();
    } else if (operator === undefined && numOne != 0) {
      operator = userInput;
    } else if (operator != undefined && currentSequence === 0) {
      operator = userInput;
    } else if (operator != undefined && currentSequence != 0) {
      numTwo = convertString(currentSequence);
      result = operate(numOne, numTwo, operator);
      displayResult(result);
      numOne = result;
      numTwo = 0;
      operator = userInput;
      clearCurrentSequence();
    };
  } else if (userInput === "=") {
    numTwo = convertString(currentSequence);
      if (numTwo === 0 && operator === "/") {
        alert("Yeah, yeah. Nice try, bub.")
        allClear();
        return;
    } else if (operator !== undefined && currentSequence !== 0) {
      result = operate(numOne, numTwo, operator);
      tempOne = result;
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
    currentSequence = (currentSequence.charAt(0) === '0') ? currentSequence.substring(1) : currentSequence //removes zero from beginning of string
    displayCurSeq();
  };
};

// clearCurrentSequence();

function clearCurrentSequence() {
  currentSequence = '';
};

// display functions 

// display results that have been rounded to prevent container runoff
function displayResult(num) {
  resultDisplay.textContent = Math.round(num * 10000) / 10000;
};

// displays current sequence
function displayCurSeq() {
  resultDisplay.textContent = currentSequence;
};

//displays zero for appropriate instances
function displayDefault() {
  resultDisplay.textContent = 0;
}; 

//convertString(str)

function convertString(str) {
  return parseFloat(str);
};

//allClear();

function allClear() {
  clearCurrentSequence();
  numOne = 0;
  numTwo = 0;
  operator = undefined;
  displayDefault();
};

setupKeyPadBtnListeners();
displayDefault();