import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as App from '../../app';
import './drop-down';
import './user-panel';
import { Profile } from 'thrill-map-models';

const navbarStyles = css`
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    height: 64px;
    width: 100%;
    background-color: var(--color-secondary);
    padding: 2px;
    box-shadow: var(--box-shadow2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .navbar .navbar-icon {
    margin: 2px;
    max-height: 60px;
    max-width: 60px;
    margin: 0 32px;
  }

  .navbar .navbar-item {
    color: #5e5e5e;
    font-size: 1.2em;
    text-decoration: none;
    margin: 0 32px;
  }

  .navbar .navbar-item:hover {
    color: #5e5e5e;
    text-decoration: underline;
  }

  .navbar .navbar-item-active {
    color: var(--color-primary);
    font-weight: 700;
    font-size: 1.2em;
    text-decoration: none;
    margin: 0 32px;
  }

  .profile-dropdown {
    padding-top: 6px;
    margin: 0 32px;
  }

  .profile-dropdown > div {
    display: flex;
    align-items: center;
  }

  .profile-icon {
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: none;
    -webkit-filter: var(--invert); /* safari 6.0 - 9.0 */
    filter: var(--invert);
  }

  .profile-image {
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;

const getPath = navPages => {
  const urlPath = window.location.pathname;
  let path = '/';
  navPages.forEach(([name, href]) => {
    if (urlPath.startsWith(href)) {
      path = href;
    }
  });
  return path;
};

@customElement('app-navbar')
class Navbar extends App.View {
  navPages = [
    ['Home', '/'],
    ['Rides', '/rides/'],
    ['Dining', '/dining/'],
    ['Events', '/events/'],
    ['Park Map', '/map/'],
  ];

  @property({ type: Object })
  get profile() {
    return this.getFromModel<Profile>('profile');
  }

  @property({ type: String })
  activePath = getPath(this.navPages);

  render() {
    const profileIcon =
      this.profile !== null
        ? html`
            <img
              class="profile-image"
              src="${this.profile.profileImageURL}"
              alt="Profile Image"
            />
          `
        : html`
            <svg class="profile-icon">
              <use href="/assets/icons/icons.svg#icon-profile" />
            </svg>
          `;
    return html`
      <div class="navbar">
        <div>
          ${this.navPages.map(([name, href]) =>
            this.getNavElement(name, href, this.activePath)
          )}
        </div>
        <drop-down class="profile-dropdown">
          <div>${profileIcon}</div>
          <user-panel slot="menu"></user-panel>
        </drop-down>
      </div>
    `;
  }

  getNavElement(name: string, href: string, activePath: string) {
    let navbarClass =
      href === activePath ? 'navbar-item-active' : 'navbar-item';
    return html`<a href="${href}" class="${navbarClass}">${name}</a>`;
  }

  static styles = navbarStyles;
}
