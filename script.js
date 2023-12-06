
//variables for number and operand storage

let numberOne = 0;
let numberTwo = 0;
let operand = undefined;
let resultDisplay = 0;


//operation functions

const add = function(a, b) {
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

let operate = function(num1, num2, operand) {
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

