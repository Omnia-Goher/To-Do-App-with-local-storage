
let taskInput = document.querySelector("#task-input");
let addTaskButton = document.querySelector("#add-task");
let taskContainer = document.querySelector(".task-container");

// Empty array to store tasks
let arrayOfTasks = [];

// Check if there is tasks in local storage
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger get tasks from local storage 
getTasksFromLocalStorage();

// 
taskContainer.addEventListener("click",function(e){
    // Delete button
    if(e.target.classList.contains("delete-button")){
        // Remove Task from local storage
        // Get the parent of delete button and pass its attribute to delete the whole task
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
        // Remove task from page
        e.target.parentElement.remove();
    }
    // When click on task elemnt to spicify that its done
    if(e.target.classList.contains("task")){
        // toggle completed for the task
        toggleStatuesTask(e.target.getAttribute("data-id"));
        // Toggle class done 
        e.target.classList.toggle("done");
    }
});

// Add Task
addTaskButton.onclick = function(e){
    e.preventDefault(); // prevent the default behaivor of form (send inf & refresh page)
   if(taskInput.value !== ""){
       addTaskToArray(taskInput.value); // Add task to array of tasks
       taskInput.value = ""; // Empty input field
   }
}

function addTaskToArray(taskText){
    // Task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // push task to array of task 
    arrayOfTasks.push(task);
    // Add tasks to page
    addElementsToPageFrom(arrayOfTasks);
    // Add tasks to local storage
    addTasksToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){
    // Empty tasks container
    taskContainer.innerHTML = "";
    // Lopping on array of tasks
    arrayOfTasks.forEach(task => {
        // Create main task div
        let div = document.createElement("div");
        div.classList = "task";
        // Check if task is completed
        if(task.completed){
            div.className = "task done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create delete button as span
        let span  = document.createElement("span");
        span.className = "delete-button";
        span.appendChild(document.createTextNode("Delete"));
        // Append delete button to task div
        div.appendChild(span);
        // Add task to task container
        taskContainer.appendChild(div);
    });
}

function addTasksToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getTasksFromLocalStorage(){
    let data = localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskFromLocalStorage(taskId){
    // Update array of tasks after filtering the task we want to remove
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTasksToLocalStorageFrom(arrayOfTasks);
}

function toggleStatuesTask(taskId){
    for(let i=0; i<arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? 
            (arrayOfTasks[i].completed = true)  : 
            (arrayOfTasks[i].completed = false);
        }
    }
    addTasksToLocalStorageFrom(arrayOfTasks);
}