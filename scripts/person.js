class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }
  static fromObj(obj) {
    return new Person(obj.firstName, obj.lastName);
  }
  get firstName() { return this.#firstName; }
  get lastName() { return this.#lastName; }
}
class Student extends Person {
  #age;
  #hobbies;
  #email;
  #photo;
  #major;
  #courses;

  constructor(firstName, lastName, age, hobbies, email, photo, major, courses) {
    super(firstName, lastName);
    this.#age = age;
    this.#hobbies = hobbies;
    this.#email = email;
    this.#photo = photo;
    this.#major = major;
    this.#courses = courses;
  }
  static fromObj(obj) {
    return new Student(
      obj.firstName,
      obj.lastName,
      obj.age,
      obj.hobbies,
      obj.email,
      obj.photo,
      obj.major,
      obj.courses
    );
  }
}
class Course {
  #title
  #teacher
  #description

  constructor(title, teacher, description) {
    this.#title = title;
    this.#teacher = teacher;
    this.#description = description;
  }
  static fromObj(obj) {
    return new Course(
      obj.title,
      obj.teacher,
      obj.description
    );
  }
}

// Used to convert prototype-less JSON objects from the file to the proper JS objects above.
// The JSON objects each have a "type" property, which is mapped here to the classes.
const classMap = {
  Person: Person,
  Student: Student,
  Course: Course
}