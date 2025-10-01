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

  // Priority order: high (0), medium (1), low (2)
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  ['todo', 'in-progress', 'done'].forEach(status => {
    const containerId = getContainerId(status);
    const columnTasks = tasks
      .filter(task => task.status === status)
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    columnTasks.forEach(task => {
      const card = createTaskCard(task);
      document.getElementById(containerId).appendChild(card);
    });
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

  // Priority badge
  const priorityBadge = createElement('span', 'priority-badge', task.priority.charAt(0).toUpperCase() + task.priority.slice(1));
  let color = '';
  if (task.priority === 'high') color = 'red';
  else if (task.priority === 'medium') color = 'orange';
  else color = 'green';
  priorityBadge.style.backgroundColor = color;
  priorityBadge.style.color = 'white';
  priorityBadge.style.padding = '2px 8px';
  priorityBadge.style.borderRadius = '8px';
  priorityBadge.style.marginRight = '8px';
  priorityBadge.style.fontWeight = 'bold';

  content.appendChild(priorityBadge);
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
