// Step 1: Get references to HTML elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Step 2: Function to create and add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Step 3: Create <li> element
  const li = document.createElement('li');
  li.textContent = taskText;

  // Step 4: Add to the list
  taskList.appendChild(li);

  // Step 5: Clear the input box
  taskInput.value = "";
}

// Step 6: Add click event to the button
addTaskBtn.addEventListener('click', addTask);
