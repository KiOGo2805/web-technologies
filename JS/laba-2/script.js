// --- ЛОГІКА ЗАВДАНЬ ---

// 1. Пошук мін/макс
function getMinMax(numbers) {
    if (numbers.length === 0) return "Масив порожній";
    return { min: Math.min(...numbers), max: Math.max(...numbers) };
}

// 2. Перевірка діапазону (10 - 50)
function isInRange(num) {
    return num >= 10 && num <= 50;
}

// 3. Оцінка (if/else)
function getGradeText(score) {
    if (score >= 90) return "відмінно";
    if (score >= 75) return "добре";
    if (score >= 60) return "задовільно";
    return "незадовільно";
}

// 3. Сезон (тернарний оператор)
function getSeason(m) {
    return (m === 0) ? "Помилка" :
           (m === 12 || m <= 2) ? "Зима" :
           (m >= 3 && m <= 5) ? "Весна" :
           (m >= 6 && m <= 8) ? "Літо" :
           (m >= 9 && m <= 11) ? "Осінь" : "Помилка";
}

// --- ФУНКЦІЇ ДЛЯ INTERFACE ---

function runMinMax() {
    const val = document.getElementById('numsInput').value;
    const arr = val.split(',').map(Number); // перетворюємо рядок у масив чисел
    const res = getMinMax(arr);
    document.getElementById('minMaxResult').innerText = `Мін: ${res.min}, Макс: ${res.max}`;
}

function runRangeCheck() {
    const num = Number(document.getElementById('rangeInput').value);
    const result = isInRange(num);
    document.getElementById('rangeResult').innerText = result ? "В діапазоні" : "Поза діапазоном";
}

function runConditions() {
    const grade = Number(document.getElementById('gradeInput').value);
    const month = Number(document.getElementById('monthInput').value);
    
    const resDiv = document.getElementById('condResult');
    resDiv.innerHTML = `
        <p>Результат оцінки: <b>${getGradeText(grade)}</b></p>
        <p>Пора року: <b>${getSeason(month)}</b></p>
    `;
}