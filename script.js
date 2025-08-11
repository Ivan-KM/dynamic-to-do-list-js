document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Keep an in-memory array of tasks and load from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Save the tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from tasks array into the DOM
    function loadTasks() {
        tasks.forEach(taskText => {
            addTask(taskText, false); // false -> don't save again while loading
        });
    }

    /**
     * Add a task to the DOM and optionally save it to localStorage.
     * Follows the required "Task Creation and Removal" steps exactly.
     *
     * @param {string} taskText - The task text to add. If not provided, takes from input.
     * @param {boolean} save - Whether to push to tasks[] and update localStorage (default true).
     */
    function addTask(taskText, save = true) {
        // If no taskText passed, get it from the input and trim
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Only proceed if taskText is not empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // --- Task Creation and Removal (required steps) ---
        // Create a new li element. Set its textContent to taskText.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        // Set its textContent to "Remove", and give it a class name of 'remove-btn'.
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn'; // <-- using className, not classList.add

        // Assign an onclick event to the remove button that removes the li element from taskList
        removeButton.onclick = function() {
            // Remove the li element from the DOM
            taskList.removeChild(listItem);

            // Also remove the task from tasks[] and update localStorage
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);

        // Append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field by setting taskInput.value to an empty string.
        // Only clear when this call originated from user input (save === true)
        if (save) {
            taskInput.value = '';
        }

        // If requested, add the task to tasks[] and persist to localStorage
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }
    }

    // Attach event listeners
    addButton.addEventListener('click', function() {
        addTask(undefined, true);
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(undefined, true);
        }
    });

    // Initialize from localStorage
    loadTasks();
});