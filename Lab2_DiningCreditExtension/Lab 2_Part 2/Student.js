/**
 * Name: WESLEY KIL
 * ID: 220106
 * Student.js
 * Lab 2 Credit Extension: Student class with private fields,
 * getters/setters with validation, getFullName(), and displayInfo().
 */

class Student {
  /* ---------- Private fields ---------- */
  #studentId;
  #firstName;
  #lastName;

  /**
   * @param {string} studentId
   * @param {string} firstName
   * @param {string} lastName
   */
  constructor(studentId, firstName, lastName) {
    // Use setters so validation runs during construction
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

  /* ---------- Setters (with validation) ---------- */
  set studentId(value) {
    const trimmed = value ? value.trim() : '';
    if (trimmed === '') {
      throw new Error('Student ID cannot be empty.');
    }
    this.#studentId = trimmed;
  }

  set firstName(value) {
    const trimmed = value ? value.trim() : '';
    if (trimmed === '') {
      throw new Error('First name cannot be empty.');
    }
    this.#firstName = trimmed;
  }

  set lastName(value) {
    const trimmed = value ? value.trim() : '';
    if (trimmed === '') {
      throw new Error('Last name cannot be empty.');
    }
    this.#lastName = trimmed;
  }

  /* ---------- Methods ---------- */
  getFullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  displayInfo() {
    console.log('========================================');
    console.log('          STUDENT INFORMATION');
    console.log('========================================');
    console.log(`Student ID: ${this.#studentId}`);
    console.log(`Student Name: ${this.getFullName()}`);
    console.log('========================================');
  }
}

module.exports = Student;
