import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { NavPages } from '../../assets/components/navbar';

import * as App from '../../app';

const pageHtml = html` <img
    src="/assets/images/park_map.png"
    alt="Park Map"
    class="park-map"
  />
  <ul class="nav-list">
    <li class="nav-item">
      <a class="nav-link bg-accent1" href="/rides/"
        >🎢&nbsp;&nbsp;&nbsp;Rides</a
      >
    </li>
    <li class="nav-item">
      <a class="nav-link bg-accent2" href="/dining/"
        >🍴&nbsp;&nbsp;&nbsp;Dining</a
      >
    </li>
    <li class="nav-item">
      <a class="nav-link bg-accent3" href="/events/"
        >📅&nbsp;&nbsp;&nbsp;Events</a
      >
    </li>
  </ul>`;

const pageStyles = css`
  .nav-list {
    list-style: none;
    padding: 0;
    text-align: center;
  }

  .nav-item {
    display: inline-block;
    margin: 0 20px;
  }

  .nav-link {
    display: inline-block;
    font-size: var(--font-size2);
    padding: 12px 24px;
    text-decoration: none;
    color: var(--color-white);
    font-weight: 700;
    border-radius: 8px;
    margin: 0 10px;
    transition: var(--transition-focus);
    box-shadow: var(--box-shadow1);
  }

  .nav-link:hover {
    transform: var(--transition-hover);
    box-shadow: var(--box-shadow2);
  }

  .park-map {
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 0 10px;
    transition: var(--transition-focus);
    box-shadow: var(--box-shadow1);
    max-height: 60vh;
  }

  .bg-accent1 {
    background-color: var(--color-accent1);
  }

  .bg-accent2 {
    background-color: var(--color-accent2);
  }

  .bg-accent3 {
    background-color: var(--color-accent3);
  }

  .bg-accent4 {
    background-color: var(--color-accent4);
  }
`;

@customElement('park-map-view')
class ParkMapView extends App.View {
  static styles = pageStyles;

  connectedCallback(): void {
    super.connectedCallback();
    NavPages.setActive('/map/');
  }

  render() {
    return pageHtml;
  }
}
