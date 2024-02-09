import Session from "../session";

function loginUser(): void {
    const username = (document.getElementById('username') as HTMLInputElement)?.value;
    const password = (document.getElementById('password') as HTMLInputElement)?.value;

    const loginDetails = {
        username,
        password
    };

    Session.loginUser(loginDetails);
}

function loadPage() {
    if (Session.isLoggedIn()) {
        window.location.href = '/';
    }
    const loginButton = document.querySelector('#login-form > button') as HTMLButtonElement;
    loginButton.addEventListener("click", loginUser);
}

loadPage();