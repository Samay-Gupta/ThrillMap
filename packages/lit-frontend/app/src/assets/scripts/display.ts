export function setDisplayMode() {
  const pageRoot = document.querySelector('html') as HTMLhtmlElement;
  localStorage.preferences = localStorage.preferences || '{}';
  const preferences = JSON.parse(localStorage.preferences);
  pageRoot.className = preferences.darkMode ? 'dark-mode' : 'light-mode';
}

// setDisplayMode();
