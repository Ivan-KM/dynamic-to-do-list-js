// Step 1: Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Step 2: Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 3: Define the function to add tasks
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Step 4: Check if input is empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Step 5: Create a new list item for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Step 6: Remove task when button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Append the button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Step 7: Clear the input field
        taskInput.value = '';
    }

    // Step 8: Add event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});