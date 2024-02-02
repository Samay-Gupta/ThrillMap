function image(url) {
  return '/assets/images' + url;
}

function setImageHeight() {
  var screenHeight =
    window.innerHeight || document.documentElement.clientHeight;
  var img = document.querySelector('.responsive-image');
  if (img) {
    img.style.height = screenHeight * (3 / 5) + 'px';
  }
  var body = document.querySelector('body');
  if (body) {
    body.style.minHeight = screenHeight + 'px';
  }
}

function getQueryParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

function setupOnDataLoad(onDataLoad) {
  document.addEventListener('DOMContentLoaded', function () {
    fetch('/assets/data/thrill_map.json')
      .then(response => response.json())
      .then(data => onDataLoad(data))
      .catch(error => console.error('Error fetching data:', error));
  });
}

async function mockLogout() {
  const Session = await import('./session.js');
  Session.default.logoutUser();
  Session.default.deleteCookie('user-name');
  Session.default.deleteCookie('user-email');
  window.location.href = '/';
}

async function mockLogin() {
  const Session = await import('./session.js');
  Session.default.setCookie('auth-key', '1234567890', 7);
  Session.default.setCookie('user-name', 'John Doe', 7);
  Session.default.setCookie('user-email', 'johndoe@gmail.com', 7);
  window.location.href = '/';
}

const rootHTML = document.getElementsByTagName('html')[0];
rootHTML.className = 'light-mode';
setDisplayMode();

async function setDisplayMode() {
  const Session = await import('./session.js');
  const darkModeEnabled = Session.default.getCookie('dark-mode') === 'true';
  rootHTML.className = darkModeEnabled ? 'dark-mode' : 'light-mode';
}

window.onload = setImageHeight;
window.onresize = setImageHeight;
