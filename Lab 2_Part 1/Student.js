/**
 * Name: WESLEY KIL
 * ID: 220106
 * Student.js
 * Lab 2: Student class with private fields, getters, setters,
 * validation, getFullName(), and displayInfo().
 */

class Student {
  #studentId;
  #firstName;
  #lastName;

  constructor(studentId, firstName, lastName) {
    this.studentId = studentId;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  /* ---------- Getters ---------- */
  get studentId() {
    return this.#studentId;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  /* ---------- Setters with validation ---------- */
  set studentId(value) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      throw new Error('Student ID cannot be empty.');
    }
    this.#studentId = value;
  }

  set firstName(value) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      throw new Error('First name cannot be empty.');
    }
    this.#firstName = value;
  }

  set lastName(value) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      throw new Error('Last name cannot be empty.');
    }
    this.#lastName = value;
  }

  /* ---------- Methods ---------- */
  getFullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  displayInfo() {
    console.log('========================================');
    console.log('             STUDENT DETAILS');
    console.log('========================================');
    console.log(`Student ID: ${this.#studentId}`);
    console.log(`Student Name: ${this.getFullName()}`);
    console.log('========================================');
  }
}

module.exports = Student;
