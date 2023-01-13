let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let isItInteger = n => n - Math.round(n) == 0 ? true : false;

let output = document.querySelector("#output");
let actions = document.querySelectorAll(".btn")
let firstNumber = "", secondNumber = "", operation = "";
let firstNumberForInput = true;
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
        firstNumber = isItInteger(firstNumber) ? 
        parseInt(firstNumber) : 
        parseFloat(firstNumber);

        secondNumber = isItInteger(secondNumber) ? 
        parseInt(secondNumber) : 
        parseFloat(secondNumber)
        
        result = operate(firstNumber, secondNumber, operation);
        firstNumber = result;
    }
    output.textContent = firstNumber;
    /* when two numbers were already specified after selecting an operation,
       result is calculated with previously given operation and is assigned to first number */
}

function resetcalculator() {
    firstNumber = "";
    secondNumber = "";
    operation = "";
    result = 0;
    firstNumberForInput = true;
    output.textContent = "0";
}

function deleteDigit(num) {
    if(num === "") return num;
    else if(num.length == 1) {
        num = "";
        output.textContent = "0";
    }
    else {
        num = num.slice(0, -1); 
        output.textContent = output.textContent.slice(0, -1);
    }
    return num;
}

function addDecimalSpace(num) {
    if(num.includes(".")) {
        return num;
    }
    else {
        num += ".";
        console.log(num);
        output.textContent += ".";
    }
    return num; 
    // added return so the decimal space doesn't get removed after adding another digit
}

actions.forEach(action => action.addEventListener("click", () => {
    switch(action.textContent) {
        case "0":
            if(output.textContent === "0") break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if(firstNumberForInput) {
                firstNumber += action.textContent;
                console.log(firstNumber);
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
            if(!firstNumberForInput && secondNumber !== "") {
                formatResult();
            }
            else {
                firstNumberForInput = false;
            }
            operation = action.textContent;
            secondNumber = "";
            break;
        case "=":
            if(firstNumber === "") break;
            formatResult();
            firstNumberForInput = true;
            secondNumber = "";
            break;
        case "C":
            resetcalculator();
            break;
        case "DEL":
            if(firstNumberForInput) {
                firstNumber = deleteDigit(firstNumber);
            }
            else {
                secondNumber = deleteDigit(secondNumber);
            }
            break;
        case ".":
            if(firstNumberForInput) {
                firstNumber = addDecimalSpace(firstNumber);
            } 
            else {
                secondNumber = addDecimalSpace(secondNumber);
            }
            break;
    }
}));
