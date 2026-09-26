// Selecting DOM Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const errorMessage = document.getElementById("errorMessage");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Task 4: Live Task Counter & Empty State
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

// Task 5: Form Validation
function validateAndGetTaskText() {
  const value = taskInput.value.trim();

  if (value === "") {
    errorMessage.textContent = "Please type a task before adding it.";
    return null;
  }

  errorMessage.textContent = "";
  return value;
}

// Task 1: Add & Display Tasks
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
  taskInput.value = "";
  updateTaskCount();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Task 2 & 3: Mark Complete & Delete (Event Delegation)
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn") || event.target.closest(".delete-btn")) {
    const li = event.target.closest("li");
    if (li) {
      li.remove();
      updateTaskCount();
    }
    return;
  }

  const li = event.target.closest("li");
  if (li && taskList.contains(li)) {
    li.classList.toggle("completed");
  }
});

// Task 6: Clear Completed Feature
if (clearCompletedBtn) {
  clearCompletedBtn.addEventListener("click", () => {
    const completedTasks = taskList.querySelectorAll("li.completed");

    completedTasks.forEach((task) => {
      task.remove();
    });

    updateTaskCount();
  });
}

updateTaskCount();
