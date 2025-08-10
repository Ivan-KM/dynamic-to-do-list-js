document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';

        // Assign class by setting className property (not using classList.add)
        removeButton.className = 'remove-btn';

        // Assign onclick to remove the li element when clicked
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    }

    // Event listener for the Add Task button click
    addButton.addEventListener('click', addTask);

    // Event listener for pressing 'Enter' key inside the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
