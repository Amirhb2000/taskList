// Define UI Vars
const form = document.getElementById("task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
leadEventListener();
// Load Event Listener Function
function leadEventListener() {
  // Dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (tasks) {
    // Creat li element
    const li = document.createElement("li");
    // Add Class
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(tasks));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Add the link to li
    li.appendChild(link);
    // Append the li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  // Creat li element
  const li = document.createElement("li");
  // Add Class
  li.className = "collection-item";
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Add the link to li
  li.appendChild(link);
  // Append the li to ul
  taskList.appendChild(li);
  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);
  // clear input
  taskInput.value = "";
  e.preventDefault();
}
// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      // Remove form LS
      removeTaskFromLoacalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove From LS
function removeTaskFromLoacalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks Function
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear From Ls
  clearTasksFromeLocalStorage();
}

// Clear Tasks Function
function clearTasksFromeLocalStorage() {
  localStorage.clear();
}
// Filter Tasks Function
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
// Store Tasks in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
