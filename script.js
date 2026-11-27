
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

    if (task === "") {
        message.innerText = "Please enter a task first! 🌸";
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
    message.innerText = "Your task has been added! ✨";
}

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

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();
