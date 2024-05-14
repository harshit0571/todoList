let todoArray = [];

const fetchTodos = async () => {
  console.log("fetch");

  const response = await fetch(
    " https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const data = await response.json();
  return data;
};

const saveToLocal = () => {
  localStorage.setItem("todos", JSON.stringify(todoArray));
};

const toggleTodo = (index) => {
  todoArray[index].completed = !todoArray[index].completed;
  console.log(todoArray[index]);
  saveToLocal();
  renderTodo();
};

const deleteTodo = (index) => {
  todoArray.splice(index, 1);
  saveToLocal();
  renderTodo();
};

const addTask = () => {
  const input = document.querySelector("#addInput");
  const task = input.value.trim();

  if (task) {
    const newTodo = {
      id: todoArray.length + 1,
      title: task,
      completed: false,
    };
    todoArray.push(newTodo);
    renderTodo();
    input.value = "";
  }
  saveToLocal();
};

const renderTodo = () => {
  console.log("render");
  const todoContainer = document.querySelector(".todoContainer");
  todoContainer.innerHTML = "";
  todoArray.map((data, index) => {
    const todo = `  <div class="todo">
        <div id="number">${index + 1})  </div>
        <p id="task"  class=${data.completed ? "checked" : ""}>${data.title}</p>
        <div class="buttons">
          <input type="checkbox"  ${
            data.completed ? "checked" : ""
          } onclick="toggleTodo(${index})"/>
          <i class="fa fa-trash" aria-hidden="true" onclick="deleteTodo(${index})"></i>
        </div>
      </div>`;
    // if (data.completed) {
    //   console.log(data);
    // }
    todoContainer.innerHTML += todo;
  });
  updateCounter();
};

const updateCounter = () => {
  const totalTodosElement = document.querySelector(".totalTodos");
  const completedTodosElement = document.querySelector(".completedTodos");
  const incompletedTodosElement = document.querySelector(".incompletedTodos");

  const totalTasks = todoArray.length;
  const completedTasks = todoArray.filter((todo) => todo.completed).length;
  const incompletedTasks = totalTasks - completedTasks;

  totalTodosElement.textContent = `Total Tasks: ${totalTasks}`;
  completedTodosElement.textContent = `Completed Tasks: ${completedTasks}`;
  incompletedTodosElement.textContent = `Incomplete Tasks: ${incompletedTasks}`;
};

document.addEventListener("DOMContentLoaded", async () => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todoArray = JSON.parse(savedTodos);
  } else {
    todoArray = await fetchTodos();
    saveToLocal();
  }

  renderTodo();
});
