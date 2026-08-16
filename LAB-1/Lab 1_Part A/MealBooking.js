/*
  Program: Dining Meal Booking Feature
  Student Name: WESLEY KIL
  Student ID: 220106
  Date: 17 August 2026
  Description: A JavaScript program demonstrating classes,
  objects, constructors, private fields and methods.
*/

class MealBooking {
  #studentId;
  #studentName;
  #mealDate;
  #mealType;
  #quantity;
  #dietaryNote;
  #bookingStatus;

  static #bookings = new Set();

  static #getKey(studentId, mealDate, mealType) {
    return `${studentId}-${mealDate}-${mealType}`;
  }

  constructor({ studentId, studentName, mealDate, mealType, quantity, dietaryNote = "" }) {
    if (!studentId || !studentName || !mealDate || !mealType || quantity === undefined || quantity === null) {
      throw new Error("Incomplete booking information. studentId, studentName, mealDate, mealType, and quantity are required.");
    }

    if (!["Breakfast", "Lunch", "Dinner"].includes(mealType)) {
      throw new Error("Invalid meal type. Must be Breakfast, Lunch, or Dinner.");
    }

    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) {
      throw new Error("Invalid quantity. Must be a positive whole number.");
    }

    const key = MealBooking.#getKey(studentId, mealDate, mealType);
    if (MealBooking.#bookings.has(key)) {
      throw new Error(`Duplicate booking: Student ${studentId} has already booked ${mealType} on ${mealDate}.`);
    }

    this.#studentId = studentId;
    this.#studentName = studentName;
    this.#mealDate = mealDate;
    this.#mealType = mealType;
    this.#quantity = qty;
    this.#dietaryNote = dietaryNote;
    this.#bookingStatus = "Pending";

    MealBooking.#bookings.add(key);
  }

  // Getters
  get studentId() {
    return this.#studentId;
  }

  get studentName() {
    return this.#studentName;
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

  // Setters
  set studentName(value) {
    if (!value || typeof value !== "string") {
      throw new Error("Invalid student name.");
    }
    this.#studentName = value;
  }

  set quantity(value) {
    const qty = Number(value);
    if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) {
      throw new Error("Invalid quantity. Must be a positive whole number.");
    }
    this.#quantity = qty;
  }

  set dietaryNote(value) {
    this.#dietaryNote = value || "";
  }

  set bookingStatus(value) {
    const validStatuses = ["Pending", "Confirmed", "Cancelled", "Completed"];
    if (!validStatuses.includes(value)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }
    this.#bookingStatus = value;
  }

  calculateTotal() {
    const prices = {
      Breakfast: 10.00,
      Lunch: 15.00,
      Dinner: 20.00
    };
    return (prices[this.#mealType] || 0) * this.#quantity;
  }

  getSummary() {
    return `Booking Details:
Student ID:    ${this.#studentId}
Student Name:  ${this.#studentName}
Meal Date:     ${this.#mealDate}
Meal Type:     ${this.#mealType}
Quantity:      ${this.#quantity}
Dietary Note:  ${this.#dietaryNote || "None"}
Status:        ${this.#bookingStatus}
Total Cost:    K${this.calculateTotal().toFixed(2)}`;
  }
}

export default MealBooking;
