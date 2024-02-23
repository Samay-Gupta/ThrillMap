import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '/app';
import { Router } from '@vaadin/router';

import { LoginForm } from '/models/account';

const pageStyles = css`
  .profile-form {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: var(--border1);
    border-radius: 5px;
    background-color: var(--color-background-secondary);
    box-shadow: var(--box-shadow1);
  }

  .profile-form label {
    display: block;
    margin-bottom: 8px;
    font-size: var(--font-size2);
    color: var(--color-gray3);
  }

  .profile-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid var(--color-gray1);
    border-radius: 4px;
    background-color: var(--color-white);
    color: var(--color-black);
    box-sizing: border-box;
  }

  .profile-form button {
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

  .profile-form button:hover {
    background-color: var(--color-accent2);
    color: var(--color-secondary);
  }

  .profile-form input:focus,
  .profile-form button:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

@customElement('edit-profile-view')
class EditProfileView extends App.View {
  @property()
  get profile() {
    return this.getFromModel<Profile>('profile');
  }

  @property()
  get profileForm() {
    const profileData = this.profile;
    return {
      firstName: profileData?.firstName || '',
      lastName: profileData?.lastName || '',
      email: profileData?.email || '',
    };
  }

  static styles = pageStyles;

  render() {
    if (this.profile === null) {
      Router.go('/login');
    }
    return html` <form
      class="profile-form"
      id="profile-form"
      @submit="${this.updateProfile}"
    >
      <label for="profile-first-name">First Name:</label>
      <input
        type="text"
        name="firstName"
        placeholder="Enter your First Name"
        @input="${this.handleInputChange}"
        value="${this.profileForm.firstName}"
        required
      />
      <br />
      <label for="profile-last-name">Last Name:</label>
      <input
        type="text"
        name="lastName"
        placeholder="Enter your Last Name"
        @input="${this.handleInputChange}"
        value="${this.profileForm.lastName}"
        required
      />
      <br />
      <label for="profile-email">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        @input="${this.handleInputChange}"
        value="${this.profileForm.email}"
        required
      />
      <br />
      <button type="submit">Save Changes</button>
    </form>`;
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.loginForm = { ...this.loginForm, [name]: value };
  }

  updateProfile(e) {
    e.preventDefault();

    this.dispatchMessage({
      type: 'ProfileUpdate',
      profileForm: this.profileForm,
    });

    Router.go('/account/');
  }
}
