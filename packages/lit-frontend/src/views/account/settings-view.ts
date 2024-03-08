import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '/app';

const settingsStyles = css`
  .settings-form {
    max-width: 60vw;
    margin: 50px auto;
    padding: 20px;
    border: var(--border1);
    border-radius: 5px;
    background-color: var(--color-background-secondary);
    box-shadow: var(--box-shadow1);
    transition: var(--transition-focus);
  }

  .settings-form label {
    display: block;
    margin-bottom: 8px;
    font-size: var(--font-size2);
    color: var(--color-gray3);
  }

  .settings-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid var(--color-gray1);
    border-radius: 4px;
    background-color: var(--color-white);
    color: var(--color-black);
    box-sizing: border-box;
  }

  .settings-form button,
  .change-password-btn {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: var(--color-accent1);
    color: var(--color-white);
    cursor: pointer;
    font-size: var(--font-size2);
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .settings-form button:hover,
  .change-password-btn:hover {
    background-color: var(--color-accent2);
    color: var(--color-secondary);
  }

  .settings-form input:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .password-form {
    margin-top: 20px;
  }
`;

@customElement('settings-view')
class SettingsView extends App.View {
  @property({})
  showPasswordChangeForm = false;

  @property({})
  passwordChangeForm = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  static styles = settingsStyles;

  render() {
    return html`
      <div class="settings-form">
        ${this.showPasswordChangeForm
          ? html`
              <form class="password-form" @submit="${this.changePassword}">
                <label for="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  .value="${this.passwordChangeForm.currentPassword}"
                  @input="${this.updatePasswordForm}"
                />
                <label for="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  .value="${this.passwordChangeForm.newPassword}"
                  @input="${this.updatePasswordForm}"
                />
                <label for="confirmNewPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  .value="${this.passwordChangeForm.confirmNewPassword}"
                  @input="${this.updatePasswordForm}"
                />
                <button type="submit">Change Password</button>
              </form>
            `
          : html` <button
              class="change-password-btn"
              @click="${this.togglePasswordChangeForm}"
            >
              Change Password
            </button>`}
      </div>
    `;
  }

  togglePasswordChangeForm() {
    this.showPasswordChangeForm = !this.showPasswordChangeForm;
  }

  updatePasswordForm(e) {
    this.passwordChangeForm = {
      ...this.passwordChangeForm,
      [e.target.name]: e.target.value,
    };
  }

  changePassword(e) {
    e.preventDefault();
  }
}
