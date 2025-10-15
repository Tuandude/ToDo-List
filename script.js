const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const label = document.createElement("label");
    label.className = "task-item__label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-item__checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));

    const text = document.createElement("p");
    text.className = "task-item__text";
    text.textContent = task.text;

    if (task.completed) {
      text.classList.add("task-item__text--completed");
    }

    label.appendChild(checkbox);
    label.appendChild(text);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "task-item__delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(index));

    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

function addTask(text) {
  tasks.push({ text, completed: false });
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = taskInput.value.trim();

  if (!value) {
    taskInput.focus();
    return;
  }

  addTask(value);
  taskInput.value = "";
  taskInput.focus();
});

renderTasks();
