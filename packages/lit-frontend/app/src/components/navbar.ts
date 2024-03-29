import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './drop-down';
import './user-panel';

const getNavElement = (name, href, activePath) => {
  let navbarClass = href === activePath ? 'navbar-item-active' : 'navbar-item';
  return html`<a href="${href}" class="${navbarClass}">${name}</a>`;
};

const navbarTemplate = (navPages, activePath) => {
  const profileIcon = html`<svg class="profile-icon">
    <use href="/assets/icons/icons.svg#icon-profile" />
  </svg>`;
  return html`
    <div class="navbar">
      <div>
        ${navPages.map(([name, href]) => getNavElement(name, href, activePath))}
      </div>
      <drop-down class="profile-dropdown">
        <div>${profileIcon}</div>
        <user-panel slot="menu"></user-panel>
      </drop-down>
    </div>
  `;
};

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
    background: none;
    -webkit-filter: var(--invert); /* safari 6.0 - 9.0 */
    filter: var(--invert);
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
class Navbar extends LitElement {
  navPages = [
    ['Home', '/'],
    ['Rides', '/rides/'],
    ['Dining', '/dining/'],
    ['Events', '/events/'],
    ['Park Map', '/map/'],
  ];

  activePath = getPath(this.navPages);

  render() {
    return navbarTemplate(this.navPages, this.activePath);
  }

  static styles = navbarStyles;
}
