const bulb = document.getElementById('bulb');
const toggleBtn = document.getElementById('toggleBtn');
const typeSelect = document.getElementById('bulbType');
const brightnessBtn = document.getElementById('brightnessBtn');

let isOn = false;
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (isOn) {
            turnOff();
            console.log("Лампочку вимкнено автоматично через бездіяльність.");
        }
    }, 5000); 
}

function turnOff() {
    isOn = false;
    bulb.classList.remove('on');
    bulb.classList.add('off');
    toggleBtn.textContent = "Включити";
}

toggleBtn.addEventListener('click', () => {
    isOn = !isOn;
    
    if (isOn) {
        bulb.classList.remove('off');
        bulb.classList.add('on');
        toggleBtn.textContent = "Виключити";
    } else {
        turnOff();
    }
    resetInactivityTimer();
});

typeSelect.addEventListener('change', (e) => {
    const selectedType = e.target.value;
    
    bulb.classList.remove('regular', 'energy', 'led');
    bulb.classList.add(selectedType);
    
    bulb.style.opacity = 1; // яскравість
    
    resetInactivityTimer();
});

brightnessBtn.addEventListener('click', () => {
    if (!bulb.classList.contains('led')) {
        alert("Зміна яскравості доступна лише для LED лампочок!");
        return;
    }

    if (!isOn) {
        alert("Спочатку увімкніть лампочку!");
        return;
    }

    let brightness = prompt("Введіть яскравість від 10 до 100:", "100");
    
    if (brightness !== null && brightness >= 10 && brightness <= 100) {
        bulb.style.opacity = brightness / 100;
        console.log(`Яскравість встановлено на ${brightness}%`);
    } else {
        alert("Будь ласка, введіть коректне число від 10 до 100.");
    }
    
    resetInactivityTimer();
});

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);

resetInactivityTimer();