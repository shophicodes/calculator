let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let isItInteger = n => n - Math.round(n) == 0 ? true : false;

let output = document.querySelector("#output");
let actions = document.querySelectorAll(".btn")
let firstNumber = "", secondNumber = "", operation = "";
let firstIteration = true;
let result = 0;

function operate(x, y, operator) {
    let result = 0;
    switch(operator) {
        case '+':
            result = add(x, y);
            break;
        case '-':
            result = subtract(x, y);
            break;
        case '*':
            result = multiply(x, y);
            break;
        case '/':
            if(y === 0) {
                return "Error: Division by zero";
            }
            result = divide(x, y);
            break;
    }
    return result;
}

function formatResult() {
    if(secondNumber !== "") {
        firstNumber = isItInteger(firstNumber) ? parseInt(firstNumber) : parseFloat(firstNumber);
        secondNumber = isItInteger(secondNumber) ? parseInt(secondNumber) : parseFloat(secondNumber);
        result = operate(firstNumber, secondNumber, operation);
        firstNumber = result;
    }
    output.textContent = firstNumber;
}

actions.forEach(action => action.addEventListener("click", () => {
    switch(action.textContent) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if(firstIteration) {
                firstNumber += action.textContent;
                output.textContent = firstNumber;
            }      
            else {
                secondNumber += action.textContent;
                output.textContent = secondNumber;
            }
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            if(firstNumber === "") break;
            if(!firstIteration && secondNumber !== "") {
                formatResult();
            }
            else {
                firstIteration = false;
            }
            operation = action.textContent;
            secondNumber = "";
            break;
        case "=":
            if(firstNumber === "") break;
            formatResult();
            firstIteration = true;
            secondNumber = "";
            break;
        case "C":
            firstNumber = "";
            secondNumber = "";
            operation = "";
            result = 0;
            firstIteration = true;
            output.textContent = "0";
            break;
        case "DEL":
            if(firstIteration) {
                if(firstNumber === "") break;
                else if(firstNumber.length == 1) {
                    firstNumber = "";
                    output.textContent = "0";
                }
                else {
                    firstNumber = firstNumber.slice(0, -1); 
                    output.textContent = output.textContent.slice(0, -1);
                }
            }
            else {
                if(secondNumber === "") break;
                else if(secondNumber.length == 1) {
                    secondNumber = "";
                    output.textContent = "0";
                }
                else {
                    secondNumber = secondNumber.slice(0, -1);
                    output.textContent = output.textContent.slice(0, -1);
                }
            }
            break;
        case ".":
            if(firstIteration) {
                if(firstNumber.includes(".")) {
                    break;
                }
                else {
                    firstNumber += ".";
                    output.textContent += ".";
                }
            }
            else {
                if(secondNumber.includes(".")) {
                    break;
                }
                else {
                    secondNumber += ".";
                    output.textContent += ".";
                }
            }
            break;
    }
}));

/*
    add event when an calculator button (action) is pressed
        use switch statement to determine what type of action is
            in case of a digit (0-9)
                add a digit to a number
            in case of operations (+,-,*,/)
                if first and second number and operator were already defined
                    calculate those two numbers with specified operator
                    display their result
                otherwise, display operator instead
        
        at the end, add number to a display


*/