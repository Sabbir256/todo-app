const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL  = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
    todos.forEach(todo => {
        addTodo(todo);
    });
    
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
   
});

function addTodo(todo){

    let todoText  = input.value; // get the input value

    if(todo){
        todoText = todo.text;
    }


    if(todoText) {
        const todoEl = document.createElement("li");
        
        if(todo && todo.completed){
            todoEl.classList.add("completed");
        }
        
        todoEl.innerText = todoText;

        // strike out the completed todo
        todoEl.addEventListener("click", ()=>{
            todoEl.classList.toggle('completed');

            updateLS();
        });


        // use right click to delete an element
        todoEl.addEventListener("contextmenu", (e)=>{
            e.preventDefault();

            todoEl.remove();

            updateLS();
        })

        // add the child 
        todosUL.appendChild(todoEl);

        input.value=''; // empty the input field

        updateLS();
    }
}

// save to local storage 
function updateLS(){
    const todosEl = document.querySelectorAll("li");

    const todos = []; // an array containing the todos

    todosEl.forEach((todoEl) => {
        todos.push({ // push an object in the array
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));

}