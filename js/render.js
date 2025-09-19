import { deleteTask, loadTasks, updateTask } from "./storage.js"

const priorityVals = {
    "high": 1,
    "medium": 2,
    "low": 3
}

export function render() {
    let tasks = loadTasks();

    document.querySelectorAll(".dropzone").forEach(z => z.innerHTML = "")

    // sort tasks based on priority before rendering
    // all high priority elements will render first
    // follwed by medium and then low
    tasks.sort((a, b) => {
        return priorityVals[a.priority] - priorityVals[b.priority]
    })

    tasks.forEach(task => {
        const div = document.createElement("div")
        div.className = `task ${task.priority}`
        div.innerHTML = `<li class="task-title">${task.title}</li><li class="task-priority">${task.priority}</li>`
        div.draggable = true
        div.dataset.id = task.id
        div.dataset.status = task.status

        // Update button
        const updateBtn = document.createElement("button")
        updateBtn.innerHTML = "&#9998;"
        updateBtn.onclick = () => updateTask(tasks, task)
        div.appendChild(updateBtn)

        // Delete button (BUG 2: sometimes deletes wrong task)
        // FIXED: As unique ID generated, no 2 tasks will have same id
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "x"
        deleteBtn.onclick = () => deleteTask(tasks, task)
        div.appendChild(deleteBtn)

        div.addEventListener("dragstart", e => {
            div.classList.add("dragging")
            e.dataTransfer.setData("text/plain", task.id)
        })
        div.addEventListener("dragend", () => div.classList.remove("dragging"))

        document.getElementById(task.status).appendChild(div)
    })
}
