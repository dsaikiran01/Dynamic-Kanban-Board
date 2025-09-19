import { render } from "./render.js"
import { loadTasks, createTask, saveTasks } from "./storage.js"

const form = document.getElementById("taskForm")
const input = document.getElementById("taskTitle")
const priority = document.getElementById("priority-select")

form.onsubmit = e => {
    e.preventDefault()
    let tasks = loadTasks()
    const t = createTask(input.value, priority.value)
    tasks.push(t)
    input.value = ""
    saveTasks(tasks)
    render()
}

render()