class Cat {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    move() {
        console.log(`${this.name} бігає`);
    }
    run() {
        console.log(`${this.name} біжить`);
    }
}
class Bird {
    name;
    constructor(name) {
        this.name = name;
    }
    move() {
        console.log(`${this.name} літає`);
    }
    fly() {
        console.log(`${this.name} летить`);
    }
    run() {
        console.log(`${this.name} біжить`);
    }
}
class Fish {
    name;
    constructor(name) {
        this.name = name;
    }
    move() {
        console.log(`${this.name} плаває`);
    }
    swim() {
        console.log(`${this.name} пливе`);
    }
}
const kit = new Cat("Кіт", 3);
const vorobey = new Bird("Бірд");
const ruba = new Fish("Риба");
kit.move();
kit.run?.();
vorobey.move();
vorobey.fly?.();
vorobey.run?.();
ruba.move();
ruba.swim?.();
export {};
//# sourceMappingURL=animals.js.map