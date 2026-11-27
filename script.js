
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

    updateStats();
}

// Update task statistics
function updateStats() {
    const tasks = document.querySelectorAll("#taskList li");
    const completed = document.querySelectorAll(
        "#taskList .task-text.completed"
    );

    document.getElementById("totalTasks").innerText = tasks.length;
    document.getElementById("completedTasks").innerText = completed.length;
    document.getElementById("pendingTasks").innerText =
        tasks.length - completed.length;

    document.getElementById("emptyState").style.display =
        tasks.length === 0 ? "block" : "none";
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

updateStats();
