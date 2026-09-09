interface Animal {
  name: string;
  age?: number | undefined;

  run?(): void;
  fly?(): void;
  swim?(): void;

  move(): void;
}

class Cat implements Animal {
  name: string;
  age?: number | undefined;

  constructor(name: string, age?: number | undefined) {
    this.name = name;
    this.age = age;
  }

  move(): void {
    console.log(`${this.name} бігає`);
  }

  run(): void {
    console.log(`${this.name} біжить`);
  }
}

class Bird implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(): void {
    console.log(`${this.name} літає`);
  }

  fly(): void {
    console.log(`${this.name} летить`);
  }

  run(): void {
    console.log(`${this.name} біжить`);
  }
}

class Fish implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(): void {
    console.log(`${this.name} плаває`);
  }

  swim(): void {
    console.log(`${this.name} пливе`);
  }
}

const kit = new Cat("Кіт", 3);
const vorobey = new Bird("Бірд");
const ruba  = new Fish("Риба");

kit.move();
kit.run?.();

vorobey.move();
vorobey.fly?.();
vorobey.run?.();

ruba.move();
ruba.swim?.();