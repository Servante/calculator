
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
  if (num2 == 0 && operator == "/") {
    alert("Yeah, yeah. Nice try, bub,")
    return;
  };

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

//Function to update display with inputted data

function setupKeyPadBtnListeners() {
  keyPadButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      input = button.getAttribute('data-value');
      processInput(input);
     });
  });
};

function operatorCheck(userInput) {
  const ALLOWED_OPERATORS = ['+', '-', '/', '*'];
  return (ALLOWED_OPERATORS.includes(userInput));
};

function processInput(userInput) {
  // debugger
  if (operatorCheck(userInput)) {
    if (operator == undefined && numOne == 0) {
      numOne = convertString(currentSequence);  
      numTwo = convertString(currentSequence);
      operator = userInput;
      clearCurrentSequence();
    } else if (operator == undefined && numOne != 0) {
      operator = userInput;
    } else if (operator != undefined && currentSequence == 0) {
      operator = userInput;
    } else if (operator != undefined && currentSequence != 0) {
      numTwo = convertString(currentSequence);
      result = operate(numOne, numTwo, operator);
      displayNum(result);
      numOne = result;
      numTwo = 0;
      operator = userInput;
      clearCurrentSequence();
    };
  } else if (userInput === "=") {
      if (operator !== undefined && currentSequence !== 0) {
        numTwo = convertString(currentSequence);
        result = operate(numOne, numTwo, operator);
        tempOne = result;
        clearCurrentSequence();
        operator = undefined;
        numOne = result;
        numTwo = 0;
        displayNum(result);
    } else {
      // Do nothing if the user presses "=" without a valid expression
    };
  } else if (userInput === "AC") {
    allClear();
  } else {
    currentSequence += userInput;
    currentSequence = (currentSequence.charAt(0) === '0') ? currentSequence.substring(1) : currentSequence //removes zero from beginning of string
    displayNum(currentSequence);
  };
};

//clearCurrentSequence();

function clearCurrentSequence() {
  currentSequence = 0;
};

//displayNum();

function displayNum(num) {
  // Round the result to 4 decimal places
  const roundedResult = Math.round(num * 10000) / 10000;
  resultDisplay.textContent = roundedResult;
};

//convertString(str)

function convertString(str) {
  return parseInt(str);
};

//allClear();

function allClear() {
  clearCurrentSequence();
  numOne = 0;
  numTwo = 0;
  operator = undefined;
  displayNum(currentSequence);
};

setupKeyPadBtnListeners();