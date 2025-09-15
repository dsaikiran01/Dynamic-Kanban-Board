// main.js
import { loadTasks } from './storage.js';
import { renderTasks } from './ui.js';
import { setupFormListener, setupDragAndDropListeners } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load tasks from localStorage
  const tasks = loadTasks();

  // Render them into UI
  renderTasks(tasks);

  // Set up event listeners
  setupFormListener();
  setupDragAndDropListeners();
});
