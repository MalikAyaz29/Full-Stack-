/* TASK 1 - Model the Catalog and Orders (Variables, Objects, Arrays) */

const bookCatalog = [
  { id: 1, title: "Clean Code",              author: "Robert C. Martin",  price: 22.50, stock: 10, category: "Programming" },
  { id: 2, title: "The Pragmatic Programmer", author: "David Thomas",      price: 30.00, stock: 3,  category: "Programming" },
  { id: 3, title: "Atomic Habits",            author: "James Clear",       price: 16.99, stock: 7,  category: "Self-Help" },
  { id: 4, title: "Deep Work",                author: "Cal Newport",       price: 18.00, stock: 2,  category: "Self-Help" },
  { id: 5, title: "Dune",                     author: "Frank Herbert",     price: 12.99, stock: 15, category: "Fiction" },
  { id: 6, title: "1984",                     author: "George Orwell",     price: 9.99,  stock: 4,  category: "Fiction" },
  { id: 7, title: "Sapiens",                  author: "Yuval Noah Harari", price: 20.00, stock: 1,  category: "Non-Fiction" },
  { id: 8, title: "Educated",                 author: "Tara Westover",     price: 14.50, stock: 0,  category: "Non-Fiction" },
];

let incomingOrders = [
  { bookTitle: "Clean Code",               quantity: 2 },
  { bookTitle: "Dune",                     quantity: 3 },
  { bookTitle: "Educated",                 quantity: 1 },
  { bookTitle: "The Pragmatic Programmer", quantity: 5 },
  { bookTitle: "JavaScript Mastery",       quantity: 1 },
  { bookTitle: "1984",                     quantity: 2 },
  { bookTitle: "Sapiens",                  quantity: 1 },
  { bookTitle: "Deep Work",               quantity: -1 },
];

var systemName = "Online Bookstore Order System";

let catalogBody = document.querySelector("#catalogTable tbody");
for (let i = 0; i < bookCatalog.length; i++) {
  let book = bookCatalog[i];
  let row = document.createElement("tr");
  row.innerHTML =
    "<td>" + book.id + "</td>" +
    "<td><strong>" + book.title + "</strong></td>" +
    "<td>" + book.author + "</td>" +
    "<td>$" + book.price.toFixed(2) + "</td>" +
    "<td>" + book.stock + "</td>" +
    '<td><span class="cat-pill ' + book.category.toLowerCase().replace(" ", "-") + '">' + book.category + "</span></td>";
  catalogBody.appendChild(row);
}

let ordersBody = document.querySelector("#ordersTable tbody");
for (let i = 0; i < incomingOrders.length; i++) {
  let row = document.createElement("tr");
  row.innerHTML =
    "<td>" + (i + 1) + "</td>" +
    "<td>" + incomingOrders[i].bookTitle + "</td>" +
    "<td>" + incomingOrders[i].quantity + "</td>";
  ordersBody.appendChild(row);
}


/* TASK 2 - Validate a Single Order (Conditions, Operators, Ternary Operator) */

function validateOrder(order) {
  let book = bookCatalog.find(function (b) {
    return b.title === order.bookTitle;
  });

  if (!book) {
    return "REJECTED: \"" + order.bookTitle + "\" does not exist in the catalog.";
  }

  if (order.quantity <= 0) {
    return "REJECTED: Quantity must be greater than zero.";
  }

  let result = book.stock >= order.quantity
    ? "VALID: \"" + book.title + "\" can be fulfilled (" + order.quantity + " requested, " + book.stock + " in stock)."
    : "REJECTED: \"" + book.title + "\" - not enough stock (" + order.quantity + " requested, " + book.stock + " available).";

  return result;
}

let task2Output = document.getElementById("task2Output");
let test1 = validateOrder({ bookTitle: "Clean Code", quantity: 2 });
let test2 = validateOrder({ bookTitle: "JavaScript Mastery", quantity: 1 });

task2Output.innerHTML =
  '<div class="output-item fulfilled">Test 1: ' + test1 + "</div>" +
  '<div class="output-item rejected">Test 2: ' + test2 + "</div>";


/* TASK 3 - Process a Batch of Orders (Loops, Array Methods - map, reduce) */

function processOrders(orders) {
  let results = [];

  for (let order of orders) {
    let book = bookCatalog.find(function (b) {
      return b.title === order.bookTitle;
    });

    if (book && order.quantity > 0 && book.stock >= order.quantity) {
      book.stock = book.stock - order.quantity;
      results.push({
        bookTitle: order.bookTitle,
        quantity: order.quantity,
        status: "fulfilled",
        total: book.price * order.quantity
      });
    } else {
      let reason = "Unknown";
      if (!book) {
        reason = "Book not found";
      } else if (order.quantity <= 0) {
        reason = "Invalid quantity";
      } else {
        reason = "Not enough stock (only " + book.stock + " left)";
      }

      results.push({
        bookTitle: order.bookTitle,
        quantity: order.quantity,
        status: "rejected",
        total: 0,
        reason: reason
      });
    }
  }

  let summary = results.map(function (r) {
    if (r.status === "fulfilled") {
      return { text: r.bookTitle + " x" + r.quantity + " - $" + r.total.toFixed(2), status: "fulfilled" };
    } else {
      return { text: r.bookTitle + " x" + r.quantity + " - " + r.reason, status: "rejected" };
    }
  });

  let totalRevenue = results.reduce(function (sum, r) {
    if (r.status === "fulfilled") {
      return sum + r.total;
    } else {
      return sum;
    }
  }, 0);

  return { summary: summary, totalRevenue: totalRevenue };
}

