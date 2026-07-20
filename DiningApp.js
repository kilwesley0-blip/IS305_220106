


import MealBooking from "./MealBooking.js";

console.log("=== DWU Dining Services - Meal Booking Demo ===\n");

// 1. Create a valid booking
const booking1 = new MealBooking({
  studentId: "230453",
  studentName: "John Buka",
  mealDate: "2026-07-25",
  mealType: "Lunch",
  quantity: 2,
  dietaryNote: "Vegetarian"
});

console.log("Booking 1 created successfully!");
console.log(booking1.getSummary());
console.log(`\nCalculated Total: K${booking1.calculateTotal().toFixed(2)}\n`);

// 2. Update booking status using setter
booking1.bookingStatus = "Confirmed";
console.log(`Updated Status: ${booking1.bookingStatus}\n`);

// 3. Attempt a duplicate booking (same student, date, meal type)
try {
  const duplicateBooking = new MealBooking({
    studentId: "230453",
    studentName: "John Buka",
    mealDate: "2026-07-25",
    mealType: "Lunch",
    quantity: 1
  });
  console.log(duplicateBooking.getSummary());
} catch (error) {
  console.error("Duplicate Booking Error:", error.message, "\n");
}

// 4. Attempt an invalid booking (wrong meal type)
try {
  const invalidBooking = new MealBooking({
    studentId: "210032",
    studentName: "Jane Peter",
    mealDate: "2026-07-25",
    mealType: "Brunch",
    quantity: 1
  });
} catch (error) {
  console.error("Invalid Booking Error:", error.message, "\n");
}

// 5. Attempt an incomplete booking (missing required field)
try {
  const incompleteBooking = new MealBooking({
    studentId: "241002",
    studentName: "Bob Dadae",
    mealType: "Dinner",
    quantity: 3
    // mealDate is missing
  });
} catch (error) {
  console.error("Incomplete Booking Error:", error.message, "\n");
}

// 6. Create another valid booking for the same student (different meal type)
const booking2 = new MealBooking({
  studentId: "230453",
  studentName: "John Buka",
  mealDate: "2026-07-25",
  mealType: "Dinner",
  quantity: 1
});

console.log("Booking 2 created successfully!");
console.log(booking2.getSummary());
console.log(`\nCalculated Total: K${booking2.calculateTotal().toFixed(2)}\n`);

// 7. Update quantity using setter
booking2.quantity = 3;
console.log(`Updated Quantity: ${booking2.quantity}`);
console.log(`New Total: K${booking2.calculateTotal().toFixed(2)}\n`);

console.log("=== Demo Complete ===");
