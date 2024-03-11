import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '../../app';
import { Router } from '@vaadin/router';

import { LoginForm, Profile } from 'thrill-map-models';
import { NavPages } from '../../assets/components/navbar';

const pageStyles = css`
  .login-form {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: var(--border1);
    border-radius: 5px;
    background-color: var(--color-background-secondary);
    box-shadow: var(--box-shadow1);
  }

  .login-form label {
    display: block;
    margin-bottom: 8px;
    font-size: var(--font-size2);
    color: var(--color-gray3);
  }

  .login-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid var(--color-gray1);
    border-radius: 4px;
    background-color: var(--color-white);
    color: var(--color-black);
    box-sizing: border-box;
  }

  .login-form button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: var(--color-accent1);
    color: var(--color-white);
    cursor: pointer;
    font-size: var(--font-size2);
    transition:
      var(--background-color-primary) 0.3s,
      color 0.3s;
  }

  .login-form button:hover {
    background-color: var(--color-accent2);
    color: var(--color-secondary);
  }

  .login-form input:focus,
  .login-form button:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

@customElement('login-view')
class LoginView extends App.View {
  @property({ type: Object })
  loginForm: LoginForm = {
    email: '',
    password: '',
  };

  @property({ type: Object })
  get profile() {
    return this.getFromModel<Profile>('profile');
  }

  connectedCallback(): void {
    super.connectedCallback();
    NavPages.setActive('/');
  }

  static styles = pageStyles;

  render() {
    if (this.profile !== null) {
      Router.go('/');
    }
    return html` <form
      class="login-form"
      id="login-form"
      @submit="${this.attemptLogin}"
    >
      <label for="email">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        @input="${this.handleInputChange}"
        value="${this.loginForm.email}"
        required
      />
      <br />
      <label for="password">Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        @input="${this.handleInputChange}"
        value="${this.loginForm.password}"
        required
      />
      <br />
      <button type="submit">Login</button>
    </form>`;
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.loginForm = { ...this.loginForm, [name]: value };
  }

  attemptLogin(e) {
    e.preventDefault();

    this.dispatchMessage({
      type: 'LoginUser',
      loginForm: this.loginForm,
    });

    Router.go('/');
  }
}
