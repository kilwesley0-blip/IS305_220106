/**
 * Name: WESLEY KIL
 * ID: 220106
 * DiningApp.js
 * Lab 2: Interactive console application for DWU Dining Meal Booking.
 * Uses Node.js readline for user input and connects Student to MealBooking.
 */

const readline = require('readline');
const MealBooking = require('./MealBooking');
const Student = require('./Student');

// In-memory storage for all bookings
const bookings = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* ---------- Helper: promisified question ---------- */
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

/* ---------- Duplicate checker ---------- */
function isDuplicate(studentId, mealDate, mealType) {
  return bookings.some(
    (b) =>
      b.studentId === studentId &&
      b.mealDate === mealDate &&
      b.mealType === mealType
  );
}

/* ---------- Display header ---------- */
function showHeader() {
  console.log(`\n========================================`);
  console.log(`       DWU DINING MEAL BOOKING`);
  console.log(`========================================`);
}

/* ---------- Display main menu ---------- */
function showMenu() {
  console.log(`\n----------- MAIN MENU -----------`);
  console.log('1. Create a new booking');
  console.log('2. View all bookings');
  console.log('3. Confirm a booking');
  console.log('4. Cancel a booking');
  console.log('5. Run automated test demonstrations');
  console.log('6. Exit');
  console.log('---------------------------------');
}

/* ---------- Option 1: Create booking ---------- */
async function createBooking() {
  showHeader();

  try {
    // Collect student details
    const studentId = await ask('Student ID: ');
    const firstName = await ask('First name: ');
    const lastName = await ask('Last name: ');

    // Create Student object
    const student = new Student(
      studentId.trim(),
      firstName.trim(),
      lastName.trim()
    );

    // Display student information
    student.displayInfo();

    // Collect meal booking details
    const mealDate = await ask('Meal date (YYYY-MM-DD): ');
    const mealType = await ask('Meal type (Breakfast / Lunch / Dinner): ');
    const quantityStr = await ask('Quantity: ');
    const dietaryNote = await ask('Dietary note: ');

    const quantity = Number(quantityStr);

    // Duplicate check
    if (isDuplicate(student.studentId, mealDate.trim(), mealType.trim())) {
      console.log(
        `\n[ERROR] Duplicate booking detected! A booking already exists for ` +
          `student ${student.studentId} on ${mealDate.trim()} for ${mealType.trim()}.\n`
      );
      return;
    }

    const booking = new MealBooking(
      student,
      mealDate.trim(),
      mealType.trim(),
      quantity,
      dietaryNote.trim()
    );

    bookings.push(booking);
    console.log('\n' + booking.getSummary());
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log(`\n[ERROR] ${err.message}\n`);
    } else {
      console.log(`\n[ERROR] ${err.message}\n`);
    }
  }
}

/* ---------- Option 2: View all bookings ---------- */
function viewBookings() {
  console.log(`\n----------- ALL BOOKINGS -----------`);
  if (bookings.length === 0) {
    console.log('No bookings found.\n');
    return;
  }

  bookings.forEach((b, index) => {
    console.log(`\n[${index + 1}]`);
    console.log(`  Student : ${b.studentName} (${b.studentId})`);
    console.log(`  Meal    : ${b.mealType} x ${b.quantity}`);
    console.log(`  Date    : ${b.mealDate}`);
    console.log(`  Note    : ${b.dietaryNote}`);
    console.log(`  Status  : ${b.status}`);
    console.log(`  Total   : K${b.calculateTotal().toFixed(2)}`);
  });
  console.log(`\n------------------------------------\n`);
}

/* ---------- Option 3: Confirm booking ---------- */
async function confirmBooking() {
  if (bookings.length === 0) {
    console.log('\nNo bookings available to confirm.\n');
    return;
  }
  viewBookings();
  const choice = await ask('Enter booking number to confirm: ');
  const index = Number(choice) - 1;

  if (index >= 0 && index < bookings.length) {
    bookings[index].confirmBooking();
    console.log(
      `\nBooking confirmed for ${bookings[index].studentName}. Status is now: ${bookings[index].status}\n`
    );
  } else {
    console.log('\nInvalid booking number.\n');
  }
}

