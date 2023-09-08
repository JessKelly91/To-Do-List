const form = document.querySelector("form");
const todoList = document.querySelector(".todoList")

const savedTodos = JSON.parse(localStorage.getItem("toDos")) || [];

for(let i = 0; i< savedTodos.length; i++){
        let newTodo = document.createElement("li");
        newTodo.innerText = savedTodos[i];

        let newButton = document.createElement("button");
        newButton.innerText = "Remove";
        
        newTodo.append(newButton);
        todoList.appendChild(newTodo);
    }



form.addEventListener("submit", function(event){
    event.preventDefault();

    let newTodoItem = document.querySelector("#newItem");

    let newLi = document.createElement("li");
    newLi.innerText = newTodoItem.value;

    let newButton = document.createElement("button");
    newButton.innerText = "Remove";

    newLi.append(newButton);
    todoList.append(newLi);

    form.reset();
    
    savedTodos.push({task: newLi.innerText, isCompleted: false});

    updateLocalStorage();

})

todoList.addEventListener("click", function(event){
        if(event.target.tagName === "BUTTON"){
            event.target.parentElement.remove();
        }

        else if(event.target.tagName === 'LI'){
            let clickedListItem = event.target;

            if(event.target.style.textDecorationLine === ""){
                event.target.style.textDecorationLine = "line-through";
                clickedListItem.isCompleted = true;
            }
            else if(event.target.style.textDecorationLine === "line-through"){
                event.target.style.textDecorationLine = "";
                clickedListItem.isCompleted = false;
            }
        }

        // updateLocalStorage();
    }
)

function updateLocalStorage(){
    localStorage.setItem('toDos', JSON.stringify(savedTodos));
}
