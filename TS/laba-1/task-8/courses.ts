interface Course {
  name: string;
  duration: number;
  students: string[];
}

class OnlineCourse implements Course {
  public students: string[] = [];

  constructor(
    public name: string,
    public duration: number
  ) {}

  registerStudent(student: string): void {
    if (this.isStudentRegistered(student)) {
      console.log(`Студент ${student} вже є на "${this.name}"`);
      return;
    }
    this.students.push(student);
    console.log(`Студента ${student} успішно зараховано на "${this.name}"`);
  }

  isStudentRegistered(student: string): boolean {
    return this.students.includes(student);
  }
}

class CourseManager {
  private courses: Course[] = [];

  addCourse(course: Course): void {
    this.courses.push(course);
    console.log(`Курс "${course.name}" додано до списку курсів`);
  }

  removeCourse(courseName: string): void {
    const initialCount = this.courses.length;
    this.courses = this.courses.filter(
      (course) => course.name.toLowerCase() !== courseName.toLowerCase()
    );

    if (this.courses.length < initialCount) {
      console.log(`Курс "${courseName}" видалено`);
    } else {
      console.log(`Курс "${courseName}" не знайдено`);
    }
  }

  findCourse(courseName: string): Course | undefined {
    return this.courses.find(
      (course) => course.name.toLowerCase() === courseName.toLowerCase()
    );
  }

  getAllCourses(): Course[] {
    return this.courses;
  }
}

const manager = new CourseManager();

const tsCourse = new OnlineCourse("TS Fundamentals", 40);
const jsCourse = new OnlineCourse("Modern JS", 32);
const reactCourse = new OnlineCourse("React Development", 56);

manager.addCourse(tsCourse);
manager.addCourse(jsCourse);
manager.addCourse(reactCourse);

console.log("\n--- Реєстрація студентів ---");
tsCourse.registerStudent("Степан");
tsCourse.registerStudent("Олександр");
tsCourse.registerStudent("Степан");

reactCourse.registerStudent("Олена");
reactCourse.registerStudent("Степан");

console.log("\n--- Список усіх курсів та зареєстрованих студентів ---");
manager.getAllCourses().forEach((course) => {
  const studentsList =
    course.students.length > 0 ? course.students.join(", ") : "немає зареєстрованих";
  console.log(`Курс: ${course.name} | Тривалість: ${course.duration} год.`);
  console.log(`Студенти: ${studentsList}\n`);
});

console.log("--- Перевірка пошуку та видалення ---");
const found = manager.findCourse("Modern JS");
console.log("Знайдено курс:", found?.name);

manager.removeCourse("Modern JS");
console.log(`Залишилось курсів: ${manager.getAllCourses().length}`);