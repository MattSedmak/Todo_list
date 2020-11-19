// object constructor
class Todo {
  constructor(name) {
    this.name = name;
    this.isCompleted = false;
  }
}

let todos = [];

window.onload = function () {
  document.getElementById("addBtn").addEventListener("click", addTodo);
  document.getElementById("toDoInput").addEventListener("keyup", (event) => {
    if (event.key == 13 || event.keyCode == 13) {
      addTodo();
    }
  });
  document.getElementById("sortBtn").addEventListener("click", sortTodo);

  let clean = new Todo("Clean the house");
  let wash = new Todo("Wash the car");

  todos.push(clean);
  todos.push(wash);

  render();
};
// Add new todos.
function addTodo() {
  let toDoInput = document.getElementById("toDoInput");
  let todo = new Todo(toDoInput.value);
  if (toDoInput.value == "") {
    errorMessage();
  } else {
    todos.push(todo);
    toDoInput.value = "";
    errorMsg.innerHTML = "";
    render();
  }
  toDoInput.focus();
}
// render todos as HTML.
function render() {
  let ul = document.getElementById("ul");
  ul.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    // Create li element
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = todos[i].name;
    ul.appendChild(li);

    //Create Checkbox
    let checkBox = document.createElement("input");
    checkBox.classList.add("checkBox");
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = todos[i].isCompleted;
    if (checkBox.checked == true) {
      li.classList.add("itemIsChecked");
    }
    checkBox.addEventListener("change", () => {
      toggleCheckbox(todos[i].name);
      li.classList.toggle("itemIsChecked");
    });
    li.appendChild(checkBox);

    //Create remove button
    let remove = document.createElement("button");
    remove.classList.add("delete");
    remove.setAttribute("type", "button");
    remove.setAttribute("aria-label", "Delete button");
    remove.innerHTML = '<i class="far fa-trash-alt"></i>';
    remove.addEventListener("click", () => {
      removeTodo(todos[i].name);
      li.remove();
    });
    li.appendChild(remove);
  }
}

// Checkbox toggle
function toggleCheckbox(name) {
  let todo = todoWithName(name);
  todo.isCompleted = !todo.isCompleted;
}
// Remove todo
function removeTodo(name) {
  let ul = document.getElementById("ul");
  let todo = todoWithName(name);
  let i = todos.indexOf(todo);
  todos.splice(i, 1);
  ul.innerHTML = "";
  render();
}
// Todo name loop
function todoWithName(name) {
  for (let i = 0; i < todos.length; i++) {
    if (name == todos[i].name) {
      return todos[i];
    }
  }
}

function errorMessage() {
  let errorMsg = document.getElementById("errorMsg");
  errorMsg.innerHTML = "Oops! You forgot to add a todo &#x1f644";
}
// Sort toDo items alphabetically, lower or uppercase doesnt matter.
function sortTodo() {
  todos.sort(function (a, b) {
    let A = a.name.toLowerCase();
    let B = b.name.toLowerCase();
    if (A > B) {
      return 1;
    } else if (B > A) {
      return -1;
    } else {
      return 0;
    }
  });
  render();
}
