const card = document.getElementById('card');//card
const taskWriting = document.getElementById('taskWriting');//input
const addTask = document.getElementById('addTask');//add button
const task = document.getElementById('task');//task list 
const inputWrapper = document.getElementById('task');//task list 
const listGroupTodo = document.getElementById('list-group-todo');//list group  todo

//now date
const getTime = function(){
    let now = new Date()
    const day = now.getDate()< 10? '0'+ now.getDate():now.getDate();
    const month = now.getMonth() < 10? '0'+ (now.getMonth()+1):now.getMonth()+1;
    const year = now.getFullYear();

    const hour = now.getHours()< 10? '0'+ now.getHours():now.getHours();
    const minuts = now.getMinutes()< 10? '0'+ now.getMinutes():now.getMinutes();

    return (`${hour}:${minuts}, ${day}/${month}/${year}`)
}

//check
let todos = JSON.parse(localStorage.getItem('list'))?JSON.parse(localStorage.getItem('list')):[];

//show error message
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message;

    setTimeout(() => {
        document.getElementById(`${where}`).textContent = "";
    }, 2500)
}


// set Todos
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos));
};

//show Todos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'));
    listGroupTodo.innerHTML = '';
    todos.forEach(item => {
        listGroupTodo.innerHTML += `
        <li id="task" class="list-group-item hidden d-flex justify-content-between">
        ${item.text}
        <div class="todo-icon ">

          <span class="opacity-50 me-2">${item.time}</span>
        <i id="edit" style="color: blueviolet; cursor:pointer;" class="fa-solid m-2 fa-pen-to-square"></i>
        <i id="delete" style="color: blueviolet; cursor:pointer; "  class="fa-solid fa-trash-can"></i> 

      </div>

      </li>
        `;
    });

}

//delete task
function deleted() {
    const trash = document.getElementById('delete');

    trash && trash.addEventListener('click', (e) => {
        e.preventDefault();
        let deleteTask = todos.filter((item, i) => {
            return trash.remove()
        })

        todos = deleteTask;
        setTodos();
        showTodos();

})
}

//task add => button click
addTask && addTask.addEventListener('click', (e) => {
    e.preventDefault();
    const todoText = taskWriting.value.trim();
    
    if (todoText.length) {
        todos.push({text:todoText, time:getTime(), completed:false});
        setTodos();
        showTodos();
        deleted()

    } else {
        showMessage('errorMessage', 'Please, you enter Message ...');
        taskWriting.focus();
    }
})

