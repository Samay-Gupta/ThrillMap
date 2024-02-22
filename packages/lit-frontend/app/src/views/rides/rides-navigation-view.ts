import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import * as App from '/app';

const pageHtml = html`
  <div class="ride-category-container">
    <app-card
      href="/rides/list/thrill/"
      cardHeight="70vh"
      cardTitle="Thrill Rides"
      cardContent="Exciting rides with high speeds and steep drops."
      cardImage="/assets/images/thrill_rides.png"
      cardBackground="var(--color-accent1)"
      cardTextColor="var(--color-white)"
    >
    </app-card>
    <app-card
      href="/rides/list/water/"
      cardHeight="70vh"
      cardTitle="Water Rides"
      cardContent="Refreshing aquatic adventures for all ages."
      cardImage="/assets/images/water_rides.png"
      cardBackground="var(--color-accent2)"
      cardTextColor="var(--color-white)"
    >
    </app-card>
    <app-card
      href="/rides/list/family/"
      cardHeight="70vh"
      cardTitle="Family Rides"
      cardContent="Enjoyable rides perfect for family fun."
      cardImage="/assets/images/family_rides.png"
      cardBackground="var(--color-accent3)"
      cardTextColor="var(--color-white)"
    >
    </app-card>
  </div>

  <div class="rides-link">
    <a href="/rides/list/" class="view-all-link">View All Rides</a>
  </div>
`;

const pageStyles = css`
  .ride-category-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    font-size: var(--font-size2);
  }

  .ride-category-container > app-card {
    flex: 0 1 calc(33% - 10px);
  }

  .rides-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .rides-link > .view-all-link {
    background-color: var(--color-accent4);
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

  .rides-link > .view-all-link:hover {
    transform: var(--transition-hover);
    box-shadow: var(--box-shadow2);
  }
`;

@customElement('rides-navigation-view')
class RidesNavigationView extends App.View {
  static styles = pageStyles;

  render() {
    return pageHtml;
  }
}