let task3Result = processOrders(incomingOrders);

let task3Report = document.getElementById("task3Report");
let reportHTML = "";
for (let i = 0; i < task3Result.summary.length; i++) {
  let item = task3Result.summary[i];
  let tag = item.status === "fulfilled" ? "[Fulfilled] " : "[Rejected] ";
  reportHTML += '<div class="output-item ' + item.status + '">' + tag + item.text + "</div>";
}
task3Report.innerHTML = reportHTML;

let task3Revenue = document.getElementById("task3Revenue");
task3Revenue.textContent = "Total Revenue from Fulfilled Orders: $" + task3Result.totalRevenue.toFixed(2);

let stockBody = document.querySelector("#updatedStockTable tbody");
for (let i = 0; i < bookCatalog.length; i++) {
  let book = bookCatalog[i];
  let statusClass = book.stock === 0 ? "out" : book.stock < 5 ? "low" : "ok";
  let statusText = book.stock === 0 ? "Out of Stock" : book.stock < 5 ? "Low Stock" : "In Stock";

  let row = document.createElement("tr");
  row.innerHTML =
    "<td><strong>" + book.title + "</strong></td>" +
    "<td>" + book.stock + " copies</td>" +
    '<td><span class="stock-badge ' + statusClass + '">' + statusText + "</span></td>";
  stockBody.appendChild(row);
}


/* TASK 4 - ES6 Class, Destructuring, Template Literals */

class Book {
  constructor(id, title, author, price, stock, category) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.stock = stock;
    this.category = category;
  }

  isLowStock() {
    return this.stock < 5
      ? `Only ${this.stock} copies left!`
      : `${this.stock} copies available.`;
  }
}

let bookInstances = bookCatalog.map(function (b) {
  return new Book(b.id, b.title, b.author, b.price, b.stock, b.category);
});

function printOrderConfirmation(book, quantity) {
  let { title, price } = book;
  let message = `Order confirmed: ${quantity} x ${title} - $${(price * quantity).toFixed(2)} total.`;
  return message;
}

let cardGrid = document.getElementById("task4LowStock");
for (let i = 0; i < bookInstances.length; i++) {
  let book = bookInstances[i];
  let stockMsg = book.isLowStock();
  let isLow = book.stock < 5;

  let card = document.createElement("div");
  card.className = "stock-card " + (isLow ? "is-low" : "is-ok");
  card.innerHTML =
    '<div class="card-title">' + book.title + "</div>" +
    '<div class="card-author">by ' + book.author + "</div>" +
    '<div class="card-status">' + stockMsg + "</div>";
  cardGrid.appendChild(card);
}

let confirmEl = document.getElementById("task4Confirmations");
let msg1 = printOrderConfirmation(bookInstances[0], 2);
let msg2 = printOrderConfirmation(bookInstances[4], 5);
let msg3 = printOrderConfirmation(bookInstances[2], 1);

confirmEl.innerHTML =
  '<div class="output-item info">' + msg1 + "</div>" +
  '<div class="output-item info">' + msg2 + "</div>" +
  '<div class="output-item info">' + msg3 + "</div>";


/* TASK 5 - Low-Stock and Category Reporting (filter, logical AND, sort) */

function lowStockReport(category, threshold) {
  let filtered = bookInstances.filter(function (book) {
    return book.stock < threshold && book.category === category;
  });

  filtered.sort(function (a, b) {
    return a.stock - b.stock;
  });

  let html = '<div class="report-panel">';
  html += "<h4>" + category + " - Stock &lt; " + threshold + "</h4>";

  if (filtered.length === 0) {
    html += '<div class="report-empty">No books match this criteria.</div>';
  } else {
    for (let i = 0; i < filtered.length; i++) {
      let { title, author, stock, price } = filtered[i];
      let stockClass = stock === 0 ? "out" : stock < 3 ? "low" : "ok";

      html += '<div class="report-item">';
      html += '<div class="book-info"><span>' + title + '</span><span class="author-sm">by ' + author + " - $" + price.toFixed(2) + "</span></div>";
      html += '<span class="report-stock"><span class="stock-badge ' + stockClass + '">' + stock + " in stock</span></span>";
      html += "</div>";
    }
  }

  html += '<div class="report-count">' + filtered.length + " book(s) found</div>";
  html += "</div>";
  return html;
}

let reportsEl = document.getElementById("task5Reports");
reportsEl.innerHTML =
  lowStockReport("Programming", 10) +
  lowStockReport("Fiction", 20) +
  lowStockReport("Self-Help", 5) +
  lowStockReport("Non-Fiction", 3);