/* ---------- Option 4: Cancel booking ---------- */
async function cancelBooking() {
  if (bookings.length === 0) {
    console.log('\nNo bookings available to cancel.\n');
    return;
  }
  viewBookings();
  const choice = await ask('Enter booking number to cancel: ');
  const index = Number(choice) - 1;

  if (index >= 0 && index < bookings.length) {
    bookings[index].cancelBooking();
    console.log(
      `\nBooking cancelled for ${bookings[index].studentName}. Status is now: ${bookings[index].status}\n`
    );
  } else {
    console.log('\nInvalid booking number.\n');
  }
}

/* ---------- Option 5: Automated test demonstrations ---------- */
async function runTests() {
  console.log(`\n========================================`);
  console.log(`      RUNNING AUTOMATED TESTS`);
  console.log(`========================================\n`);

  /* --- Test 1: Valid booking --- */
  console.log('--- TEST 1: Valid Booking ---');
  try {
    const student = new Student('230456', 'Maria', 'Rice');
    const valid = new MealBooking(
      student,
      '2026-07-18',
      'Lunch',
      2,
      'No peanuts'
    );
    bookings.push(valid);
    console.log(valid.getSummary());
    console.log('[PASS] Valid booking created successfully.\n');
  } catch (err) {
    console.log(`[FAIL] ${err.message}\n`);
  }

  /* --- Test 2: Invalid booking (invalid meal type, quantity 0) --- */
  console.log('--- TEST 2: Invalid Booking ---');
  try {
    const student = new Student('DWU2026002', 'Test', 'User');
    const invalid = new MealBooking(
      student,
      '2026-07-19',
      'Brunch',     // invalid meal type
      0,            // invalid quantity
      'Vegetarian'
    );
    bookings.push(invalid);
    console.log(invalid.getSummary());
    console.log('[FAIL] Invalid booking was accepted.\n');
  } catch (err) {
    console.log(`[PASS] Invalid booking rejected: ${err.message}\n`);
  }

  /* --- Test 3: Duplicate booking --- */
  console.log('--- TEST 3: Duplicate Booking ---');
  try {
    const dupStudentId = '210034';
    const dupDate = '2026-07-20';
    const dupType = 'Dinner';

    const student = new Student('210034', 'John', 'Doe');
    const first = new MealBooking(
      student,
      dupDate,
      dupType,
      1,
      'Gluten-free'
    );
    bookings.push(first);
    console.log(first.getSummary());
    console.log('[INFO] First booking created.\n');

    // Attempt duplicate
    if (isDuplicate(dupStudentId, dupDate, dupType)) {
      console.log(
        `[PASS] Duplicate booking rejected! A booking already exists for ` +
          `student ${dupStudentId} on ${dupDate} for ${dupType}.\n`
      );
    } else {
      const duplicate = new MealBooking(
        student,
        dupDate,
        dupType,
        1,
        'Gluten-free'
      );
      bookings.push(duplicate);
      console.log(duplicate.getSummary());
      console.log('[FAIL] Duplicate booking was accepted.\n');
    }
  } catch (err) {
    console.log(`[ERROR] ${err.message}\n`);
  }

  console.log(`========================================`);
  console.log(`      AUTOMATED TESTS COMPLETE`);
  console.log(`========================================\n`);
}

/* ---------- Main application loop ---------- */
async function main() {
  console.log('\nWelcome to the DWU Dining Meal Booking System!\n');

  let running = true;
  while (running) {
    showMenu();
    const choice = await ask('Select an option (1-6): ');

    switch (choice.trim()) {
      case '1':
        await createBooking();
        break;
      case '2':
        viewBookings();
        break;
      case '3':
        await confirmBooking();
        break;
      case '4':
        await cancelBooking();
        break;
      case '5':
        await runTests();
        break;
      case '6':
        running = false;
        console.log('\nThank you for using DWU Dining Meal Booking. Goodbye!\n');
        break;
      default:
        console.log('\nInvalid option. Please enter a number between 1 and 6.\n');
    }
  }

  rl.close();
}

// Start the application
main();
