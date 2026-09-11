abstract class Car {
  protected brand: string;
  protected model: string;
  protected year: number;

  private vinCode: string;

  public isRunning: boolean = false;

  constructor(brand: string, model: string, year: number, vinCode: string) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.vinCode = vinCode;
  }

  public start(): void {
    this.isRunning = true;
    console.log(`${this.brand} ${this.model}: запущено`);
  }

  protected getVinCode(): string {
    return this.vinCode;
  }

  public abstract displayInfo(): void;
}
  
class Nissan extends Car {
  public driveType: string;
  private transmission: string;

  constructor(model: string, year: number, vinCode: string, driveType: string, transmission: string) {
    super("Nissan", model, year, vinCode);
    this.driveType = driveType;
    this.transmission = transmission;
  }

  public displayInfo(): void {
    console.log(`[Автомобіль: ${this.brand} ${this.model}]`);
    console.log(`  Рік випуску: ${this.year}`);
    console.log(`  Привід: ${this.driveType}`);
    console.log(`  Трансмісія: ${this.transmission}`);
    console.log(`  VIN-код: ${this.getVinCode()}`);
    console.log(`  Стан: ${this.isRunning ? "працює" : "заглушено"}\n`);
  }
}

class Tesla extends Car {
  public batteryCapacity: number;
  private autopilotVersion: string;

  constructor(model: string, year: number, vinCode: string, batteryCapacity: number, autopilotVersion: string) {
    super("Tesla", model, year, vinCode);
    this.batteryCapacity = batteryCapacity;
    this.autopilotVersion = autopilotVersion;
  }

  public displayInfo(): void {
    console.log(`[Автомобіль: ${this.brand} ${this.model}]`);
    console.log(`  Рік випуску: ${this.year}`);
    console.log(`  Батарея: ${this.batteryCapacity} kWh`);
    console.log(`  Версія автопілота: ${this.autopilotVersion}`);
    console.log(`  VIN-код: ${this.getVinCode()}`);
    console.log(`  Стан: ${this.isRunning ? "працює" : "заглушено"}\n`);
  }
}

class BMW extends Car {
  public horsepower: number;
  protected hasMPackage: boolean;

  constructor(model: string, year: number, vinCode: string, horsepower: number, hasMPackage: boolean) {
    super("BMW", model, year, vinCode);
    this.horsepower = horsepower;
    this.hasMPackage = hasMPackage;
  }

  public displayInfo(): void {
    console.log(`[Автомобіль: ${this.brand} ${this.model}]`);
    console.log(`  Рік випуску: ${this.year}`);
    console.log(`  Потужність: ${this.horsepower} к.с.`);
    console.log(`  M-пакет: ${this.hasMPackage ? "Так" : "Ні"}`);
    console.log(`  VIN-код: ${this.getVinCode()}`);
    console.log(`  Стан: ${this.isRunning ? "працює" : "заглушено"}\n`);
  }
}

const nissanRogue = new Nissan("Rogue Sport", 2020, "JN8AS5MT4LW123456", "AWD", "Xtronic CVT");
const nissanGTR = new Nissan("GT-R R35", 2023, "JN1GAR35XU0987654", "AWD", "6-speed Dual-Clutch");

const teslaModel3 = new Tesla("Model 3", 2022, "5YJ3E1EB8NF111222", 75, "FSD v12.3");
const teslaModelS = new Tesla("Model S Plaid", 2024, "5YJSA1E26PF333444", 100, "FSD v12.5");

const bmwM3 = new BMW("M3 Competition", 2023, "WBA33AY08PFP55566", 503, true);
const bmwX5 = new BMW("X5 xDrive40i", 2021, "5UXCR6C08M9B77788", 335, false);

const fleet: Car[] = [nissanRogue, nissanGTR, teslaModel3, teslaModelS, bmwM3, bmwX5];

fleet.forEach((car) => car.displayInfo());