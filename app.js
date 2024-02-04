// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos);

// functions
function addTodo(event) {
  // btn type is submit so prevent default behavior
  event.preventDefault();

  // make this structure with js so
  //   <div class="todo">
  //     <li></li>
  //     <button>delete</button>
  //     <button>checked</button>
  //   </div>;
  //
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //

  const todoli = document.createElement("li");
  todoli.innerText = todoInput.value;

  saveLocalTodos(todoInput.value);

  todoInput.value = "";
  todoli.classList.add("todo-item");

  todoDiv.appendChild(todoli);

  const todoCompleteBtn = document.createElement("button");
  todoCompleteBtn.innerHTML = '<i class="fas fa-check"> </i>';
  todoCompleteBtn.classList.add("complete-btn");
  todoDiv.appendChild(todoCompleteBtn);

  const todoTrashBtn = document.createElement("button");
  todoTrashBtn.innerHTML = '<i class="fas fa-trash"> </i>';
  todoTrashBtn.classList.add("trash-btn");
  todoDiv.appendChild(todoTrashBtn);

  // APPEND EVERYTHING TO THE TODOLIST

  todoList.appendChild(todoDiv);
}

function deleteCheck(event) {
  const item = event.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    // animation
    todo.classList.add("fall");

    removeLocalTodos(todo.children[0].innerText);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all": {
        todo.style.display = "flex";
        break;
      }
      case "completed": {
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      }
      case "uncompleted": {
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //

    const todoli = document.createElement("li");
    todoli.innerText = todo;

    todoli.classList.add("todo-item");

    todoDiv.appendChild(todoli);

    const todoCompleteBtn = document.createElement("button");
    todoCompleteBtn.innerHTML = '<i class="fas fa-check"> </i>';
    todoCompleteBtn.classList.add("complete-btn");
    todoDiv.appendChild(todoCompleteBtn);

    const todoTrashBtn = document.createElement("button");
    todoTrashBtn.innerHTML = '<i class="fas fa-trash"> </i>';
    todoTrashBtn.classList.add("trash-btn");
    todoDiv.appendChild(todoTrashBtn);

    // APPEND EVERYTHING TO THE TODOLIST

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(removedTodo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //   todos = todos.filter((todo) => todo !== removedTodo);
  todos.splice(todos.indexOf(removedTodo), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
