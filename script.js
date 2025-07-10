const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask() {
  if (inputBox.value === "") {
    alert("You must enter a task!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);
let draggedItem = null;

listContainer.addEventListener("dragstart", function (e) {
  if (e.target.tagName === "LI") {
    draggedItem = e.target;
    setTimeout(() => (e.target.style.display = "none"), 0);
  }
});

listContainer.addEventListener("dragend", function (e) {
  if (draggedItem) {
    draggedItem.style.display = "";
    draggedItem = null;
    saveData();
  }
});

listContainer.addEventListener("dragover", function (e) {
  e.preventDefault();
  const afterElement = getDragAfterElement(listContainer, e.clientY);
  if (afterElement == null) {
    listContainer.appendChild(draggedItem);
  } else {
    listContainer.insertBefore(draggedItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll("li:not([style*='display: none'])"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: -Infinity }
  ).element;
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTasks() {
  listContainer.innerHTML = localStorage.getItem("data");
  listContainer
    .querySelectorAll("li")
    .forEach((li) => li.setAttribute("draggable", "true"));
}
showTasks();
