# DWU Dining Meal Booking System — Lab 2

## Student Details

- **Name:** Wesley Kil
- **Student ID:** 220106

## GitHub Repository

https://github.com/kilwesley0-blip/IS305_220106.git



## How Lab 2 Extends Lab 1

Lab 1 focused on a standalone `Student` class with basic fields (ID, first name, last name), getters/setters, and simple display methods. Lab 2 builds on that foundation by introducing a **`MealBooking` class** that is linked to a `Student` object, creating a relationship between the two. It also adds an **interactive console application** (`DiningApp.js`) that lets users create bookings, view history, confirm/cancel bookings, and update student names — with all changes propagating automatically through the shared object reference. Key extensions include:

- **Composition relationship** — a `MealBooking` holds a reference to a `Student` instead of duplicating student data.
- **Booking lifecycle** — status management (Pending → Confirmed / Cancelled).
- **Cost calculation** — meal-type–based pricing and total computation.
- **Duplicate detection** — prevents the same student from booking the same meal on the same date twice.
- **Controlled updates** — name changes on a `Student` automatically appear in every linked `MealBooking`.
- **Booking history** — filters and displays all bookings for a given student with combined costs.

---

## The `Student` Class

Defined in **`Student.js`**, the `Student` class models a university student with three private fields:

| Field | Private | Validated |
|-------|---------|-----------|
| `studentId` | `#studentId` | ✅ cannot be empty |
| `firstName` | `#firstName` | ✅ cannot be empty |
| `lastName` | `#lastName` | ✅ cannot be empty |

**Key features:**

- **Private fields** — all data is stored in truly private (`#`) properties, accessible only through getters.
- **Validated setters** — every setter trims whitespace and throws an `Error` if the value is empty, ensuring no invalid data is stored.
- **`getFullName()`** — returns `firstName + ' ' + lastName`.
- **`displayInfo()`** — prints a formatted student information block to the console.

---

## How `Student` and `MealBooking` Are Connected

The connection follows a **composition / association pattern** — each `MealBooking` receives a `Student` object at construction time and stores it in a private `#student` field. The booking **never duplicates** student data; instead it reads identity through the linked reference:

```
MealBooking
  └── #student  →  Student (shared reference)
  └── studentId  →  reads #student.studentId
  └── studentName → reads #student.getFullName()
```

**Why this matters:**

1. **Single source of truth** — student identity lives in one place.
2. **Automatic propagation** — if a student's name is updated via `student.firstName = 'Mary'`, every `MealBooking` that holds a reference to that same `Student` object immediately reflects the new name in `booking.studentName` and `booking.getSummary()`.
3. **Construction guard** — the `MealBooking` constructor verifies that a valid `Student` object was passed (checks for the existence of `getFullName()`), throwing an error otherwise.

---

## Running the Application

Make sure all three files are in the same directory:

```
Student.js
MealBooking.js
DiningApp.js
```

Then run:

```bash
node DiningApp.js
```

The application presents an interactive menu with 8 options:

| Option | Description |
|--------|-------------|
| 1 | Create a new booking |
| 2 | View all bookings |
| 3 | Confirm a booking |
| 4 | Cancel a booking |
| 5 | View student booking history |
| 6 | Update student name |
| 7 | Run automated test demonstrations |
| 8 | Exit |

---

## Tests Completed

Option **7** in the application runs a suite of five automated tests:

| Test | Description | Expected Outcome |
|------|-------------|-----------------|
| **Test 1** | Valid Student Object | A `Student` with valid ID, first name, and last name is created and displayed without errors. |
| **Test 2** | Invalid Student Information | Empty student ID, empty first name, and empty last name are each rejected with an error. |
| **Test 3** | Student and Booking Integration | A `MealBooking` linked to a `Student` correctly reads `studentName`, `studentId`, and the `student` reference from the connected object. |
| **Test 4** | Updated Student Name | Changing `student.firstName` via its setter causes the updated name to appear in all existing `MealBooking` summaries that share the same `Student` reference. |
| **Test 5** | Booking History | `displayBookingHistory()` displays all bookings for a student along with the total count and combined cost. |

---

## Approved Use of AI Tools

AI-assisted tools (e.g., ChatGPT / GitHub Copilot) were used during development for the following purposes:

- **Code structure guidance** — understanding how to implement private fields and validated setters in JavaScript classes.
- **Debugging assistance** — identifying and resolving issues with object references and error handling.
- **Documentation support** — helping draft comments and the README layout.

All code was reviewed, understood, and validated by the student. AI tools were used as a learning aid, not as a replacement for independent work.
