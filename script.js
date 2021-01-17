
class Calculator {
    constructor(previousScreenElement, currentScreenElement) {

        // Saves the HTML Element that will be modified later
        this.previousScreenElement = previousScreenElement;
        this.currentScreenElement = currentScreenElement;

        // Initialize Calculator 
        this.clear();
        this.justGotResult = false;
    }
    
    clear() {

        // Clears the whole screen of the calculator
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
        this.updateCurrentScreen()
        this.updatePreviousScreen()
    }

    append(element) {

        // Avoids multiple '.' in screen
        if (this.currentOperand.includes('.') && element === ".") return 
        

        // Empties the screen if there has been a recent result computed
        // instead of appending it.

        if (this.justGotResult == false) {
        this.currentOperand = this.currentOperand.toString() + element.toString()

        } else {
            this.currentOperand = element
            this.justGotResult = false
        };

        this.updateCurrentScreen();
    }

    updateCurrentScreen() {

        // Updates the current operand screen and displays the new value of it 
        this.currentScreenElement.innerHTML = this.currentOperand
    }

    updatePreviousScreen() {

        // Updates the previous operand screen and displays the new value of it 
        this.previousScreenElement.innerHTML = this.previousOperand
    }

    applyFunction(calculatorFunction) {

        // Clears the calculator if AC is pressed
        if (calculatorFunction === "AC") {
            this.clear()

        
        // Deletes the last digit of the current operand and 
        // checks for irrational cases
        } else if (calculatorFunction === "DEL") {

            if (this.previousOperand.includes('=')) {
                this.clear()
            }
            // Deletion is done here
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
            this.updateCurrentScreen()

        } else if (calculatorFunction === "=") {

            if (this.previousOperand.includes('=') || this.currentOperand === "" 
            || this.operation === undefined) return

            this.compute()
        }

    }

    applyOperation(operation) {
        if (this.currentOperand === "") return
        this.operation = operation
        this.previousOperand = `${this.currentOperand} ${this.operation}`
        this.currentOperand = ""

        this.updateCurrentScreen()
        this.updatePreviousScreen()
    }


    compute() {

        // Converts string to float to perform computation
         
        const previousNumber = parseFloat(this.previousOperand)
        const currentNumber = parseFloat(this.currentOperand)

        let result;

        if (this.operation === "+") {
            result = previousNumber + currentNumber;
        } else if (this.operation === "-") {
            result = previousNumber - currentNumber;
        } else if (this.operation === "×") {
            result = previousNumber*currentNumber
        } else if (this.operation === "÷") {
            if (currentNumber == 0) {
            result = "Error: Division by Zero"
            } else {
                result = previousNumber/currentNumber
            }
        } 

        this.previousOperand = `${this.previousOperand} ${this.currentOperand} =`
        this.currentOperand = result
        this.updateCurrentScreen()
        this.updatePreviousScreen()
        this.justGotResult = true
    }




}

// Select the buttons to add functionality later
const numberButtons = document.querySelectorAll(".number")
const operationButtons = document.querySelectorAll(".operation");
const functionButtons = document.querySelectorAll(".function");

// Select the HTML Elements that will be modified later
const previousScreenElement = document.querySelector(".previous-screen");
const currentScreenElement = document.querySelector(".current-screen");

// Creates a new instance of the class Calculator
calculator = new Calculator(previousScreenElement, currentScreenElement);

// Adds functionality to the number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerHTML)
    })
})

// Adds functionality to the function buttons (AC, DEL, =)
functionButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.applyFunction(button.innerHTML)
    })
})

// Adds functionality to the operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.applyOperation(button.innerHTML)

    })
})