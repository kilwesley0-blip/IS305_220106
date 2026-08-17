/**
 * Name: WESLEY KIL
 * ID: 220106
 * DiningApp.js
 * Lab 2 Credit Extension: Interactive console application.
 *
 * Tasks covered:
 *  Task 2 – Create Related Objects (Student → MealBooking)
 *  Task 3 – displayBookingHistory()
 *  Task 4 – Controlled Student Updates (name changes propagate)
 */

const readline = require('readline');
const MealBooking = require('./MealBooking');
const Student = require('./Student');

// In-memory storage
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

/* ============================================================
 *  TASK 3: displayBookingHistory()
 *  Receives a Student object and the booking array.
 *  Displays student details once, then all their bookings,
 *  total number of bookings, and combined cost.
 * ============================================================ */
function displayBookingHistory(student, bookingArray) {
  const studentBookings = bookingArray.filter(
    (b) => b.studentId === student.studentId
  );

  // Display student information once
  console.log('========================================');
  console.log('          STUDENT INFORMATION');
  console.log('========================================');
  console.log(`Student ID: ${student.studentId}`);
  console.log(`Student Name: ${student.getFullName()}`);
  console.log('');

  // Display booking history
  console.log('========================================');
  console.log('            BOOKING HISTORY');
  console.log('========================================');

  if (studentBookings.length === 0) {
    console.log('No bookings found for this student.');
  } else {
    let combinedCost = 0;

    studentBookings.forEach((b, i) => {
      const cost = b.calculateTotal();
      combinedCost += cost;
      console.log(
        `${i + 1}. ${b.mealType} - ${b.mealDate}\n` +
        `   Quantity: ${b.quantity}\n` +
        `   Status: ${b.bookingStatus}\n` +
        `   Cost: K${cost.toFixed(2)}`
      );
    });

    console.log('');
    console.log(`Total Bookings: ${studentBookings.length}`);
    console.log(`Combined Cost: K${combinedCost.toFixed(2)}`);
  }

  console.log('========================================');
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
  console.log('5. View student booking history');
  console.log('6. Update student name');
  console.log('7. Run automated test demonstrations');
  console.log('8. Exit');
  console.log('---------------------------------');
}

/* ============================================================
 *  TASK 2: Create Related Objects
 *  Collect student details → create Student object
 *  Collect meal details    → create MealBooking linked to Student
 * ============================================================ */
async function createBooking() {
  showHeader();

  try {
    // --- Collect student details ---
    const studentId = await ask('Student ID: ');
    const firstName = await ask('First name: ');
    const lastName = await ask('Last name: ');

    // Create one Student object
    const student = new Student(
      studentId.trim(),
      firstName.trim(),
      lastName.trim()
    );

    // Display student information
    student.displayInfo();

    // --- Collect meal-booking details ---
    const mealDate = await ask('Meal date (YYYY-MM-DD): ');
    const mealType = await ask('Meal type (Breakfast / Lunch / Dinner): ');
    const quantityStr = await ask('Quantity: ');
    const dietaryNote = await ask('Dietary note: ');

    const quantity = Number(quantityStr);

    // Prevent duplicate bookings
    if (isDuplicate(student.studentId, mealDate.trim(), mealType.trim())) {
      console.log(
        `\n[ERROR] Duplicate booking detected! A booking already exists for ` +
          `student ${student.studentId} on ${mealDate.trim()} for ${mealType.trim()}.\n`
      );
      return;
    }

    // Create MealBooking object connected to the Student object
    const booking = new MealBooking(
      student,
      mealDate.trim(),
      mealType.trim(),
      quantity,
      dietaryNote.trim()
    );

    // Store the MealBooking object in the booking array
    bookings.push(booking);

    // Display the booking summary
    console.log('\n' + booking.getSummary());
  } catch (err) {
    console.log(`\n[ERROR] ${err.message}\n`);
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
    console.log(`  Status  : ${b.bookingStatus}`);
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
      `\nBooking confirmed for ${bookings[index].studentName}. Status is now: ${bookings[index].bookingStatus}\n`
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
      `\nBooking cancelled for ${bookings[index].studentName}. Status is now: ${bookings[index].bookingStatus}\n`
    );
  } else {
    console.log('\nInvalid booking number.\n');
  }
}

