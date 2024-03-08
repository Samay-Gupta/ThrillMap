import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Profile } from 'thrill-map-models';

import * as App from '../../app';
import { Router } from '@vaadin/router';
import { PROFILE_KEY } from '../../config/constants';

const userPanelStyles = css`
  :host {
    display: block;
  }
  ul {
    padding: 0;
    list-style: none;
    margin: 0;
    width: 100%;
    min-width: 7.5vw;
  }
  li {
    margin: 0;
    list-style-type: none;
  }
  a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: var(--color-gray3);
    width: 100%;
    box-sizing: border-box;
    background-color: var(--color-background-primary);
  }
  .user-option:hover,
  a:hover {
    background-color: var(--color-background-secondary);
    width: 100%;
    color: var(--color-primary);
  }
  .user-badge {
    padding: 10px;
    color: var(--color-gray2);
    text-align: left;
  }
  .user-name {
    font-size: var(--font-size2);
    font-weight: bold;
  }
  .user-email {
    font-size: var(--font-size1);
    color: var(--color-gray3);
    margin-top: 4px;
  }

  .toggle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-background-primary);
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 58px;
    height: 32px;
    margin: 2px;
  }

  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    display: flex;
    align-items: center;
    padding: 0 5px;
  }

  .toggle-slider.light {
    justify-content: 'flex-end';
  }

  .toggle-slider.dark {
    justify-content: 'flex-start';
  }

  .toggle-icon {
    display: none;
  }

  .toggle-icon-light,
  .toggle-icon.dark {
    display: block;
  }

  .toggle-slider:before {
    position: absolute;
    content: '';
    height: 24px;
    width: 24px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .toggle-slider {
    background-color: #2196f3;
  }

  input:focus + .toggle-slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .toggle-slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

@customElement('user-panel')
class UserPanel extends App.View {
  @property()
  get profile() {
    return this.getFromModel<Profile>('profile');
  }

  @property({ type: Object })
  preferences = JSON.parse(localStorage.getItem('preferences') ?? '{}');

  render() {
    if (this.profile != null) {
      return html`
        <div class="user-badge">
          <div class="user-name">
            ${this.profile.firstName}&nbsp;${this.profile.lastName}
          </div>
          <div class="user-email">${this.profile.email}</div>
        </div>
        <ul>
          <li><a href="/account/" class="user-option">Profile</a></li>
          <li>
            <a href="/account/settings/" class="user-option">Settings</a>
          </li>
          <li>
            <a role="button" class="user-option" @click="${this.logoutUser}"
              >Logout</a
            >
          </li>
          ${this.renderPreferences()}
        </ul>
      `;
    }
    return html`
      <ul>
        <li><a href="/account/login/" class="user-option">Login</a></li>
        <li>
          <a href="/account/signup/" class="user-option">Sign&nbsp;Up</a>
        </li>
        ${this.renderPreferences()}
      </ul>
    `;
  }

  renderPreferences() {
    return html`
      <div class="toggle-container">
        <label class="toggle-switch" @change="${this.toggleDarkMode}">
          <input type="checkbox" ?checked=${this.preferences.darkMode} />
          <span class="toggle-slider">
            <span class="toggle-icon-light">🔆</span>
            <span class="toggle-icon-dark">&nbsp;🌙</span>
          </span>
        </label>
      </div>
    `;
  }

  toggleDarkMode() {
    this.preferences = {
      ...this.preferences,
      darkMode: !this.preferences.darkMode,
    };
    (document.querySelector('html') as HTMLHtmlElement).className = this
      .preferences.darkMode
      ? 'dark-mode'
      : 'light-mode';
    localStorage.setItem('preferences', JSON.stringify(this.preferences));
  }

  logoutUser() {
    this.dispatchMessage({ type: 'LogoutUser' });
    localStorage.removeItem(PROFILE_KEY);
    Router.go('/');
  }

  static styles = userPanelStyles;
}
