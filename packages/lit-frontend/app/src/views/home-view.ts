import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '/components/card';

const pageHtml = html`
  <div class="navigation-cards">
    <app-card
      href="/rides/"
      cardTitle="🎢 Rides"
      cardContent="Discover thrilling rides, roller coasters, and family-friendly attractions."
      cardBackground="var(--color-accent1)"
      cardTextColor="var(--color-white)"
    >
    </app-card>
    <app-card
      href="/dining/"
      cardTitle="🍴 Dining"
      cardContent="Enjoy a variety of dining options, from fast food to fine dining."
      cardBackground="var(--color-accent2)"
      cardTextColor="var(--color-white)"
    >
    </app-card>
    <app-card
      href="/events/"
      cardTitle="📅 Events"
      cardContent="Join us for exciting events, shows, and seasonal celebrations."
      cardBackground="var(--color-accent3)"
      cardTextColor="var(--color-white)"
    >
    </app-card>
    <app-card
      href="/map/"
      cardTitle="🏞️ Park Map"
      cardContent="Take a look at the entire park at a glance."
      cardBackground="var(--color-accent4)"
      cardTextColor="var(--color-white)"
    >
    </app-card>
  </div>
`;

const pageStyles = css`
  .navigation-cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .navigation-cards > app-card {
    width: 60vw;
  }
`;

@customElement('home-view')
class HomeView extends LitElement {
  static styles = pageStyles;

  render() {
    return pageHtml;
  }
}
