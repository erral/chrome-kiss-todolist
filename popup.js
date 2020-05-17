// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", function (data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

// changeColor.onclick = function (element) {
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'document.body.style.backgroundColor = "' + color + '";',
//     });
//   });
// };

function update() {
  let todolist = document.getElementById("todo-list");
  while (todolist.firstChild) {
    todolist.removeChild(todolist.firstChild);
  }

  chrome.storage.sync.get({ todos: Array() }, (result) => {
    let todos = result["todos"];
    for (let counter in todos) {
      let item = todos[counter];
      let li = document.createElement("li");
      let text = document.createElement("span");
      let button = document.createElement("button");
      button.innerHTML = "X";
      button.dataset["id"] = counter;
      button.onclick = function (item) {
        let counter = item.currentTarget.dataset["id"];
        deleteItem(counter);
      };
      text.innerHTML = item;
      li.appendChild(text);
      li.appendChild(button);
      todolist.appendChild(li);
    }
  });
}

function deleteItem(counter) {
  chrome.storage.sync.get({ todos: Array() }, (result) => {
    let todos = result["todos"];
    let new_todos = Array();
    for (let i in todos) {
      if (i != counter) {
        new_todos.push(todos[i]);
      }
    }
    saveItems(new_todos);
  });
}

function saveItems(items) {
  chrome.storage.sync.set({ todos: items }, function (_) {
    update();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  update();
});

let addToDo = document.getElementById("addToDo");
addToDo.onclick = function (element) {
  let todo = document.getElementById("new-todo");

  chrome.storage.sync.get({ todos: Array() }, (result) => {
    let todos = result["todos"];
    if (todos != undefined) {
      let value = todo.value;
      todos.push(value);
      todo.value = "";
      saveItems(todos);
    }
  });
};

var input = document.getElementById("new-todo");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("addToDo").click();
  }
});