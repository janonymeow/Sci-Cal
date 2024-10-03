window.onload = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const expressionDisplay = document.getElementById('expression');
    const resultDisplay = document.getElementById('result');
    const buttons = document.querySelectorAll('.buttons button');

    let expression = '';
    let result = '';

    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark');
        const themeText = document.querySelector('.theme-text');
        themeText.textContent = themeToggle.checked ? "Switch to Light Mode" : "Switch to Dark Mode";
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'AC') {
                expression = '';
                result = '';
            } else if (value === '=') {
                try {
                    // Handle scientific functions
                    const formattedExpression = expression
                        .replace(/sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)')
                        .replace(/cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)')
                        .replace(/tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)')
                        .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)')
                        .replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
                    
                    result = eval(formattedExpression).toString();
                } catch {
                    result = 'Error';
                }
            } else {
                expression += value;
            }

            expressionDisplay.textContent = expression || '0';
            resultDisplay.textContent = result || '0';
        });
    });
}
