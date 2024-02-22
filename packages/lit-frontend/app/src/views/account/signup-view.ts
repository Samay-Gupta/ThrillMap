import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '/app'
import { Router } from '@vaadin/router';

import { SignUpForm } from '/models/account';

const pageStyles = css`
.signup-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: var(--border1);
  border-radius: 5px;
  background-color: var(--color-background-secondary);
  box-shadow: var(--box-shadow1);
}

.signup-form label {
  display: block;
  margin-bottom: 8px;
  font-size: var(--font-size2);
  color: var(--color-gray3);
}

.signup-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid var(--color-gray1);
  border-radius: 4px;
  background-color: var(--color-white);
  color: var(--color-black);
  box-sizing: border-box;
}

.signup-form button {
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

.signup-form button:hover {
  background-color: var(--color-accent2);
  color: var(--color-secondary);
}

.signup-form input:focus,
.signup-form button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

`;

@customElement('signup-view')
class SignUpView extends App.View {
  @property()
  signUpForm: SignUpForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  @property()
  get profile() {
    return this.getFromModel<Profile>('profile');
  }

  static styles = pageStyles;

  render() {
    if (this.profile !== null) {
      Router.go('/');
    }
    return html`
    <form class="signup-form" id="signup-form"  @submit="${this.attemptSignUp}">
      <label for="signup-first-name">First Name:</label>
      <input
        type="text"
        name="firstName"
        placeholder="Enter your First Name"
        @input="${this.handleInputChange}"
        value="${this.signUpForm.firstName}"
        required
      />
      <br />
      <label for="signup-last-name">Last Name:</label>
      <input
        type="text"
        name="lastName"
        placeholder="Enter your Last Name"
        @input="${this.handleInputChange}"
        value="${this.signUpForm.lastName}"
        required
      />
      <br />
      <label for="signup-email">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        @input="${this.handleInputChange}"
        value="${this.signUpForm.email}"
        required
      />
      <br />
      <label for="signup-password">Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Create a password"
        @input="${this.handleInputChange}"
        value="${this.signUpForm.password}"
        required
      />
      <br />
      <label for="confirm-password">Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        @input="${this.handleInputChange}"
        value="${this.signUpForm.confirmPassword}"
        required
      />
      <br />
    <button type="submit" >Sign Up</button>
    </form>
    `;
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.loginForm = { ...this.loginForm, [name]: value };
  }

  attemptSignUp(e) {
    e.preventDefault();

    if (this.signUpForm.password !== this.signUpForm.confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    this.dispatchMessage({
      type: 'SignUpUser',
      signUpForm: this.signUpForm,
    });

    Router.go('/');
  }
}
