interface Payable {
  pay(): void;
}

abstract class Employee {
  constructor(
    public name: string,
    public age: number,
    public salary: number
  ) {}

  abstract getAnnualBonus(): number;
}

class Developer extends Employee implements Payable {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  getAnnualBonus(): number {
    return this.salary * 0.10;
  }

  pay(): void {
    console.log(`Виплачено зарплату ${this.salary} грн розробнику ${this.name}`);
  }
}

class Manager extends Employee implements Payable {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  getAnnualBonus(): number {
    return this.salary * 0.20;
  }

  pay(): void {
    console.log(`Виплачено зарплату ${this.salary} грн менеджеру ${this.name}`);
  }
}

const employees: Employee[] = [
  new Developer("Олександр", 24, 60000),
  new Developer("Степан", 21, 80000),
  new Manager("Олена", 32, 95000),
  new Manager("Віктор", 40, 120000)
];

let totalAnnualBonus: number = 0;

for (const emp of employees) {
//  if ("pay" in emp) {
//    (emp as unknown as Payable).pay();
//  }  
  const bonus = emp.getAnnualBonus();
  totalAnnualBonus += bonus;
  console.log(`${emp.name} (ЗП: ${emp.salary} грн) -> Річний бонус: ${bonus} грн`);
}

console.log(`\nЗагальна річна сума бонусів: ${totalAnnualBonus} грн`);