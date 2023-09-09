const form = document.querySelector("form");
const todoList = document.querySelector(".todoList");

let savedTodos = JSON.parse(localStorage.getItem("toDos")) || [];

function renderTodos(){
    todoList.innerHTML = "";

    for(let i = 0; i< savedTodos.length; i++){
        const todo = savedTodos[i];

        let newTodo = document.createElement("li");
        newTodo.innerText = todo.task;

        newTodo.setAttribute("data-index", i);

        if (todo.isCompleted){
            newTodo.style.textDecorationLine = "line-through";
        }

        
        newTodo.addEventListener("click", function(){
            const index = parseInt(newTodo.getAttribute("data-index"));

            savedTodos[index].isCompleted = !savedTodos[index].isCompleted;

            updateLocalStorage();
            renderTodos();
        });

        let newButton = document.createElement("button");
        newButton.innerText = "Remove";

        newButton.addEventListener("click", function() {
            const index = parseInt(newTodo.getAttribute("data-index"));

            savedTodos.splice(index, 1);
            
            updateLocalStorage();
            renderTodos(); 
          });
        
        newTodo.append(newButton);
        todoList.append(newTodo);
    }
}

renderTodos();


form.addEventListener("submit", function(event){
    event.preventDefault();

    let newTodoItem = document.querySelector("#newItem");

    let newLi = document.createElement("li");
    newLi.innerText = newTodoItem.value;

    savedTodos.push({task: newLi.innerText, isCompleted: false});

    newLi.addEventListener("click", function(){
        const index = parseInt(newLi.getAttribute("data-index"));

        savedTodos[index].isCompleted = !savedTodos[index].isCompleted;

        updateLocalStorage();
        renderTodos();
    });

    
    let newButton = document.createElement("button");
    newButton.innerText = "Remove";
    
    newButton.addEventListener("click", function(){
        const index = parseInt(newLi.getAttribute("data-index"));

        savedTodos.splice(index, 1);

        updateLocalStorage();
        renderTodos();
    });

    newLi.append(newButton);
    todoList.append(newLi);

    form.reset();

    updateLocalStorage();
    
});


function updateLocalStorage(){
    localStorage.setItem('toDos', JSON.stringify(savedTodos));
}
