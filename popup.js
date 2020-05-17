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
let new_todo = null;
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
      let div = document.createElement("div");
      div.classList.add("vertical-center");
      let button = document.createElement("button");
      let text = document.createElement("span");
      button.dataset["id"] = counter;
      button.onclick = function (item) {
        let counter = item.currentTarget.dataset["id"];
        deleteItem(counter);
      };
      text.innerHTML = item;

      // clicked_li = document.querySelectorAll(`[data-id="${counter}"]`)[0]
      // console.log("clicked_li: ", clicked_li)
      if (item == new_todo) {
        li.classList.add("animate__animated", "animate__backInLeft");
        new_todo = null;
      }
      div.appendChild(button);
      div.appendChild(text);
      li.appendChild(div);
      todolist.appendChild(li);
    }
  });
}

function deleteItem(counter) {
  clicked_li = document.querySelectorAll(`[data-id="${counter}"]`)[0]
    .parentElement.parentElement;
  clicked_li.classList.add("animate__animated", "animate__backOutRight");
  setTimeout(() => {
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
  }, 500);
}

function saveItems(items) {
  chrome.storage.sync.set({ todos: items }, function (_) {
    update();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  update();
});

let form = document.getElementById("new-todo-form");
form.onsubmit = function (e) {
  e.preventDefault();
  let todo = document.getElementById("new-todo");

  chrome.storage.sync.get({ todos: Array() }, (result) => {
    let todos = result["todos"];
    if (todos != undefined) {
      let value = todo.value;
      new_todo = value;
      // console.log("new_todo: ", new_todo)
      todos.push(value);
      todo.value = "";
      saveItems(todos);
    }
  });
};
