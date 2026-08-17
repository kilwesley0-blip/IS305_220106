/**
 * Name: WESLEY KIL
 * ID: 220106
 * MealBooking.js
 * Lab 2 Credit Extension: MealBooking class that receives a Student object.
 * All student identity is read from the linked Student — never duplicated.
 */

class MealBooking {
  // Meal prices in Kina (K)
  static MEAL_PRICES = {
    Breakfast: 10.0,
    Lunch: 15.0,
    Dinner: 20.0,
  };

  static VALID_MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

  /* ---------- Private fields ---------- */
  #student;
  #mealDate;
  #mealType;
  #quantity;
  #dietaryNote;
  #bookingStatus;

  /**
   * @param {Student} student       – a valid Student object
   * @param {string}  mealDate      – expected format YYYY-MM-DD
   * @param {string}  mealType      – Breakfast, Lunch, or Dinner
   * @param {number}  quantity
   * @param {string}  dietaryNote
   */
  constructor(student, mealDate, mealType, quantity, dietaryNote) {
    // Verify a valid Student object was provided
    if (!student || typeof student.getFullName !== 'function') {
      throw new Error('A valid Student object is required.');
    }
    this.#student = student;

    this.mealDate = mealDate ? mealDate.trim() : '';
    this.mealType = mealType ? mealType.trim() : '';
    this.quantity = Number(quantity);
    this.dietaryNote = dietaryNote ? dietaryNote.trim() : 'None';
    this.bookingStatus = 'Pending';

    // Validate all fields immediately
    this.validate();
  }

  /* ---------- Getters ---------- */

  /** Returns the linked Student object itself */
  get student() {
    return this.#student;
  }

  /** Convenience: student ID read from the linked Student */
  get studentId() {
    return this.#student ? this.#student.studentId : '';
  }

  /** Convenience: student full name read from the linked Student */
  get studentName() {
    return this.#student ? this.#student.getFullName() : '';
  }

  get mealDate() {
    return this.#mealDate;
  }

  get mealType() {
    return this.#mealType;
  }

  get quantity() {
    return this.#quantity;
  }

  get dietaryNote() {
    return this.#dietaryNote;
  }

  get bookingStatus() {
    return this.#bookingStatus;
  }

  /* ---------- Setters ---------- */

  set mealDate(value) {
    this.#mealDate = value;
  }

  set mealType(value) {
    this.#mealType = value;
  }

  set quantity(value) {
    this.#quantity = Number(value);
  }

  set dietaryNote(value) {
    this.#dietaryNote = value;
  }

  set bookingStatus(value) {
    this.#bookingStatus = value;
  }

  /* ---------- Validation ---------- */
  validate() {
    const errors = [];

    // Student-derived checks
    if (!this.studentId) {
      errors.push('Student ID is required.');
    }
    if (!this.studentName) {
      errors.push('Student name is required.');
    }

    // Meal-booking checks
    if (!this.mealDate) {
      errors.push('Meal date is required.');
    }
    if (!MealBooking.VALID_MEAL_TYPES.includes(this.mealType)) {
      errors.push(
        `Invalid meal type "${this.mealType}". Must be Breakfast, Lunch, or Dinner.`
      );
    }
    if (!Number.isFinite(this.quantity) || this.quantity < 1) {
      errors.push('Quantity must be 1 or greater.');
    }

    if (errors.length > 0) {
      const err = new Error(errors.join(' '));
      err.name = 'ValidationError';
      err.validationErrors = errors;
      throw err;
    }
  }

  /* ---------- Cost calculation ---------- */
  calculateTotal() {
    const price = MealBooking.MEAL_PRICES[this.mealType] || 0;
    return price * this.quantity;
  }

  /* ---------- Status control ---------- */
  confirmBooking() {
    this.bookingStatus = 'Confirmed';
  }

  cancelBooking() {
    this.bookingStatus = 'Cancelled';
  }

  /* ---------- Receipt / summary ---------- */
  getSummary() {
    const total = this.calculateTotal();
    return (
      `========================================\n` +
      `            BOOKING CREATED\n` +
      `========================================\n` +
      `Student: ${this.studentName} (${this.studentId})\n` +
      `Meal: ${this.mealType} x ${this.quantity}\n` +
      `Date: ${this.mealDate}\n` +
      `Dietary note: ${this.dietaryNote}\n` +
      `Status: ${this.bookingStatus}\n` +
      `Total cost: K${total.toFixed(2)}\n` +
      `========================================`
    );
  }
}

module.exports = MealBooking;
