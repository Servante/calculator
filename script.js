
//variables for number and operand storage

let keyPadButtons = document.querySelectorAll('.keyPad-btn');
let resultDisplay = document.getElementById('display');
let numOne = 0;
let numTwo = 0;
let operand = undefined;
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

//-write a function that takes two numbers and an operand as parameters, 
//allowing it to perform the specified operation on the given numbers and returning the result."

const operate = function(num1, num2, operand) {
  if (num2 == 0 && operand == "/") {
    alert("Yeah, yeah. Nice try, bub,")
    return;
  };

  let result;

  switch (operand) {
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

function operandCheck(userInput) {
  const ALLOWED_OPERATORS = ['+', '-', '/', '*'];
  return (ALLOWED_OPERATORS.includes(userInput));
};

function processInput(userInput) {
  // debugger
  if (operandCheck(userInput)) {
    if (operand == undefined && numOne == 0) {
      numOne = convertString(currentSequence);  
      numTwo = convertString(currentSequence);
      operand = userInput;
      clearCurrentSequence();
    } else if (operand == undefined && numOne != 0) {
      operand = userInput;
    } else if (operand != undefined && currentSequence == 0) {
      operand = userInput;
    } else if (operand != undefined && currentSequence != 0) {
      numTwo = convertString(currentSequence);
      result = operate(numOne, numTwo, operand);
      displayNum(result);
      numOne = result;
      numTwo = 0;
      operand = userInput;
      clearCurrentSequence();
    };
  } else if (userInput === "=") {
      if (operand !== undefined && currentSequence !== 0) {
        numTwo = convertString(currentSequence);
        result = operate(numOne, numTwo, operand);
        tempOne = result;
        clearCurrentSequence();
        operand = undefined;
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
  operand = undefined;
  displayNum(currentSequence);
};

setupKeyPadBtnListeners();