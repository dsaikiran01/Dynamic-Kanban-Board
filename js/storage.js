import { render } from "./render.js";

// BUG 1: IDs collide if two tasks added quickly
// FIXED: Added a ID to every element that identifies uniquely
let id = localStorage.getItem("ID") || 0;

/**
 * @param {string} title
 * @param {string} priority
 * @returns {}
 */
export function createTask(title, priority) {
    ++id;
    localStorage.setItem("ID", id);
    return { id: `task-${id}-${Date.now()}`, title, priority, status: "todo" }
}

/**
 * Load tasks from localStorage
 * @returns {Array} 
 */
export function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]")
}

/**
 * 
 * @param {Array} tasks 
 * @param {Object} task 
 */
export function updateTask(tasks, task) {
    // open the edit canvas
    const dialog = document.querySelector("dialog");
    dialog.showModal();

    // populate the data
    const updateTitle = document.getElementById("update-task-title");
    const updatePriority = document.getElementById("update-priority-select");

    updateTitle.value = task.title
    updatePriority.value = task.priority

    // access the save and cancel button
    const saveBtn = document.getElementById("updateSave")
    const cancelBtn = document.getElementById("updateCancel")

    saveBtn.onclick = () => {
        if (updateTitle.value === "") {
            alert("Should fill title before saving")
        } else {
            // update data
            task.title = updateTitle.value
            task.priority = updatePriority.value

            tasks.forEach(t => {
                if (t.id === task.id) {
                    t = task
                }
            });

            saveTasks(tasks)
            render()
        }
    }

    cancelBtn.onclick = dialog.closeModal
}

/**
 * 
 * @param {Array} tasks 
 */
export function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

/**
 * 
 * @param {Array} tasks 
 * @param {Object} task 
 */
export function deleteTask(tasks, task) {
    tasks = tasks.filter(t => t.id !== task.id) // loses sync if IDs collided
    saveTasks(tasks)
    render()
}
