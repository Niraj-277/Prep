// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const countSpan = document.getElementById("count");

// Application state (single source of truth)
let tasks = [];

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){
    const storedTasks=localStorage.getItem("tasks");
    if(storedTasks){
        tasks=JSON.parse(storedTasks);
    }
}

// Render UI from data
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        // TOGGLE completed (single click on LI)
        li.addEventListener("click", function () {
            task.completed = !task.completed;
            renderTasks();
        });

        // EDIT task (double click on text)
        taskSpan.addEventListener("dblclick", function (event) {
            event.stopPropagation(); // prevent toggle

            if (task.completed) return;

            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = task.text;

            li.replaceChild(editInput, taskSpan);
            editInput.focus();

            editInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    const newText = editInput.value.trim();
                    if (newText !== "") {
                        task.text = newText;
                    }
                    renderTasks();
                }

                if (event.key === "Escape") {
                    renderTasks();
                }
            });
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation(); // prevent toggle
            tasks = tasks.filter(function (t) {
                return t.id !== task.id;
            });
            renderTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    countSpan.textContent = tasks.length;
    saveTasks();
}


// Add task on button click
addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    // Validation
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Create task object
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Store task in array
    tasks.push(newTask);

    // Re-render UI
    renderTasks();

    // Clear input field
    taskInput.value = "";
});

// Add task on Enter key press
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

loadTasks();
renderTasks();



