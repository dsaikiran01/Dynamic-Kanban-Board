// storage.js

const STORAGE_KEY = 'kanbanTasks';

/**
 * Load tasks from localStorage.
 * @returns {Array} Array of task objects.
 */
export function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save tasks to localStorage.
 * @param {Array} tasks - Array of task objects.
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Add a new task and save it.
 * @param {Object} task - Task object to add.
 */
export function addTask(task) {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
}

/**
 * Update a task's status and save.
 * @param {string} taskId - ID of the task to update.
 * @param {string} newStatus - New status (e.g., 'in-progress', 'done').
 */
export function updateTaskStatus(taskId, newStatus) {
  const tasks = loadTasks();
  const updated = tasks.map(task =>
    task.id === taskId ? { ...task, status: newStatus } : task
  );
  saveTasks(updated);
}
/*
 * Delete a task
*/
export function deleteTask(taskId) {
  const tasks = loadTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
}

/*
* Update full task (title/description/status)
*/
export function updateTask(updatedTask) {
  const tasks = loadTasks().map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(tasks);
}
