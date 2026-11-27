
function getSavedTasks() {
    return JSON.parse(localStorage.getItem("studyMateTasks")) || [];
}

let tasks = getSavedTasks();

function saveTasks() {
    localStorage.setItem("studyMateTasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.innerText = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.innerText = task.completed ? "✓ Completed" : "✓ Done";

        completeButton.onclick = function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.innerText = "🗑 Delete";

        deleteButton.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const message = document.getElementById("message");
    const task = input.value.trim();
    const priority = document.getElementById("taskPriority").value;

    if (task === "") {
        message.innerText = "Please enter a task first! 🌸";
        return;
    }

    const li = document.createElement("li");

    // Task text
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.innerText = task;

    // Priority badge
    const priorityBadge = document.createElement("span");
    priorityBadge.className = "priority-badge priority-" + priority.toLowerCase();
    priorityBadge.innerText = priority;

    // Complete button
    const completeButton = document.createElement("button");
    completeButton.className = "complete-btn";
    completeButton.innerText = "✓ Done";

    completeButton.onclick = function () {
        taskText.classList.toggle("completed");
        updateStats();
    };

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerText = "🗑 Delete";

    deleteButton.onclick = function () {
        li.remove();
        updateStats();
    };

    // Add elements to task
    li.appendChild(taskText);
    li.appendChild(priorityBadge);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(li);

    // Reset input
    input.value = "";
    document.getElementById("taskPriority").value = "Medium";

    message.innerText = "Your task has been added! ✨";
}

// Update task statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;

    document.getElementById("emptyState").style.display =
        total === 0 ? "block" : "none";
}

// Press Enter to add task
document.getElementById("taskInput").addEventListener(
    "keypress",
    function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    }
);

renderTasks();
