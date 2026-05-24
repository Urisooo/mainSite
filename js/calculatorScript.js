
document.addEventListener('DOMContentLoaded', () => {
    
    const calcChassis = document.getElementById('calcChassis');
    const toggleBtn = document.getElementById('toggleBtn');
    const eqKey = document.getElementById('eqKey');
    const resultDisplay = document.getElementById('result');
    const historyDisplay = document.getElementById('history');
    const buttonsContainer = document.querySelector('.buttons');

    let currentInput = '0';
    let isEvaluated = false;
    let isSciModeActive = false;

   
    buttonsContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.matches('button')) return;

        const val = target.getAttribute('data-val');
        const action = target.getAttribute('data-action');

        if (val) {
            append(val);
        } else if (action) {
            if (action.startsWith('sci-')) {
                scientific(action.replace('sci-', ''));
            } else {
                switch (action) {
                    case 'clear': clearDisplay(); break;
                    case 'backspace': backspace(); break;
                    case 'calculate': calculate(); break;
                    case 'toggle-mode': toggleSciPanel(); break;
                }
            }
        }
    });

   
    function toggleSciPanel() {
        isSciModeActive = !isSciModeActive;
        
        if (isSciModeActive) {
            calcChassis.classList.add('sci-active');
            toggleBtn.innerText = "Basic Mode";
            toggleBtn.style.gridColumn = "span 5"; // Expand layout across all columns
            eqKey.style.gridColumn = "span 1";     // Shrink equal key down to normal bounds
        } else {
            calcChassis.classList.remove('sci-active');
            toggleBtn.innerText = "Sci Mode";
            toggleBtn.style.gridColumn = "span 4"; // Restore standard 4-wide footer tracking
            eqKey.style.gridColumn = "span 2";     // Expand equal key back out
        }
    }


    function append(value) {
        if (isEvaluated) {
            if (!isNaN(value) || value === '.' || value.startsWith('Math.')) {
                currentInput = '';
            }
            isEvaluated = false;
        }

        if (currentInput === '0' && value !== '.' && !isNaN(value)) {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateDisplay();
    }

   
    function clearDisplay() {
        currentInput = '0';
        historyDisplay.innerText = '';
        isEvaluated = false;
        updateDisplay();
    }

   
    function backspace() {
        if (currentInput.endsWith('Math.PI')) {
            currentInput = currentInput.slice(0, -7);
        } else if (currentInput.endsWith('Math.E')) {
            currentInput = currentInput.slice(0, -6);
        } else if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        if (currentInput === '') currentInput = '0';
        updateDisplay();
    }

   
    function scientific(type) {
        try {
            calculateRawValueWithoutInterfaceUpdate();
            let numericValue = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/'));
            
            switch (type) {
                case 'sin':
                    historyDisplay.innerText = `sin(${currentInput})`;
                    currentInput = Math.sin(numericValue * Math.PI / 180).toString();
                    break;
                case 'cos':
                    historyDisplay.innerText = `cos(${currentInput})`;
                    currentInput = Math.cos(numericValue * Math.PI / 180).toString();
                    break;
                case 'tan':
                    historyDisplay.innerText = `tan(${currentInput})`;
                    currentInput = Math.tan(numericValue * Math.PI / 180).toString();
                    break;
                case 'log':
                    historyDisplay.innerText = `log(${currentInput})`;
                    currentInput = Math.log10(numericValue).toString();
                    break;
                case 'sqrt':
                    historyDisplay.innerText = `√(${currentInput})`;
                    currentInput = Math.sqrt(numericValue).toString();
                    break;
                case 'sqr':
                    historyDisplay.innerText = `(${currentInput})²`;
                    currentInput = Math.pow(numericValue, 2).toString();
                    break;
            }
            
            if (!isNaN(currentInput)) {
                currentInput = Number(parseFloat(currentInput).toFixed(8)).toString();
            }
            isEvaluated = true;
        } catch (error) {
            currentInput = 'Error';
            isEvaluated = true;
        }
        updateDisplay();
    }

    function calculateRawValueWithoutInterfaceUpdate() {
        try {
            let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
            let result = Function('"use strict"; return (' + expression + ')')();
            currentInput = result.toString();
        } catch(e) {}
    }

   
    function calculate() {
        try {
            let ExpressionToParse = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
            let evaluatedResult = Function('"use strict"; return (' + ExpressionToParse + ')')();
            
            historyDisplay.innerText = currentInput + ' =';
            currentInput = Number(evaluatedResult.toFixed(8)).toString();
            isEvaluated = true;
        } catch (error) {
            currentInput = 'Error';
            isEvaluated = true;
        }
        updateDisplay();
    }


    function updateDisplay() {
        let renderingText = currentInput
            .replace(/\*\*/g, '^')
            .replace(/Math\.PI/g, 'π')
            .replace(/Math\.E/g, 'e');
        resultDisplay.innerText = renderingText;
    }

 
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
            append(key);
        } else if (key === '^') {
            append('**');
        } else if (key === 'Enter' || key === '=') {
            calculate();
        } else if (key === 'Backspace') {
            backspace();
        } else if (key === 'Escape') {
            clearDisplay();
        }
    });
});