# Full Stack Lab 3: Personal To-Do List Application

## 📌 Project Overview
This repository contains the completed **Lab 3 Case Study: Personal To-Do List Application**. The project transitions a static HTML/CSS template into a fully functional, interactive, and visually stunning web application using Bootstrap 5 and JavaScript DOM Manipulation concepts.

---

## 📁 Project Structure

```
Full Stack Lab 3 Tasks/
├── README.md               # Complete lab documentation and task walkthrough
└── Lab Task/
    ├── index.html          # HTML structure with Bootstrap 5 & Icons
    ├── style.css          # Custom background, glassmorphism card & animations
    └── script.js          # Interactive JavaScript logic organized by tasks
```

---

## 🚀 Detailed Task Breakdown & Implementation Guide

### **Task 1 — Add and Display Tasks (Selection + Creation + Events)**
* **Objective:** Wire up the input field (`#taskInput`) and Add button (`#addBtn`) so that entering text and clicking **Add** or pressing **Enter** creates a new `<li>` item containing the task text and a Delete button, then clears the input field.
* **Concepts Applied:**
  * Selecting elements using `document.getElementById()`.
  * Creating elements dynamically with `document.createElement()`.
  * Appending nodes with `parent.appendChild()`.
  * Attaching event listeners for `"click"` and `"keyup"` (`event.key === "Enter"`).
* **Code Implementation:**
  ```javascript
  function createTaskElement(text) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center py-3 px-3 border-0 bg-light rounded-3 mb-2 shadow-sm task-item";

    const span = document.createElement("span");
    span.textContent = text;
    span.className = "task-text me-2 fw-medium";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm px-3 rounded-pill delete-btn";
    deleteBtn.innerHTML = '<i class="bi bi-trash me-1"></i>Delete';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
  }

  function addTask() {
    const taskText = validateAndGetTaskText();
    if (!taskText) return;

    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    taskInput.value = ""; // Clear input after adding
    updateTaskCount();
  }

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") addTask();
  });
  ```

---

### **Task 2 — Mark Tasks Complete (Classes + Events)**
* **Objective:** Make tasks interactive so that clicking a task item toggles its completed state (`.completed` class with line-through styling) without triggering or affecting the Delete button's behavior.
* **Concepts Applied:**
  * Modifying element CSS classes using `element.classList.toggle("completed")`.
  * Preventing conflict between delete actions and completion toggles.
* **Code Implementation:**
  ```javascript
  // Inside taskList event listener
  const li = event.target.closest("li");
  if (li && taskList.contains(li)) {
    li.classList.toggle("completed");
  }
  ```

---

### **Task 3 — Delete Tasks (Event Delegation)**
* **Objective:** Use a **single event listener** on the parent `#taskList` container rather than attaching individual listeners to every new Delete button created.
* **Concepts Applied:**
  * Event Delegation pattern on stable parent element `#taskList`.
  * Event target checking using `event.target.classList.contains("delete-btn")`.
  * Element removal using `event.target.closest("li").remove()`.
* **Code Implementation:**
  ```javascript
  taskList.addEventListener("click", (event) => {
    // Check if clicked target is a Delete button
    if (event.target.classList.contains("delete-btn") || event.target.closest(".delete-btn")) {
      const li = event.target.closest("li");
      if (li) {
        li.remove();
        updateTaskCount();
      }
      return; // Stop further execution so completed state isn't toggled
    }
  });
  ```

---

### **Task 4 — Live Task Counter and Empty-State Message**
* **Objective:** Maintain an accurate task count after every task addition or deletion. When the list is empty, display `"No tasks yet."` instead of `"0 tasks"`.
* **Concepts Applied:**
  * Reading child node count using `taskList.children.length`.
  * Updating text dynamically using `element.textContent`.
* **Code Implementation:**
  ```javascript
  function updateTaskCount() {
    const totalTasks = taskList.children.length;

    if (totalTasks === 0) {
      taskCount.textContent = "No tasks yet.";
    } else if (totalTasks === 1) {
      taskCount.textContent = "1 task remaining";
    } else {
      taskCount.textContent = `${totalTasks} tasks remaining`;
    }
  }
  ```

---

### **Task 5 — Prevent Empty Submissions (Form Validation)**
* **Objective:** Prevent empty or whitespace-only tasks from being added. Display a short error message in `#errorMessage` until a valid task is submitted.
* **Concepts Applied:**
  * Input value sanitization with `taskInput.value.trim()`.
  * Basic form validation and error state management.
* **Code Implementation:**
  ```javascript
  function validateAndGetTaskText() {
    const value = taskInput.value.trim();

    if (value === "") {
      errorMessage.textContent = "Please type a task before adding it.";
      return null;
    }

    errorMessage.textContent = ""; // Clear error message when valid
    return value;
  }
  ```

---

### **Task 6 — Extend the Application (Clear Completed Feature)**
* **Objective:** Add a custom feature using concepts covered in the lab. A **"Clear Completed"** button selects all completed tasks and removes them simultaneously.
* **Concepts Applied:**
  * Selecting multiple elements using `document.querySelectorAll("li.completed")`.
  * Iterating over NodeLists using `forEach()`.
  * Refreshing live state and counter post-removal.
* **Code Implementation:**
  ```javascript
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener("click", () => {
      const completedTasks = taskList.querySelectorAll("li.completed");

      completedTasks.forEach((task) => {
        task.remove();
      });

      updateTaskCount();
    });
  }
  ```

---

## 🛠️ How to Run and Test
1. Open [`Lab Task/index.html`](file:///d:/5th%20Semester/Full%20STACK%20LAB/Full%20Stack%20Lab%203%20Tasks/Lab%20Task/index.html) in any modern web browser.
2. Try adding tasks using the **Add** button or pressing **Enter**.
3. Attempt submitting empty text or spaces to verify validation errors.
4. Click tasks to toggle line-through completed state.
5. Click **Delete** buttons to remove specific tasks.
6. Click **Clear Completed** to bulk remove all marked tasks.
7. Observe the live task counter updating accurately at all times.
