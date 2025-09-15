// events.js
import { addTask, updateTask, updateTaskStatus, loadTasks, deleteTask } from './storage.js';
import { renderTasks } from './ui.js';
import { generateID } from './utils.js';

/**
 * Set up form submission listener to create new tasks
 */
export function setupFormListener() {
  const form = document.getElementById('taskForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('taskTitle');
    const descInput = document.getElementById('taskDescription');

    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!title || !description) return;

    const newTask = {
      id: generateID(),
      title,
      description,
      status: 'todo'
    };

    addTask(newTask);
    renderTasks(loadTasks());

    // Clear form
    titleInput.value = '';
    descInput.value = '';
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

function showEditForm(task) {
  const newTitle = prompt('Edit title:', task.title);
  const newDesc = prompt('Edit description:', task.description);

  // Ensure user didn't cancel
  if (newTitle !== null && newDesc !== null) {
    const updatedTask = {
      ...task,
      title: newTitle.trim(),
      description: newDesc.trim()
    };

    updateTask(updatedTask);
    renderTasks(loadTasks());
  }
}

