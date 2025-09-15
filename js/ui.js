// ui.js
import { createElement } from './utils.js';

/**
 * Render all tasks to the appropriate columns
 * @param {Array} tasks - Array of task objects
 */
export function renderTasks(tasks) {
  // Clear all task lists
  document.getElementById('todoTasks').innerHTML = '';
  document.getElementById('inProgressTasks').innerHTML = '';
  document.getElementById('doneTasks').innerHTML = '';

  tasks.forEach(task => {
    const card = createTaskCard(task);
    const containerId = getContainerId(task.status);
    document.getElementById(containerId).appendChild(card);
  });
}

/**
 * Create a DOM element for a task card
 * @param {Object} task - A task object
 * @returns {HTMLElement} - Task card element
 */
export function createTaskCard(task) {
  const card = createElement('div', 'task-card');
  card.setAttribute('draggable', true);
  card.setAttribute('data-id', task.id);

  const content = createElement('div', 'task-content');
  const title = createElement('h3', '', task.title);
  const desc = createElement('p', '', task.description);
  content.appendChild(title);
  content.appendChild(desc);

  const actions = createElement('div', 'task-actions');
  const editBtn = createElement('button', 'edit-btn', '✏️ Edit');
  const deleteBtn = createElement('button', 'delete-btn', '🗑️ Delete');

  editBtn.setAttribute('data-id', task.id);
  deleteBtn.setAttribute('data-id', task.id);

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  card.appendChild(content);
  card.appendChild(actions);

  return card;
}

/**
 * Get container ID based on task status
 * @param {string} status - 'todo', 'in-progress', or 'done'
 * @returns {string} - Corresponding DOM container ID
 */
function getContainerId(status) {
  switch (status) {
    case 'todo':
      return 'todoTasks';
    case 'in-progress':
      return 'inProgressTasks';
    case 'done':
      return 'doneTasks';
    default:
      return 'todoTasks';
  }
}
