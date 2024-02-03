function loginUser(): void {
    const username = (document.getElementById('username') as HTMLInputElement)?.value;
    const password = (document.getElementById('password') as HTMLInputElement)?.value;

    const loginDetails = {
        username,
        password
    };

    mockLogin();
}
