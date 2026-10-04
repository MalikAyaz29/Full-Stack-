# 📚 Online Bookstore Order System

**Full Stack Lab 04 — Home Task**

A client-side JavaScript application that simulates an online bookstore order management system. It demonstrates core JavaScript concepts including variables, conditionals, loops, array methods, ES6 classes, and DOM manipulation.

---

## 🚀 Features

| Task | Title | Concepts Covered |
|------|-------|------------------|
| 01 | Model the Catalog & Orders | `const`, `let`, `var`, Objects, Arrays |
| 02 | Validate a Single Order | Conditionals, Comparison Operators, Ternary Operator |
| 03 | Process a Batch of Orders | `for...of` Loops, `map()`, `reduce()` |
| 04 | ES6 Book Class | Classes, Destructuring, Template Literals |
| 05 | Low-Stock & Category Reporting | `filter()`, Logical AND (`&&`), `sort()` |

---

## 📂 Project Structure

```
Home Task/
├── index.html       # Main HTML page with all task sections
├── bookstore.js     # JavaScript logic for all 5 tasks
├── style.css        # Styling for layout, tables, cards, and badges
└── README.md        # Project documentation
```

---

## 📖 Task Breakdown

### Task 1 — Model the Catalog & Orders
Defines an **8-book catalog** (with `id`, `title`, `author`, `price`, `stock`, `category`) and **8 incoming orders**. Renders both as HTML tables using DOM manipulation.

### Task 2 — Validate a Single Order
A `validateOrder()` function checks whether a book exists in the catalog, the requested quantity is positive, and sufficient stock is available. Returns descriptive status messages using the ternary operator.

### Task 3 — Process a Batch of Orders
A `processOrders()` function iterates over all incoming orders using `for...of`, fulfills valid ones (deducting stock), and rejects invalid ones with a reason. Uses `map()` to build a summary and `reduce()` to calculate total revenue.

### Task 4 — ES6 Book Class
An ES6 `Book` class with an `isLowStock()` method that uses template literals. Demonstrates **destructuring** in the `printOrderConfirmation()` helper. Renders low-stock cards and order confirmations in the UI.

### Task 5 — Low-Stock & Category Reporting
A `lowStockReport(category, threshold)` function uses `filter()` with logical AND to find books below a stock threshold in a specific category, then `sort()` to order them by stock ascending. Generates reports for Programming, Fiction, Self-Help, and Non-Fiction.

---

## 📦 Book Catalog

| ID | Title | Author | Price | Category |
|----|-------|--------|-------|----------|
| 1 | Clean Code | Robert C. Martin | $22.50 | Programming |
| 2 | The Pragmatic Programmer | David Thomas | $30.00 | Programming |
| 3 | Atomic Habits | James Clear | $16.99 | Self-Help |
| 4 | Deep Work | Cal Newport | $18.00 | Self-Help |
| 5 | Dune | Frank Herbert | $12.99 | Fiction |
| 6 | 1984 | George Orwell | $9.99 | Fiction |
| 7 | Sapiens | Yuval Noah Harari | $20.00 | Non-Fiction |
| 8 | Educated | Tara Westover | $14.50 | Non-Fiction |

---

## 🛠️ Technologies Used

- **HTML5** — Semantic structure and tables
- **CSS3** — Responsive layout, category pills, stock badges, card grid
- **JavaScript (ES6)** — Classes, template literals, destructuring, array methods
- **Google Fonts** — Inter typeface

---

## ▶️ How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. All tasks execute automatically on page load — no build step required.

---

## 👤 Author

**M. Ayaz Rafique** — Roll No. 241925  
5th Semester, Full Stack Development Lab
