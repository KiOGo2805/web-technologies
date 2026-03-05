function findMinMax(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    console.log("1.1 Мін/Макс масиву:", { масив: arr, min, max });
}

function compareObjects(obj1, obj2) {
    const result = JSON.stringify(obj1) === JSON.stringify(obj2);
    console.log("1.2 Порівняння об'єктів:", { obj1, obj2, однакові: result });
}


function checkRange(num) {
    const isInRange = num >= 10 && num <= 20;
    console.log(`2.1 Чи входить ${num} у діапазон 10-20?`, isInRange);
}

function testNot(value) {
    console.log(`2.2 Оператор NOT: було ${value} -> стало ${!value}`);
}


function evaluateGrade(score) {
    let result;
    if (score >= 91) result = "відмінно";
    else if (score >= 71) result = "добре";
    else if (score >= 51) result = "задовільно";
    else result = "незадовільно";
    console.log(`3.1 Оцінка (${score}):`, result);
}

function getSeason(month) {
    const season = (month === 12 || month <= 2) ? "Зима" :
                   (month >= 3 && month <= 5) ? "Весна" :
                   (month >= 6 && month <= 8) ? "Літо" :
                   (month >= 9 && month <= 11) ? "Осінь" : "Помилка";
    console.log(`3.2 Сезон для місяця №${month}:`, season);
}


console.log("%c--- РЕЗУЛЬТАТИ ВИКОНАННЯ ---", "color: #4CAF50; font-weight: bold; font-size: 14px;");

findMinMax([10, 2, 33, -5, 8]);
compareObjects({ a: 1 }, { a: 1 });

checkRange(25);
testNot(true);

evaluateGrade(82);
getSeason(4);
getSeason(12);