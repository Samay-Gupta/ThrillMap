class Session {
  static getCookie(id) {
    id = id + '=';
    let cookie: string | undefined;
    let cookiesArray = document.cookie.split(';');
    for (let i in cookiesArray) {
      cookie = cookiesArray[i];
      while (cookie.charAt(0) === ' ')
        cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(id) === 0) {
        return cookie.substring(id.length, cookie.length);
      }
    }
    return null;
  }

  static setCookie(id, value, days) {
    let expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = `${id}=${value}${expires}; path=/`;
  }

  static deleteCookie(id) {
    this.setCookie(id, '', 0);
  }

  static isLoggedIn() {
    let authKey = this.getCookie('auth-key');
    return authKey && authKey !== '';
  }

  static logoutUser() {
    this.deleteCookie('auth-key');
    this.deleteCookie('user-name');
    this.deleteCookie('user-email');
  }

  static loginUser(loginDetails) {
    this.setCookie('auth-key', '1234567890', 7);
    this.setCookie('user-name', 'John Doe', 7);
    this.setCookie('user-email', 'johndoe@gmail.com', 7);
    window.location.href = '/';
  }

  static signUpUser(signUpDetails) {
    this.loginUser({});
  }
}

export default Session;
