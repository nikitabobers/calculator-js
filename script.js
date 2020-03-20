// Buttons
const btnNumber = document.querySelectorAll(".btn-number");
const btnSymbol = document.querySelectorAll(".btn-symbol");
const btnClear = document.querySelector(".btn-clear");
const btnDelete = document.querySelector(".btn-delete");
const btnResult = document.querySelector(".btn-result");
// Display
const currentNumberDisplay = document.querySelector(".currentNumber");
const previousNumberDisplay = document.querySelector(".previousNumber");

class Calculator {
    constructor(previousNumberDisplay, currentNumberDisplay) {
        this.previousNumberDisplay = previousNumberDisplay;
        this.currentNumberDisplay = currentNumberDisplay;
        this.clear();
    }
    clear() {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operation = undefined;
        this.displayUpdate();
    }
    delete() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }
    addNumber(number) {
        if (this.currentNumber.includes(".") && number === ".") return;
        this.currentNumber = this.currentNumber.toString() + number.toString();
    }
    selectOperation(operation) {
        if (this.currentNumber === "") return;
        if (this.previousNumber !== "") {
            this.calculate();
        }

        this.operation = operation;

        if (this.operation === "%") {
            this.currentNumber = this.currentNumber / 100;
        } else if (this.operation === "+/-") {
            this.currentNumber = this.currentNumber * -1;
        } else {
            this.previousNumber = `${this.currentNumber} ${this.operation}`;
            this.currentNumber = "";
        }
    }
    calculate() {
        // Displayed result
        let result;

        // Convert to number from string
        const currentNumber = parseFloat(this.currentNumber);
        const previousNumber = parseFloat(this.previousNumber);

        if (isNaN(currentNumber) && Number.isInteger(previousNumber)) {
            this.clear();
            this.currentNumber = previousNumber;
        }

        // Return calculated result if nothing changes
        if (isNaN(currentNumber) || isNaN(previousNumber)) return;
        switch (this.operation) {
            case "+":
                result = previousNumber + currentNumber;
                break;
            case "-":
                result = previousNumber - currentNumber;
                break;
            case "×":
                result = previousNumber * currentNumber;
                break;
            case "÷":
                result = previousNumber / currentNumber;
                break;
            default:
                return;
        }
        this.clear();
        this.currentNumber = result;
        btnClear.style.display = "initial";
        btnDelete.style.display = "none";
    }
    showClearAllBtn() {
        btnClear.style.display = "initial";
        btnDelete.style.display = "none";
    }
    displayNumber(number) {
        const stringNumber = number.toString();
        const integerNumber = parseFloat(stringNumber.split(".")[0]);
        const decimalNumber = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerNumber)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerNumber.toLocaleString("en", { maximumFractionDigits: 0 });
        }
        if (decimalNumber != null) {
            return `${integerDisplay}.${decimalNumber}`;
        } else {
            return integerDisplay;
        }
    }

    displayUpdate() {
        if (this.currentNumber > 0) {
            btnClear.style.display = "none";
            btnDelete.style.display = "initial";
        } else if (this.currentNumber <= 0) {
            this.showClearAllBtn();
        }
        this.currentNumberDisplay.innerText = this.displayNumber(this.currentNumber);
        this.previousNumberDisplay.innerText = this.displayNumber(this.previousNumber);
    }
}

const calculator = new Calculator(previousNumberDisplay, currentNumberDisplay);

// Number click listener
btnNumber.forEach(button => {
    button.addEventListener("click", () => {
        calculator.addNumber(button.innerText);
        calculator.displayUpdate();
    });
});

// Symbol click listener
btnSymbol.forEach(button => {
    button.addEventListener("click", () => {
        calculator.selectOperation(button.innerText);
        calculator.displayUpdate();
    });
});

// Clear button
btnClear.addEventListener("click", () => calculator.clear());

btnDelete.addEventListener("click", () => {
    calculator.delete();
    calculator.displayUpdate();
});

// Result Button
btnResult.addEventListener("click", () => {
    calculator.calculate();
    calculator.displayUpdate();
    calculator.showClearAllBtn();
});
