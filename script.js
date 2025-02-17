let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let historyContainer = document.getElementById("history-list");

let string = "";
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

function renderHistory() {
    historyContainer.innerHTML = "";   
    history.forEach(entry => {
        const li = document.createElement("li");
        li.innerText = entry;
        historyContainer.appendChild(li);
    });
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        if (value === '=') {
            try {
                let result = eval(string);
                input.value = result;
                
                let entry = `${string} = ${result}`;
                history.push(entry);
                
                if (history.length > 10) {
                    history.shift();
                }

                localStorage.setItem("calcHistory", JSON.stringify(history));
                
                renderHistory();

                string = result.toString();

            } catch {
                input.value = "Error";
                string = "";
            }
        } else if (value === 'AC') {
            string = "";
            input.value = string;
        } else if (value === 'DEL') {
            string = string.slice(0, -1);   
            input.value = string;
        } else {
            string += value;
            input.value = string;
        }
    });
});

 
window.onload = function() {
    renderHistory();
};
