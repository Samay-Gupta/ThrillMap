import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import Session from '../assets/scripts/session';

import Profile from '/data/models/profile';

const displayPreferenceTemplate = (instance: UserPanel, preferences: any) => {
  const toggle = () => {
    preferences.darkMode = !preferences.darkMode;
    (document.querySelector('html') as HTMLElement).className =
      preferences.darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('preferences', JSON.stringify(preferences));
    instance.requestUpdate();
  };
  return html`
    <div class="toggle-container">
      <label class="toggle-switch" @change="${toggle}">
        <input type="checkbox" ?checked=${preferences.darkMode} />
        <span class="toggle-slider">
          <span class="toggle-icon-light">🔆</span>
          <span class="toggle-icon-dark">&nbsp;🌙</span>
        </span>
      </label>
    </div>
  `;
};

const userPanelTemplate = (
  instance: UserPanel,
  profile: Profile,
  preferences: any
) => {
  if (Session.isLoggedIn()) {
    return html`
      <div class="user-badge">
        <div class="user-name">
          ${profile.firstName}&nbsp;${profile.lastName}
        </div>
        <div class="user-email">${profile.email}</div>
      </div>
      <ul>
        <li><a href="/account/profile.html" class="user-option">Profile</a></li>
        <li>
          <a href="/account/settings.html" class="user-option">Settings</a>
        </li>
        <li>
          <a href="/account/profile.html?logout=true" class="user-option"
            >Logout</a
          >
        </li>
        ${displayPreferenceTemplate(instance, preferences)}
      </ul>
    `;
  }
  return html`
    <ul>
      <li><a href="/account/login.html" class="user-option">Login</a></li>
      <li>
        <a href="/account/sign_up.html" class="user-option">Sign&nbsp;Up</a>
      </li>
      ${displayPreferenceTemplate(instance, preferences)}
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

@customElement('user-panel')
class UserPanel extends LitElement {
  @property({ type: Object })
  profile?: profile = JSON.parse(
    localStorage.getItem('user') ?? '{}'
  ) as Profile;

  @property({ type: Object })
  preferences = JSON.parse(localStorage.getItem('preferences') ?? '{}');

  render() {
    return userPanelTemplate(this, this.profile, this.preferences);
  }

  static styles = userPanelStyles;
}
