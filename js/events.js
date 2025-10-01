// events.js
import { addTask, updateTask, updateTaskStatus, loadTasks, deleteTask } from './storage.js';
import { renderTasks } from './ui.js';
import { generateID, createElement } from './utils.js';

/**
 * Set up form submission listener to create new tasks
 */
export function setupFormListener() {
  const form = document.getElementById('taskForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('taskTitle');
    const descInput = document.getElementById('taskDescription');
    const priorityInput = document.getElementById('taskPriority');

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const priority = priorityInput.value;

    if (!title || !description || !priority) return;

    const newTask = {
      id: generateID(),
      title,
      description,
      priority,
      status: 'todo'
    };

    addTask(newTask);
    renderTasks(loadTasks());

    // Clear form
    titleInput.value = '';
    descInput.value = '';
    priorityInput.value = 'high';
  });
}

/**
 * Set up drag-and-drop functionality across all columns
 */
export function setupDragAndDropListeners() {
  const taskLists = document.querySelectorAll('.task-list');

  taskLists.forEach((list) => {
    // Allow dropping
    list.addEventListener('dragover', (e) => {
      e.preventDefault();
      list.classList.add('drag-over');
    });

    // Remove visual feedback
    list.addEventListener('dragleave', () => {
      list.classList.remove('drag-over');
    });

    // Handle drop
    list.addEventListener('drop', (e) => {
      e.preventDefault();
      list.classList.remove('drag-over');

      const taskId = e.dataTransfer.getData('text/plain');
      const newStatus = list.parentElement.getAttribute('data-status');

      updateTaskStatus(taskId, newStatus);
      renderTasks(loadTasks());
    });
  });

  // Handle dragging task cards
  document.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.task-card');
    if (card) {
      e.dataTransfer.setData('text/plain', card.getAttribute('data-id'));
    }
  });

  // Edit and delete button listeners (delegated)
  document.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.edit-btn');
    const deleteBtn = e.target.closest('.delete-btn');

    // DELETE
    if (deleteBtn) {
      const id = deleteBtn.getAttribute('data-id');
      deleteTask(id);
      renderTasks(loadTasks());
    }

    // EDIT
    if (editBtn) {
      const id = editBtn.getAttribute('data-id');
      const task = loadTasks().find(t => t.id === id);
      if (task) showEditForm(task);
    }
  });
}

/**
 * Replaces a task card's content with an inline editable form.
 *
 * This function targets the task card by its unique `data-id`, 
 * clears its current content, and displays input fields to edit 
 * the task title and description. It also adds "Save" and "Cancel" 
 * buttons with respective handlers:
 *
 * @param {Object} task - The task object to edit.
 * 
 * Display inline edit form for a task with Save and Cancel buttons
 */
export function showEditForm(task) {
  const card = document.querySelector(`.task-card[data-id="${task.id}"]`);
  if (!card) return;

  const contentDiv = card.querySelector('.task-content');
  const actionsDiv = card.querySelector('.task-actions');

  if (!contentDiv || !actionsDiv) return;

  // Clear current content
  contentDiv.innerHTML = '';
  actionsDiv.innerHTML = '';

  // Create editable fields
  const titleInput = createElement('input', 'edit-title-input');
  titleInput.value = task.title;

  const descInput = createElement('textarea', 'edit-desc-input');
  descInput.value = task.description;

  // Priority dropdown
  const prioritySelect = createElement('select', 'edit-priority-select');
  ['high', 'medium', 'low'].forEach(p => {
    const opt = createElement('option', '', p.charAt(0).toUpperCase() + p.slice(1));
    opt.value = p;
    if (task.priority === p) opt.selected = true;
    prioritySelect.appendChild(opt);
  });

  const saveBtn = createElement('button', 'save-edit-btn', '💾 Save');
  const cancelBtn = createElement('button', 'cancel-edit-btn', '❌ Cancel');

  // Append editable fields
  contentDiv.appendChild(prioritySelect);
  contentDiv.appendChild(titleInput);
  contentDiv.appendChild(descInput);

  // Append action buttons
  actionsDiv.appendChild(saveBtn);
  actionsDiv.appendChild(cancelBtn);

  // SAVE handler
  saveBtn.addEventListener('click', () => {
    const updatedTask = {
      ...task,
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      priority: prioritySelect.value
    };

    updateTask(updatedTask);
    renderTasks(loadTasks());
  });

  // CANCEL handler
  cancelBtn.addEventListener('click', () => {
    renderTasks(loadTasks());
  });
}
