// =================================================================
// SELECTION & GLOBAL SETUP (Concept: Selecting DOM Elements)
// =================================================================
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const errorMessage = document.getElementById("errorMessage");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Confirm script connection
console.log("Script connected successfully!");


// =================================================================
// TASK 4 — Live Task Counter and Empty-State Message
// =================================================================
/**
 * Keeps task count text accurate after every add and delete action.
 * Displays "No tasks yet." when the list is empty.
 */
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


// =================================================================
// TASK 5 — Prevent Empty Submissions (Form Validation)
// =================================================================
/**
 * Stops an empty or whitespace-only task from being added.
 * Displays an error message until a valid task is submitted.
 * @returns {string|null} Cleaned task text if valid, null otherwise.
 */
function validateAndGetTaskText() {
  const value = taskInput.value.trim();

  if (value === "") {
    errorMessage.textContent = "Please type a task before adding it.";
    return null;
  }

  // Clear error message when input is valid
  errorMessage.textContent = "";
  return value;
}


// =================================================================
// TASK 1 — Add and Display Tasks (Selection + Creation + Events)
// =================================================================
/**
 * Creates a new task <li> element styled with Bootstrap classes.
 * @param {string} text - Task text description.
 * @returns {HTMLLIElement} Formatted Bootstrap list item.
 */
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

/**
 * Main function to add a task to the list.
 */
function addTask() {
  const taskText = validateAndGetTaskText();
  if (!taskText) return; // Validation failed

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  // Clear input box after successfully adding task
  taskInput.value = "";

  // Update live task count
  updateTaskCount();
}

// Click listener on Add button
addBtn.addEventListener("click", () => {
  addTask();
});

// Keyup listener on input for Enter key
taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});


// =================================================================
// TASK 2 & 3 — Mark Tasks Complete (Classes + Events) & Delete Tasks (Event Delegation)
// =================================================================
/**
 * Single event listener on #taskList using Event Delegation.
 * Task 3: Deletes task when .delete-btn is clicked.
 * Task 2: Toggles completed state without affecting Delete button behaviour.
 */
taskList.addEventListener("click", (event) => {
  // Task 3: Handle Delete Button click via Event Delegation
  if (event.target.classList.contains("delete-btn") || event.target.closest(".delete-btn")) {
    const li = event.target.closest("li");
    if (li) {
      li.remove();
      updateTaskCount();
    }
    return; // Exit early so delete action doesn't trigger task toggle
  }

  // Task 2: Toggle completed state when task text or item body is clicked
  const li = event.target.closest("li");
  if (li && taskList.contains(li)) {
    li.classList.toggle("completed");
  }
});


// =================================================================
// TASK 6 — Extend the Application (Clear Completed Tasks Feature)
// =================================================================
/**
 * Feature Extension: Clears all completed tasks at once using querySelectorAll
 * and a loop, then refreshes the task counter.
 */
if (clearCompletedBtn) {
  clearCompletedBtn.addEventListener("click", () => {
    const completedTasks = taskList.querySelectorAll("li.completed");

    completedTasks.forEach((task) => {
      task.remove();
    });

    updateTaskCount();
  });
}

// Initial count check on script execution
updateTaskCount();
