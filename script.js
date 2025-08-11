document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and populate the list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // 'false' means don't save again while loading
        });
    }

    // Add a task to the list and optionally save to Local Storage
    function addTask(taskText, save = true) {
        // If taskText is not passed, get it from the input
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Only proceed if taskText is not empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // --- Task Creation and Removal (original requirement) ---
        // Create new li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create new button for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Assign onclick event to remove the task from DOM & storage
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to li
        listItem.appendChild(removeButton);

        // Append li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = '';

        // Save to Local Storage if needed
        if (save) {
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

    // Event listeners for adding tasks
    addButton.addEventListener('click', () => addTask(undefined, true));

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(undefined, true);
        }
    });

    // Load tasks when the page loads
    loadTasks();
});