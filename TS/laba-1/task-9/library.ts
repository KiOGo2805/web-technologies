interface LibraryItem {
  name: string;
  author: string;
  isBorrowed: boolean;
  borrow(): void;
}

class Book implements LibraryItem {
  public isBorrowed: boolean = false;

  constructor(
    public name: string,
    public author: string,
    public pagesCount: number
  ) {}

  borrow(): void {
    if (this.isBorrowed) {
      console.log(`Книга "${this.name}" вже позичена`);
      return;
    }
    this.isBorrowed = true;
    console.log(`Книгу "${this.name}" (${this.pagesCount} стор.) успішно позичено`);
  }
}

class Magazine implements LibraryItem {
  public isBorrowed: boolean = false;

  constructor(
    public name: string,
    public author: string,
    public issueNumber: number
  ) {}

  borrow(): void {
    if (this.isBorrowed) {
      console.log(`Журнал "${this.name}" (випуск №${this.issueNumber}) вже позичено`);
      return;
    }
    this.isBorrowed = true;
    console.log(`Журнал "${this.name}" (випуск №${this.issueNumber}) успішно позичено`);
  }
}

class DVD implements LibraryItem {
  public isBorrowed: boolean = false;

  constructor(
    public name: string,
    public author: string,
    public duration: number
  ) {}

  borrow(): void {
    if (this.isBorrowed) {
      console.log(`Диск DVD "${this.name}" вже позичено`);
      return;
    }
    this.isBorrowed = true;
    console.log(`Диск DVD "${this.name}" (${this.duration} хв) успішно позичено`);
  }
}

class Library {
  private items: LibraryItem[] = [];

  addItem(item: LibraryItem): void {
    this.items.push(item);
    console.log(`Додано до бібліотеки: "${item.name}"`);
  }

  findItemByName(name: string): LibraryItem | undefined {
    return this.items.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
  }

  showAvailableItems(): void {
    const available = this.items.filter((item) => !item.isBorrowed);

    console.log("\n=== Доступні елементи в бібліотеці ===");
    if (available.length === 0) {
      console.log("Доступних елементів немає");
    } else {
      available.forEach((item) => {
        let extraInfo = "";
        if (item instanceof Book) extraInfo = `${item.pagesCount} стор.`;
        if (item instanceof Magazine) extraInfo = `випуск №${item.issueNumber}`;
        if (item instanceof DVD) extraInfo = `${item.duration} хв`;

        console.log(`• [${item.constructor.name}] "${item.name}" | Автор/Режисер: ${item.author} (${extraInfo})`);
      });
    }
    console.log("======================================\n");
  }
}

const library = new Library();

const book1 = new Book("Чистий код", "Роберт Мартін", 464);
const magazine1 = new Magazine("National Geographic", "Редакція NG", 114);
const dvd1 = new DVD("Інтерстеллар", "Крістофер Нолан", 169);

console.log("--- Додавання елементів ---");
library.addItem(book1);
library.addItem(magazine1);
library.addItem(dvd1);

library.showAvailableItems();

console.log("--- Позичення елементів ---");
book1.borrow();
book1.borrow();

console.log("\n--- Пошук елемента за назвою ---");
const searched = library.findItemByName("інтерстеллар");
if (searched) {
  console.log(`Знайдено: "${searched.name}" (${searched.author})`);
  searched.borrow();
} else {
  console.log("Елемент не знайдено.");
}

library.showAvailableItems();