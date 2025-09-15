// main.js
import { loadTasks } from './storage.js';
import { renderTasks } from './ui.js';
import { setupFormListener, setupDragAndDropListeners } from './events.js';

// === THEME TOGGLE ===

const themeToggleBtn = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

// Apply saved theme
if (currentTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggleBtn.textContent = '🌞';
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');

  // Update button icon
  themeToggleBtn.textContent = isDark ? '🌞' : '🌙';

  // Save to localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// auto detect earlier theme settings
if (!localStorage.getItem('theme')) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
    themeToggleBtn.textContent = '🌞';
    localStorage.setItem('theme', 'dark');
  }
}

// === On Page Loading ===

document.addEventListener('DOMContentLoaded', () => {
  // Load tasks from localStorage
  const tasks = loadTasks();

  // Render them into UI
  renderTasks(tasks);

  // Set up event listeners
  setupFormListener();
  setupDragAndDropListeners();
});
