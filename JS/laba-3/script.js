function task1() {
    let count = 0;
    let a = 0, b = 1;
    let result = 0;
    
    while (count < 10) {
        result += a;
        let next = a + b;
        a = b;
        b = next;
        count++;
    }
    console.log("Завдання 1:", result);
}

function task2() {
    let result = 0;
    
    for (let i = 2; i <= 1000; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) result += i;
    }
    console.log("Завдання 2:", result);
}

function task3(dayNumber) {
    let result;
    switch (dayNumber) {
        case 1: result = "Понеділок"; break;
        case 2: result = "Вівторок"; break;
        case 3: result = "Середа"; break;
        case 4: result = "Четвер"; break;
        case 5: result = "П'ятниця"; break;
        case 6: result = "Субота"; break;
        case 7: result = "Неділя"; break;
        default: result = "Некоректне число";
    }
    console.log("Завдання 3:", result);
}

function task4(strings) {
    const result = strings.filter(str => str.length % 2 !== 0);
    console.log("Завдання 4:", result);
}

const task5 = (numbers) => {
    const result = numbers.map(n => n + 1);
    console.log("Завдання 5:", result);
};

function task6(a, b) {
    const result = (a + b === 10) || (Math.abs(a - b) === 10);
    console.log("Завдання 6", result);
}

console.log("%c--- РЕЗУЛЬТАТИ ЛАБОРАТОРНОЇ №3 ---", "color: #2196F3; font-weight: bold;");
task1();
task2();
task3(3);
task4(["apple", "bananas", "kiwi", "pear"]);
task5([10, 20, 30]);
task6(15, 5);