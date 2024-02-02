import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import Session from '../assets/scripts/session';

function toggleDisplayMode(darkModeEnabled: boolean) {
  darkModeEnabled = !darkModeEnabled;
  const rootHTML = document.getElementsByTagName('html')[0];
  rootHTML.className = darkModeEnabled ? 'dark-mode' : 'light-mode';
  Session.setCookie('dark-mode', darkModeEnabled.toString(), 7);
}

interface UserData {
  name: string;
  email: string;
}

const displayPreferenceTemplate = (darkModeEnabled: boolean) => {
  const currentMode = darkModeEnabled ? 'dark' : 'light';
  const toggle = () => {
    toggleDisplayMode(darkModeEnabled);
    darkModeEnabled = !darkModeEnabled;
  };
  return html`
    <div class="toggle-container">
      <label class="toggle-switch" @change="${toggle}">
        <input type="checkbox" ?checked=${darkModeEnabled} />
        <span class="toggle-slider ${currentMode}">
          <span class="toggle-icon-light">🔆</span>
          <span class="toggle-icon-dark">&nbsp;🌙</span>
        </span>
      </label>
    </div>
  `;
};

const loggedInTemplate = (userData: UserData, darkModeEnabled: boolean) => {
  return html`
    <div class="user-badge">
      <div class="user-name">${userData.name}</div>
      <div class="user-email">${userData.email}</div>
    </div>
    <ul>
      <li><a href="/account/profile.html" class="user-option">Profile</a></li>
      <li><a href="/account/settings.html" class="user-option">Settings</a></li>
      <li><a href="/account/logout.html" class="user-option">Logout</a></li>
      ${displayPreferenceTemplate(darkModeEnabled)}
    </ul>
  `;
};

const userPanelTemplate = (darkModeEnabled: boolean, userData: UserData) => {
  if (userData) {
    return loggedInTemplate(userData, darkModeEnabled);
  }
  return html`
    <ul>
      <li><a href="/account/login.html" class="user-option">Login</a></li>
      <li>
        <a href="/account/sign_up.html" class="user-option">Sign&nbsp;Up</a>
      </li>
      ${displayPreferenceTemplate(darkModeEnabled)}
    </ul>
  `;
};

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

const getUserData = () => {
  if (Session.isLoggedIn()) {
    return {
      name: Session.getCookie('user-name'),
      email: Session.getCookie('user-email'),
    } as UserData;
  }
};

@customElement('user-panel')
class UserPanel extends LitElement {
  @property({ type: Object })
  userData?: UserData = getUserData();

  @property({ type: Boolean })
  darkModeEnabled = document
    .getElementsByTagName('html')[0]
    .classList.contains('dark-mode');

  render() {
    return userPanelTemplate(this.darkModeEnabled, this.userData);
  }

  static styles = userPanelStyles;
}
