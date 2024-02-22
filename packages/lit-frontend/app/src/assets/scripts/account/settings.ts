import Session from '/assets/scripts/session';

function loadPage() {
  if (!Session.isLoggedIn()) {
    window.location.href = '/login';
  }
}

loadPage();
