/**
 * Name: WESLEY KIL
 * ID: 220106
 * MealBooking.js
 * Part 1: MealBooking class with validation, cost calculation,
 * status management, and receipt generation.
 */

class MealBooking {
  // Meal prices in Kina (K)
  static MEAL_PRICES = {
    Breakfast: 10.0,
    Lunch: 15.0,
    Dinner: 20.0,
  };

  static VALID_MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

  /**
   * @param {string} studentId
   * @param {string} studentName
   * @param {string} mealDate   – expected format YYYY-MM-DD
   * @param {string} mealType   – Breakfast, Lunch, or Dinner
   * @param {number} quantity
   * @param {string} dietaryNote
   */
  constructor(studentId, studentName, mealDate, mealType, quantity, dietaryNote) {
    this.studentId = studentId ? studentId.trim() : '';
    this.studentName = studentName ? studentName.trim() : '';
    this.mealDate = mealDate ? mealDate.trim() : '';
    this.mealType = mealType ? mealType.trim() : '';
    this.quantity = Number(quantity);
    this.dietaryNote = dietaryNote ? dietaryNote.trim() : 'None';
    this.status = 'Pending';

    // Run validation immediately on construction
    this.validate();
  }

  /* ---------- Validation ---------- */
  validate() {
    const errors = [];

    if (!this.studentId) {
      errors.push('Student ID is required.');
    }
    if (!this.studentName) {
      errors.push('Student name is required.');
    }
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
    this.status = 'Confirmed';
  }

  cancelBooking() {
    this.status = 'Cancelled';
  }

  /* ---------- Receipt ---------- */
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
      `Status: ${this.status}\n` +
      `Total cost: K${total.toFixed(2)}\n` +
      `========================================`
    );
  }
}

module.exports = MealBooking;
