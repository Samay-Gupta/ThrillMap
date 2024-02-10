import Session from '/assets/scripts/session';

function loadPage() {
  if (Session.isLoggedIn()) {
    window.location.href = '/';
  }
  const loginButton = document.querySelector(
    '#login-form > button'
  ) as HTMLButtonElement;
  loginButton.addEventListener('click', () =>
    Session.loginUser({
      email: (document.getElementById('email') as HTMLInputElement)?.value,
      password: (document.getElementById('password') as HTMLInputElement)
        ?.value,
    })
  );
}

loadPage();