/* ---------- Option 5: View student booking history (Task 3) ---------- */
async function viewStudentHistory() {
  try {
    const studentId = await ask('Enter Student ID: ');

    // Find a booking that belongs to this student to get the Student reference
    const found = bookings.find((b) => b.studentId === studentId.trim());

    if (!found) {
      console.log(`\nNo bookings found for student ID: ${studentId.trim()}\n`);
      return;
    }

    // Use the Student object already linked in the booking
    const student = found.student;
    displayBookingHistory(student, bookings);
  } catch (err) {
    console.log(`\n[ERROR] ${err.message}\n`);
  }
}

/* ============================================================
 *  TASK 4: Controlled Student Updates
 *  Allow first name or last name to be updated via setters.
 *  Because MealBooking objects share the same Student reference,
 *  the updated name appears in existing booking summaries.
 * ============================================================ */
async function updateStudentName() {
  try {
    const studentId = await ask('Enter Student ID to update: ');

    // Find the Student object via an existing booking
    const found = bookings.find((b) => b.studentId === studentId.trim());

    if (!found) {
      console.log(`\nNo bookings found for student ID: ${studentId.trim()}\n`);
      return;
    }

    const student = found.student;
    console.log(`\nCurrent name: ${student.getFullName()}`);

    const newFirstName = await ask('New first name (press Enter to keep current): ');
    const newLastName = await ask('New last name (press Enter to keep current): ');

    if (newFirstName.trim() !== '') {
      student.firstName = newFirstName.trim();
    }
    if (newLastName.trim() !== '') {
      student.lastName = newLastName.trim();
    }

    console.log(`\nUpdated name: ${student.getFullName()}`);
    console.log('\n--- Booking summaries now reflect the new name ---');

    // Show that existing bookings now display the updated name
    const studentBookings = bookings.filter(
      (b) => b.studentId === student.studentId
    );
    studentBookings.forEach((b, i) => {
      console.log(
        `\n  [${i + 1}] ${b.mealType} - ${b.mealDate} → Student: ${b.studentName}`
      );
    });
    console.log('');
  } catch (err) {
    console.log(`\n[ERROR] ${err.message}\n`);
  }
}

