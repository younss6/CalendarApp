const daysOfWeek = [
  "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
];

const daySelect = document.getElementById("day-select");
const selectedDayText = document.getElementById("selected-day");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addTodoBtn = document.getElementById("add-todo");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");
const saveHoursBtn = document.getElementById("save-hours");

let currentDay = daysOfWeek[0];
let todos = JSON.parse(localStorage.getItem("todos")) || {};
let workHours = JSON.parse(localStorage.getItem("workHours")) || {};

function populateDaySelect() {
  daysOfWeek.forEach(day => {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    daySelect.appendChild(option);
  });
}

function updateTodoList() {
  todoList.innerHTML = "";
  selectedDayText.textContent = currentDay;

  const items = todos[currentDay] || [];
  items.forEach((item, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = item;

    const del = document.createElement("button");
    del.textContent = "🗑️";
    del.onclick = () => {
      items.splice(index, 1);
      todos[currentDay] = items;
      localStorage.setItem("todos", JSON.stringify(todos));
      updateTodoList();
    };

    li.appendChild(span);
    li.appendChild(del);
    todoList.appendChild(li);
  });

  const hours = workHours[currentDay];
  if (hours) {
    startTimeInput.value = hours.start;
    endTimeInput.value = hours.end;
  } else {
    startTimeInput.value = "";
    endTimeInput.value = "";
  }
}

daySelect.addEventListener("change", () => {
  currentDay = daySelect.value;
  updateTodoList();
});

addTodoBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text) {
    if (!todos[currentDay]) todos[currentDay] = [];
    todos[currentDay].push(text);
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
    updateTodoList();
  }
});

saveHoursBtn.addEventListener("click", () => {
  const start = startTimeInput.value;
  const end = endTimeInput.value;
  if (start && end) {
    workHours[currentDay] = { start, end };
    localStorage.setItem("workHours", JSON.stringify(workHours));
    alert("Heures enregistrées !");
  }
});

populateDaySelect();
updateTodoList();
