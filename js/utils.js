// utils.js

/**
 * Create a DOM element with optional class name and text content.
 * @param {string} tag - HTML tag name (e.g., 'div', 'h3')
 * @param {string} className - Optional class name(s)
 * @param {string} textContent - Optional text content
 * @returns {HTMLElement}
 */
export function createElement(tag, className = '', textContent = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

/**
 * Generate a unique ID using timestamp
 * @returns {string}
 */
export function generateID() {
  return `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