/* ---------- Option 7: Automated test demonstrations ---------- */
async function runTests() {
  console.log(`\n========================================`);
  console.log(`      RUNNING AUTOMATED TESTS`);
  console.log(`========================================\n`);

  /* =====================================================
   *  TEST 1: Valid Student object
   *  Expected: Student information is accepted and displayed correctly.
   * ===================================================== */
  console.log('--- TEST 1: Valid Student Object ---');
  try {
    const student = new Student('DWU2026001', 'Maria', 'Kila');
    student.displayInfo();
    console.log('[PASS] Student created and displayed correctly.\n');
  } catch (err) {
    console.log(`[FAIL] ${err.message}\n`);
  }

  /* =====================================================
   *  TEST 2: Invalid Student information
   *  Expected: Empty ID, first name or last name is rejected.
   * ===================================================== */
  console.log('--- TEST 2: Invalid Student Information ---');
  // 2a: Empty ID
  try {
    const s = new Student('', 'John', 'Doe');
    console.log(`[FAIL] Empty student ID was accepted.\n`);
  } catch (err) {
    console.log(`[PASS] Empty student ID rejected: ${err.message}\n`);
  }

  // 2b: Empty first name
  try {
    const s = new Student('DWU002', '', 'Doe');
    console.log(`[FAIL] Empty first name was accepted.\n`);
  } catch (err) {
    console.log(`[PASS] Empty first name rejected: ${err.message}\n`);
  }

  // 2c: Empty last name
  try {
    const s = new Student('DWU003', 'John', '');
    console.log(`[FAIL] Empty last name was accepted.\n`);
  } catch (err) {
    console.log(`[PASS] Empty last name rejected: ${err.message}\n`);
  }

  /* =====================================================
   *  TEST 3: Student and booking integration
   *  Expected: The booking summary displays information from the connected Student object.
   * ===================================================== */
  console.log('--- TEST 3: Student and Booking Integration ---');
  try {
    const student = new Student('DWU2026001', 'Maria', 'Kila');
    const booking = new MealBooking(
      student,
      '2026-08-12',
      'Lunch',
      2,
      'No peanuts'
    );
    bookings.push(booking);
    console.log(booking.getSummary());

    // Verify the booking reads from the Student object
    if (
      booking.studentName === 'Maria Kila' &&
      booking.studentId === 'DWU2026001' &&
      booking.student === student
    ) {
      console.log('[PASS] Booking correctly reads from connected Student object.\n');
    } else {
      console.log('[FAIL] Booking does not correctly reference the Student object.\n');
    }
  } catch (err) {
    console.log(`[FAIL] ${err.message}\n`);
  }

  /* =====================================================
   *  TEST 4: Updated student name
   *  Expected: The updated name appears in existing booking summaries.
   * ===================================================== */
  console.log('--- TEST 4: Updated Student Name ---');
  try {
    const student = new Student('DWU2026001', 'Maria', 'Kila');
    const booking1 = new MealBooking(
      student,
      '2026-08-12',
      'Lunch',
      2,
      'No peanuts'
    );
    const booking2 = new MealBooking(
      student,
      '2026-08-13',
      'Dinner',
      1,
      'Vegetarian'
    );

    console.log('Before update:');
    console.log(`  Booking 1 student: ${booking1.studentName}`);
    console.log(`  Booking 2 student: ${booking2.studentName}`);

    // Update the student's first name using the setter
    student.firstName = 'Mary';

    console.log('After updating firstName to "Mary":');
    console.log(`  Booking 1 student: ${booking1.studentName}`);
    console.log(`  Booking 2 student: ${booking2.studentName}`);

    if (
      booking1.studentName === 'Mary Kila' &&
      booking2.studentName === 'Mary Kila'
    ) {
      console.log('[PASS] Updated name propagates to all linked bookings.\n');
    } else {
      console.log('[FAIL] Updated name did not propagate.\n');
    }

    // Revert for cleaner state
    student.firstName = 'Maria';
  } catch (err) {
    console.log(`[FAIL] ${err.message}\n`);
  }

  /* =====================================================
   *  TEST 5: Booking history
   *  Expected: All bookings belonging to the selected student are displayed.
   * ===================================================== */
  console.log('--- TEST 5: Booking History ---');
  try {
    // Use the same student as Test 3 (DWU2026001) plus add another booking
    const existingStudent = bookings.find(
      (b) => b.studentId === 'DWU2026001'
    ).student;

    // Confirm the first booking and add a second one
    existingStudent.firstName = 'Maria'; // ensure correct name after test 4
    bookings[0].confirmBooking();

    const dinnerBooking = new MealBooking(
      existingStudent,
      '2026-08-13',
      'Dinner',
      1,
      'Vegetarian'
    );
    bookings.push(dinnerBooking);

    // Display booking history
    displayBookingHistory(existingStudent, bookings);

    const studentBookings = bookings.filter(
      (b) => b.studentId === 'DWU2026001'
    );
    if (studentBookings.length === 2) {
      console.log('[PASS] Booking history displays all bookings for the student.\n');
    } else {
      console.log('[FAIL] Booking history count mismatch.\n');
    }
  } catch (err) {
    console.log(`[FAIL] ${err.message}\n`);
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
    const choice = await ask('Select an option (1-8): ');

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
        await viewStudentHistory();
        break;
      case '6':
        await updateStudentName();
        break;
      case '7':
        await runTests();
        break;
      case '8':
        running = false;
        console.log('\nThank you for using DWU Dining Meal Booking. Goodbye!\n');
        break;
      default:
        console.log('\nInvalid option. Please enter a number between 1 and 8.\n');
    }
  }

  rl.close();
}

// Start the application
main();
