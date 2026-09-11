class Employee {
    name;
    age;
    salary;
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}
class Developer extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    getAnnualBonus() {
        return this.salary * 0.10;
    }
    pay() {
        console.log(`Виплачено зарплату ${this.salary} грн розробнику ${this.name}`);
    }
}
class Manager extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    getAnnualBonus() {
        return this.salary * 0.20;
    }
    pay() {
        console.log(`Виплачено зарплату ${this.salary} грн менеджеру ${this.name}`);
    }
}
const employees = [
    new Developer("Олександр", 24, 60000),
    new Developer("Степан", 21, 80000),
    new Manager("Олена", 32, 95000),
    new Manager("Віктор", 40, 120000)
];
let totalAnnualBonus = 0;
for (const emp of employees) {
    //  if ("pay" in emp) {
    //    (emp as unknown as Payable).pay();
    //  }  
    const bonus = emp.getAnnualBonus();
    totalAnnualBonus += bonus;
    console.log(`${emp.name} (ЗП: ${emp.salary} грн) -> Річний бонус: ${bonus} грн`);
}
console.log(`\nЗагальна річна сума бонусів: ${totalAnnualBonus} грн`);
export {};
//# sourceMappingURL=employees.js.map