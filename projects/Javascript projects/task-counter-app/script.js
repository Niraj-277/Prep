// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const countSpan = document.getElementById("count");



// Application state
let tasks = [];

function renderTasks(){
    taskList.innerHTML="";

    tasks.forEach(function(task){
        const li =document.createElement("li");

        const taskSpan=document.createElement("span");
        taskSpan.textContent=task.text;

        if(task.completed){
            li.classList.add("completed")
        }

        //toggle completed state
        taskSpan.addEventListener("click",function(){
            task.completed=!task.completed;
            renderTasks();
        });

        //Delete task
        const deletebtn=document.createElement("button");
        deletebtn.textContent="X"

        deletebtn.addEventListener("click",function(){
            tasks=tasks.filter(funtion(t){
                return t.id !==task.id;
            });
            renderTasks();
        })

        li.appendChild(taskSpan)
        li.appendChild(deletebtn)
        taskList.appendChild(li)
        
    })

    countSpan.textContent=tasks.length;
}




















// Add task on button click
addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    // Validation: prevent empty input
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Validation: prevent duplicate tasks
    const existingTasks = document.querySelectorAll("#taskList li");
    for (let task of existingTasks) {
        if (task.textContent === taskText) {
            alert("Task already exists");
            return;
        }
    }

    // Create new task item
    const li = document.createElement("li");
    li.textContent = taskText;
    //create span for task text
    const taskSpan=document.createElement("span");
    taskSpan.textContent=taskText

    taskSpan.addEventListener("click",function(){
        li.classList.toggle("completed")
    })

    const deletebtn=document.createElement("button");
    deletebtn.textContent="X";
    deletebtn.classList.add("deletebutton");

    //delete task on click

    deletebtn.addEventListener("click",function(){
        taskList.removeChild(li)
        taskCount--;
        countSpan.textContent=taskCount;
    })

    li.appendChild(taskSpan);
    li.appendChild(deletebtn);

    // Remove task on click
    // li.addEventListener("click", function () {
    //     taskList.removeChild(li);
    //     taskCount--;
    //     countSpan.textContent = taskCount;
    // });

    // li.addEventListener("click",function(){
    //     li.classList.toggle("completed");
    // });
    

    //highlighting the main task

    li.addEventListener("click",function(){
        li.classList.toggle("highlight")
    })

    // Add task to list
    taskList.appendChild(li);

    // Update task count
    taskCount++;
    countSpan.textContent = taskCount;

    // Clear input field
    taskInput.value = "";
});

// Add task on Enter key press
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});
