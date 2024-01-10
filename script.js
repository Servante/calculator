
//variables for number and operand storage

let keyPadButtons = document.querySelectorAll('.keyPad-btn');
let resultDisplay = document.getElementById('display');
let numOne = 0;
let numTwo = 0;
let operand = undefined;
// let resultDisplay = 0; 
let currentSequence = '';
// let inputCounter = 0;

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
      // console.log('this')
      input = button.getAttribute('data-value');
      // currentSequence += input;
      // updateNumVariable(currentSequence);
      processInput(input);
     
      // resultDisplay.textContent = currentSequence;
    });
  });
};

function operandCheck(userInput) {
  const ALLOWED_OPERATORS = ['+', '-', '/', '*'];

  if (ALLOWED_OPERATORS.includes(userInput)) {
    return true;
  } else {
    return false;
  };
};

function processInput(userInput) {
  if (operandCheck(userInput)) {
    if (operand == undefined && numOne == 0) {
      numOne = convertString(currentSequence);  //possible refactor convertString
      numTwo = convertString(currentSequence);
      operand = userInput;
      clearCurrentSequence();
    } else if (operand != undefined && currentSequence == 0) {
      operand = userInput;
    } else if (operand != undefined && currentSequence != 0) {
      numTwo = convertString(currentSequence);
      result = operate(numOne, numTwo, operand);
      displayNum(result);
      numOne = result;
      numTwo = 0;
      clearCurrentSequence();
      operand = userInput;
    };
  } else if (userInput == "=") {
    numTwo = convertString(currentSequence);
    result = operate(numOne, numTwo, operand);
    displayNum(result);
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
  resultDisplay.textContent = num
};

//convertString(str)

function convertString(str) {
  return parseInt(str);
};

setupKeyPadBtnListeners();