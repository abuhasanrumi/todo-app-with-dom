/*
 * Title: To Do Application using vanilla JS DOM
 * Description: This JS file has all the JS functions necessary to control the to do application
*/

// Selecting elements and assigning them to variables

let newTask = document.querySelector("#new-task")
let form = document.querySelector("form")
let toDoUl = document.querySelector("#items")
let completeListUl = document.querySelector(".complete-list ul")

// functions
let createTask = function (task) {
    let listItem = document.createElement('li')
    let checkBox = document.createElement('input')
    let label = document.createElement('label')

    label.innerText = task;
    checkBox.type = "checkBox";

    listItem.appendChild(checkBox)
    listItem.appendChild(label)

    return listItem;
}

let addTask = function (event) {
    event.preventDefault();

    let listItem = createTask(newTask.value)
    toDoUl.appendChild(listItem)
    newTask.value = "";
    // binding new list item to the incomplete list
    bindIncompleteItems(listItem, completeTask)
}

let completeTask = function () {
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button')
    deleteBtn.innerText = "Delete"
    deleteBtn.className = 'delete'
    listItem.appendChild(deleteBtn)

    let checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.remove();

    completeListUl.appendChild(listItem)

    bindCompleteItems(listItem, deleteTask);
}

let deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem)
}

let bindIncompleteItems = function (taskItem, checkboxClicked) {
    let checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.onchange = checkboxClicked;

}

let bindCompleteItems = function (taskItem, deleteBtnClicked) {
    let deleteBtn = taskItem.querySelector('.delete');
    deleteBtn.onclick = deleteBtnClicked;

}

for (let i = 0; i < toDoUl.children.length; i++) {
    bindIncompleteItems(toDoUl.children[i], completeTask)
}

for (let i = 0; i < completeListUl.children.length; i++) {
    bindCompleteItems(completeListUl.children[i], deleteTask)
}

form.addEventListener('submit', addTask)