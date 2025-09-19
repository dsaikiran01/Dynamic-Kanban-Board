import { render } from "./render.js"
import { saveTasks, loadTasks } from "./storage.js"

document.querySelectorAll(".dropzone").forEach(zone => {    
    zone.addEventListener("dragover", e => {
        e.preventDefault()
    })
    zone.addEventListener("drop", e => {
        e.preventDefault()

        const tasks = loadTasks()

        const id = e.dataTransfer.getData("text/plain")
        console.log("dropped")
        console.log("dropped id: ", id)
        const task = tasks.find(t => t.id === id)

        console.log("task: ", task)

        // BUG 3 (intentional): dropping into "inprogress" sometimes fails
        // because we forget to handle undefined task gracefully
        // FIXED: everytime a change (drop) happens we update the list (Line 12)
        if (!task) {
            console.error("Task not found for drop:", id)
            return
        }

        task.status = zone.id
        saveTasks(tasks)
        render()
    })
})