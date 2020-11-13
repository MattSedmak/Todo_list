// object constructor
class Todo {
  constructor(name) {
    this.name = name;
    this.isCompleted = false;
  }
}

let todos = [];

window.onload = () => {
  document.getElementById("addBtn").addEventListener("click", addTodo);
  document.getElementById("toDoInput").addEventListener("keyup", (event) => {
    if (event.key == 13 || event.keyCode == 13) {
      addTodo();
    }
  });
  document.getElementById("sortBtn").addEventListener("click", sortTodo);

  let clean = new Todo("Clean house");
  let wash = new Todo("Wash the car");

  todos.push(clean);
  todos.push(wash);

  //getFromLS();
  render();
};
// Add new todos to the array.
function addTodo() {
  // user input
  let toDoInput = document.getElementById("toDoInput");
  let todo = new Todo(toDoInput.value);
  if (toDoInput.value == "") {
    errorMessage();
  } else {
    todos.push(todo);
    toDoInput.value = "";
    errorMsg.innerHTML = "";
    render();
    saveToLS();
  }
  toDoInput.focus();
}
// render todos that are in the array.
function render() {
  let ul = document.getElementById("ul");
  ul.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
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

    //Create remove btn
    let remove = document.createElement("button");
    remove.classList.add("delete");
    remove.setAttribute("type", "button");
    remove.innerHTML = '<i class="far fa-trash-alt"></i>';
    remove.addEventListener("click", () => {
      removeTodo(todos[i].name);
      li.remove();
    });
    li.appendChild(remove);
  }
}

// toggle checked
function toggleCheckbox(name) {
  for (let i = 0; i < todos.length; i++) {
    if (name == todos[i].name) {
      todos[i].isCompleted = !todos[i].isCompleted;
    }
  }
  saveToLS();
}

//Remove todo
function removeTodo(name) {
  let ul = document.getElementById("ul");
  for (let i = 0; i < todos.length; i++) {
    if (name == todos[i].name) {
      todos.splice(i, 1);
      ul.innerHTML = "";
      render();
    }
  }
  saveToLS();
}

function saveToLS() {
  localStorage.setItem("todoItem", JSON.stringify(todos));
}
function getFromLS() {
  let todoItemfromLS = localStorage.getItem("todoItem");
  todos = JSON.parse(todoItemfromLS);
  if (todoItemfromLS == null) {
    console.log("listan är tom");
    errorMessage();
  } else {
    render();
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
