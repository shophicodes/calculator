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
            if(y === 0) break;
            result = divide(x, y);
            break;
    }
    return result;
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
            console.log(firstNumber);
            console.log(secondNumber);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            if(!firstIteration) {
                firstNumber = isItInteger(firstNumber) ? parseInt(firstNumber) : parseFloat(firstNumber);
                secondNumber = isItInteger(secondNumber) ? parseInt(secondNumber) : parseFloat(secondNumber);
                result = operate(firstNumber, secondNumber, operation);
                firstNumber = result;
                output.textContent = firstNumber;
            }
            else {
                firstIteration = false;
            }
            operation = action.textContent;
            secondNumber = "";
            console.log(operation);
            break;
        case "=":
            firstNumber = isItInteger(firstNumber) ? parseInt(firstNumber) : parseFloat(firstNumber);
            secondNumber = isItInteger(secondNumber) ? parseInt(secondNumber) : parseFloat(secondNumber);
            result = operate(firstNumber, secondNumber, operation);
            firstNumber = result;
            output.textContent = firstNumber;
            firstIteration = true;
            secondNumber = "";
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