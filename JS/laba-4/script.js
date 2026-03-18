function task1() {
    let fruits = ["яблуко", "банан", "груша", "апельсин"];

    fruits.pop();
    console.log("1.1 Оновлений масив:", fruits);

    fruits.unshift("ананас");

    fruits.sort().reverse();
    console.log("1.3 Відсортований масив:", fruits);

    console.log("1.4 Індекс яблука:", fruits.indexOf("яблуко"));
}

function task2() {
    let colors = ["червоний", "зелений", "синій", "жовтий", "синьо-зелений"];

    let longest = colors.reduce((a, b) => a.length > b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length < b.length ? a : b);
    console.log("2.2 Найдовший:", longest, "| Найкоротший:", shortest);
    
    colors.filter(c => c.includes("синій"));

    colors.join(", ");

    console.log("2.5 Рядок:", colors);
}

function task3() {
    let workers = [
        { name: "Іван", age: 25, position: "розробник" },
        { name: "Анна", age: 30, position: "дизайнер" },
        { name: "Олег", age: 22, position: "розробник" }
    ];

    workers.sort((a, b) => a.name.localeCompare(b.name));

    workers.filter(w => w.position === "розробник");
    
    workers.filter(w => w.age <= 26);

    workers.push({ name: "Марія", age: 28, position: "HR" });
    console.log("3.5 Оновлений масив працівників:", workers);
}

function task4() {
    let students = [
        { name: "Олексій", age: 20, course: 3 },
        { name: "Марина", age: 19, course: 2 },
        { name: "Дмитро", age: 21, course: 4 }
    ];

    students.filter(s => s.name !== "Олексій");

    students.push({ name: "Степан", age: 18, course: 1 });

    students.sort((a, b) => b.age - a.age);
    console.log("4.4 Відсортовані студенти за віком:", students);

    let thirdCourse = students.find(s => s.course === 3);
    console.log("4.5 Студент 3 курсу:", thirdCourse);
}

function task5() {
    let numbers = [2, 5, 8, 10, 13];

    let squared = numbers.map(n => n ** 2);
    console.log("5.1 Квадрати чисел:", squared);
    
    let even = numbers.filter(n => n % 2 === 0);
    console.log("5.2 Парні числа:", even);

    let sum = numbers.reduce((acc, curr) => acc + curr, 0);
    console.log("5.3 Сума:", sum);
    
    let combined = numbers.concat([100, 200, 300, 400, 500]);
    console.log("5.4 Об'єднаний масив:", combined);
    
    combined.splice(0, 3);
    console.log("5.5 Після splice:", combined);
}

function task6() {
    let books = [
        { title: "Гаррі Поттер", author: "Роулінг", genre: "фентезі", pages: 300, isAvailable: true },
        { title: "Відьмак", author: "Сапковський", genre: "фентезі", pages: 400, isAvailable: true }
    ];

    const addBook = (t, a, g, p) => books.push({ title: t, author: a, genre: g, pages: p, isAvailable: true });

    const removeBook = (title) => books = books.filter(b => b.title !== title);

    const findByAuthor = (author) => books.filter(b => b.author === author);

    const toggleAvailability = (title, isBorrowed) => {
        let book = books.find(b => b.title === title);
        if (book) book.isAvailable = !isBorrowed;
    };

    const sortBooksByPages = () => books.sort((a, b) => a.pages - b.pages);

    const getBooksStatistics = {
        total: books.length,
        available: books.filter(b => b.isAvailable).length,
        borrowed: books.filter(b => !b.isAvailable).length,
        avgPages: books.reduce((acc, b) => acc + b.pages, 0) / books.length
    };
    console.log("6.7 Статистика бібліотеки:", getBooksStatistics);
}

function task7() {
    let student = { name: "Stepan", age: 19, course: 2 };

    student.subjects = ["Математика", "Алгоритми", "Бази даних"];

    delete student.age;

    console.log("7.4 Оновлений об'єкт студента:", student);
}

console.log("%c--- ЛАБОРАТОРНА №4 ---", "color: #e91e63; font-weight: bold;");
task1(); task2(); task3(); task4(); task5(); task6(); task7();