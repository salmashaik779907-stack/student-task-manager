
function addTask() {
    const input = document.getElementById("taskInput");
    const message = document.getElementById("message");
    const task = input.value.trim();

    if (task === "") {
        message.innerText = "Please enter a task first! 🌸";
        return;
    }

    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.innerText = task;

    const completeButton = document.createElement("button");
    completeButton.className = "complete-btn";
    completeButton.innerText = "✓ Done";

    completeButton.onclick = function () {
        taskText.classList.toggle("completed");
        updateStats();
    };

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerText = "🗑 Delete";

    deleteButton.onclick = function () {
        li.remove();
        updateStats();
    };

    li.appendChild(taskText);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
    message.innerText = "Your task has been added! ✨";

    updateStats();
}

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

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

updateStats();
