# DWU Dining Meal Booking — AT1 Part 2

## Student Details

- ** Name:** [WESLEY KIL]
- ** ID:** [220106]
- **GitHub Repository:** [https://github.com/kilwesley0-blip/IS305_220106.git]

## Program Description

The DWU Dining Meal Booking application is a Node.js console program that allows students to book meals (Breakfast, Lunch, or Dinner) for a specific date. The system validates all inputs, calculates the total cost, prevents duplicate bookings, and lets users confirm or cancel bookings interactively.

The project is split into two parts:
- **Part 1** — `MealBooking.js` defines the core `MealBooking` class.
- **Part 2** — `DiningApp.js` provides the interactive console interface using Node.js `readline`.

## Files Submitted

| File | Purpose |
|------|---------|
| `MealBooking.js` | Contains the `MealBooking` class with properties, validation, cost calculation (`calculateTotal`), status control (`confirmBooking`, `cancelBooking`), and receipt generation (`getSummary`). |

| `DiningApp.js` | The main entry point. Runs an interactive menu that lets users create bookings, view all bookings, confirm or cancel bookings, and run automated test demonstrations. |

| `README.md` | This file — documentation for the project. |

## Meal Prices

| Meal Type | Price (Kina) |
|-----------|-------------|
| Breakfast | K10.00 |
| Lunch     | K15.00 |
| Dinner    | K20.00 |

## How to Run

1. Make sure you have **Node.js** installed on your computer.
2. Open a terminal in the folder containing the three files.
3. Run the application with:

```bash
node DiningApp.js
```

4. Follow the on-screen menu to create bookings or run the automated tests.

## Menu Options

1. **Create a new booking** — Enter student details, meal date, type, quantity, and dietary note.

2. **View all bookings** — Displays a list of all stored bookings with status and total cost.

3. **Confirm a booking** — Changes a selected booking's status from *Pending* to *Confirmed*.

4. **Cancel a booking** — Changes a selected booking's status to *Cancelled*.

5. **Run automated test demonstrations** — Automatically runs the three required tests (Valid, Invalid, Duplicate).

6. **Exit** — Closes the application.

## Tests Completed

### 1. Valid Booking
- **Input:** Student ID `DWU2026001`, Name `Maria Kila`, Date `2026-07-18`, Meal `Lunch`, Quantity `2`, Note `No peanuts`.
- **Expected Result:** Booking is created successfully with a total cost of **K30.00**.
- **Actual Result:** Booking created and receipt displayed correctly.

### 2. Invalid Booking
- **Input:** Missing student name, invalid meal type `Brunch`, quantity `0`.
- **Expected Result:** Application rejects the booking and displays a clear validation error.
- **Actual Result:** Validation error returned — missing name, invalid type, and invalid quantity flagged.

### 3. Duplicate Booking
- **Input:** Two identical bookings with the same Student ID, meal date, and meal type.
- **Expected Result:** The second booking attempt is rejected.
- **Actual Result:** Duplicate detected and rejected with a clear error message.

## Validation Rules

- Student ID cannot be empty.
- Student name cannot be empty.
- Meal date cannot be empty.
- Meal type must be **Breakfast**, **Lunch**, or **Dinner**.
- Quantity must be **1 or greater**.
- A duplicate booking (same Student ID + Meal Date + Meal Type) is not allowed.

## Error Handling

All user input is wrapped in `try/catch` blocks. If validation fails, a descriptive error message is printed to the console and the program continues running — it does not crash.
