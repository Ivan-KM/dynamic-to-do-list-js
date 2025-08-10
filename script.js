document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and populate the list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false to avoid saving again to Local Storage
        });
    }

    // Add a task to the list and optionally save it to Local Storage
    function addTask(taskText, save = true) {
        // If taskText was not passed (e.g., from input), get and trim input
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item and remove button
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove task when button clicked, and update Local Storage
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            if (save) { // Only update storage if this is a user action, not loading
                removeTaskFromStorage(taskText);
            }
        };

        // Append button and list item
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input field only if this was triggered by user input (save = true)
        if (save) {
            taskInput.value = '';
            saveTaskToStorage(taskText);
        }
    }

    // Save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask(undefined, true));

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(undefined, true);
        }
    });

    // Load tasks on page load
    loadTasks();
});