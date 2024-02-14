export function setDisplayMode() {
  const rootHTML = document.querySelector('html') as HTMLHtmlElement;
  localStorage.preferences = localStorage.preferences || '{}';
  const preferences = JSON.parse(localStorage.preferences);
  rootHTML.className = preferences.darkMode ? 'dark-mode' : 'light-mode';
}

setDisplayMode();
