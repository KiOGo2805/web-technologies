const redLight = document.getElementById('red-light');
const yellowLight = document.getElementById('yellow-light');
const greenLight = document.getElementById('green-light');
const stateText = document.getElementById('state-text');

let timings = {
    red: 5000,
    yellow: 3000,
    green: 7000
};

let currentState = 0; 
let timeoutId = null;
let blinkIntervalId = null;

function turnOffAll() {
    redLight.style.opacity = 0.3;
    yellowLight.style.opacity = 0.3;
    greenLight.style.opacity = 0.3;
}

function switchLight(state) {
    clearTimeout(timeoutId);
    clearInterval(blinkIntervalId);
    
    turnOffAll();
    currentState = state;

    switch (state) {
        case 0:
            redLight.style.opacity = 1;
            stateText.textContent = "червоний";
            stateText.style.color = "#ff3b3b";
            timeoutId = setTimeout(() => switchLight(1), timings.red);
            break;

        case 1:
            redLight.style.opacity = 1;
            yellowLight.style.opacity = 1;
            stateText.textContent = "червоний + жовтий";
            stateText.style.color = "#ffeb3b";
            timeoutId = setTimeout(() => switchLight(2), timings.yellow);
            break;

        case 2:
            greenLight.style.opacity = 1;
            stateText.textContent = "зелений";
            stateText.style.color = "#00e676";
            timeoutId = setTimeout(() => switchLight(3), timings.green);
            break;

        case 3:
            stateText.textContent = "миготливий жовтий";
            stateText.style.color = "#ffeb3b";
            
            let blinkCount = 0;
            let isYellowOn = false;
            
            blinkIntervalId = setInterval(() => {
                isYellowOn = !isYellowOn;
                yellowLight.style.opacity = isYellowOn ? 1 : 0.3;
                blinkCount++;

                if (blinkCount >= 6) {
                    clearInterval(blinkIntervalId);
                    switchLight(0);
                }
            }, 500); 
            break;
    }
}

document.getElementById('timeBtn').addEventListener('click', () => {
    let r = prompt("Введіть час для ЧЕРВОНОГО (в секундах):", timings.red / 1000);
    if (r === null) return;

    let y = prompt("Введіть час для ЖОВТОГО (в секундах):", timings.yellow / 1000);
    if (y === null) return;

    let g = prompt("Введіть час для ЗЕЛЕНОГО (в секундах):", timings.green / 1000);
    if (g === null) return;

    if (r.trim() !== "" && y.trim() !== "" && g.trim() !== "" && 
        !isNaN(r) && !isNaN(y) && !isNaN(g) &&
        Number(r) > 0 && Number(y) > 0 && Number(g) > 0) {
        
        timings.red = Number(r) * 1000;
        timings.yellow = Number(y) * 1000;
        timings.green = Number(g) * 1000;
        
        switchLight(currentState);
    } else {
        alert("Помилка! Потрібно вводити лише коректні числа (більші за нуль).");
    }
});

document.getElementById('manualBtn').addEventListener('click', () => {
    let nextState = (currentState + 1) % 4;
    switchLight(nextState);
});

switchLight(0);