function task1() {
    console.log("%cЗавдання 1", "color: #2196f3; font-weight: bold;");
    let fruits = ["яблуко", "банан", "груша", "апельсин"];

    let removedFruit = fruits.pop();
    console.log("1.1 Видалене фрукт:", removedFruit);

    let newFruit = fruits.unshift("ананас");
    console.log("1.2 Оновлений масив:", newFruit);

    let sortedFruits = fruits.sort().reverse();
    console.log("1.3 Відсортований масив:", sortedFruits);

    console.log("1.4 Індекс яблука:", sortedFruits.indexOf("яблуко"));
}

function task2() {
    console.log("%cЗавдання 2", "color: #2196f3; font-weight: bold;");
    let colors = ["червоний", "зелений", "синій", "жовтий", "синьо-зелений"];

    let longest = colors.reduce((a, b) => a.length >= b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length <= b.length ? a : b);
    console.log("2.2 Найдовший:", longest, "| Найкоротший:", shortest);
    
    let filteredColors = colors.filter(c => c.includes("синій"));
    console.log("2.3 Рядки з 'синій':", filteredColors);

    let colorsString = colors.join(", ");
    console.log("2.4 Рядок:", colorsString);
}

function task3() {
    console.log("%cЗавдання 3", "color: #2196f3; font-weight: bold;");
    let workers = [
        { name: "Іван", age: 30, position: "розробник" },
        { name: "Анна", age: 25, position: "дизайнер" },
        { name: "Олег", age: 22, position: "розробник" }
    ];

    let sortedWorkers = workers.sort((a, b) => a.name.localeCompare(b.name));
    console.log("3.2 Відсортовані за ім'ям:", sortedWorkers);

    let developers = workers.filter(w => w.position === "розробник");
    console.log("3.3 Розробники:", developers);

    let youngWorkers = workers.filter(w => w.age <= 26);
    console.log("3.4 Працівники до 26 років:", youngWorkers);

    workers.push({ name: "Марія", age: 28, position: "HR" });
    console.log("3.5 Оновлений масив працівників:", workers);
}

function task4() {
    console.log("%cЗавдання 4", "color: #2196f3; font-weight: bold;");
    let students = [
        { name: "Олексій", age: 20, course: 3 },
        { name: "Марина", age: 19, course: 2 },
        { name: "Дмитро", age: 21, course: 4 }
    ];

    let filteredStudents = students.filter(s => s.name !== "Олексій");
    console.log("4.2 Студенти без Олексія:", filteredStudents);

    let newStudent = { name: "Степан", age: 18, course: 1 };
    students.push(newStudent);
    console.log("4.3 Оновлений масив студентів:", students);

    let sortedStudents = students.sort((a, b) => b.age - a.age);
    console.log("4.4 Відсортовані студенти за віком:", sortedStudents);

    let thirdCourse = students.find(s => s.course === 3);
    console.log("4.5 Студент 3 курсу:", thirdCourse);
}

function task5() {
    console.log("%cЗавдання 5", "color: #2196f3; font-weight: bold;");
    let numbers = [2, 5, 8, 10, 13];

    let squared = numbers.map(n => n ** 2);
    console.log("5.1 Квадрати чисел:", squared);
    
    let even = numbers.filter(n => n % 2 === 0);
    console.log("5.2 Парні числа:", even);

    let sum = numbers.reduce((acc, curr) => acc + curr, 0);
    console.log("5.3 Сума:", sum);
    
    let combined = numbers.concat([100, 200, 300, 400, 500]);
    console.log("5.4 Об'єднаний масив:", combined);
    
    let spliced = combined.splice(0, 3);
    console.log("5.5 Після splice:", spliced);
}

function task6() {
    console.log("%cЗавдання 6", "color: #2196f3; font-weight: bold;");
    let books = [
        { title: "Гаррі Поттер", author: "Роулінг", genre: "фентезі", pages: 300, isAvailable: true },
        { title: "Відьмак", author: "Сапковський", genre: "фентезі", pages: 400, isAvailable: true }
    ];

    function addBook(t, a, g, p) {
        books.push({ title: t, author: a, genre: g, pages: p, isAvailable: true });
    }

    function removeBook(title) {
        books = books.filter(b => b.title !== title);
    }

    function findByAuthor(author) {
        return books.filter(b => b.author === author);
    }

    function toggleAvailability(title, isBorrowed) {
    books = books.map(book => {
        if (book.title === title) {
            book.isAvailable = !isBorrowed;
        }
        return book;
    });
    }

    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        return {
            total: books.length,
            available: books.filter(b => b.isAvailable).length,
            borrowed: books.filter(b => !b.isAvailable).length,
            avgPages: books.reduce((acc, b) => acc + b.pages, 0) / books.length
        };
    }

    addBook("1984", "Орвелл", "антиутопія", 328);
    toggleAvailability("Відьмак", false);
    sortBooksByPages();
    
    console.log("6.7 Статистика бібліотеки:", getBooksStatistics());
    console.log("6 Оновлений масив книг:", books);
}

function task7() {
    console.log("%cЗавдання 7", "color: #2196f3; font-weight: bold;");
    let student = { name: "Stepan", age: 19, course: 2 };

    student.subjects = ["Математика", "Алгоритми", "Бази даних"];
    console.log("7.2 Додано властивість subjects:", student);

    delete student.age;
    console.log("7.3 Видалено властивість age:", student);
}

console.log("%c--- ЛАБОРАТОРНА №4 ---", "color: #e91e63; font-weight: bold;");
task1(); task2(); task3(); task4(); task5(); task6(); task7();