function getSavedTasks() {
    try {
        const savedTasks = JSON.parse(localStorage.getItem("studyMateTasks"));
        return Array.isArray(savedTasks) ? savedTasks : [];
    } catch (error) {
        return [];
    }
}

let tasks = getSavedTasks().filter(task => task && typeof task.text === "string");

function saveTasks() {
    localStorage.setItem("studyMateTasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.innerText = task.text;
        taskText.classList.toggle("completed", Boolean(task.completed));

        const priority = task.priority || "Medium";
        const priorityBadge = document.createElement("span");
        priorityBadge.className = "priority-badge priority-" + priority.toLowerCase();
        priorityBadge.innerText = priority;

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.type = "button";
        completeButton.innerText = task.completed ? "↩ Undo" : "✓ Complete";
        completeButton.setAttribute("aria-pressed", String(Boolean(task.completed)));
        completeButton.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";
        deleteButton.innerText = "🗑 Delete";
        deleteButton.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(taskText);
        li.appendChild(priorityBadge);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    updateStats();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const message = document.getElementById("message");
    const text = input.value.trim();
    const priority = document.getElementById("taskPriority").value;

    if (text === "") {
        message.innerText = "Please enter a task first! 🌸";
        return;
    }

    tasks.push({ text, priority, completed: false });
    saveTasks();
    renderTasks();

    input.value = "";
    document.getElementById("taskPriority").value = "Medium";
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

document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

renderTasks();
