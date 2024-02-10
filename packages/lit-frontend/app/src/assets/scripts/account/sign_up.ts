import Session from '/assets/scripts/session';

function signUpUser(): void {
  const username = (
    document.getElementById('signup-username') as HTMLInputElement
  )?.value;
  const email = (document.getElementById('signup-email') as HTMLInputElement)
    ?.value;
  const password = (
    document.getElementById('signup-password') as HTMLInputElement
  )?.value;
  const confirmPassword = (
    document.getElementById('confirm-password') as HTMLInputElement
  )?.value;

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  const signUpDetails = {
    username,
    email,
    password,
  };

  Session.signUpUser(signUpDetails);
}

function loadPage() {
  if (Session.isLoggedIn()) {
    window.location.href = '/';
  }
  const signUpButton = document.querySelector(
    '#signup-form > button'
  ) as HTMLButtonElement;
  signUpButton.addEventListener('click', signUpUser);
}

loadPage();
