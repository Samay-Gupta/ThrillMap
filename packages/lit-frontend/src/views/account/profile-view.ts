import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '../../app';
import { Router } from '@vaadin/router';
import { Order, Profile } from 'thrill-map-models';

const pageStyles = css`
  .profile-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    max-width: 75vw;
    margin: 2rem auto;
    padding: 20px;
    background-color: var(--color-background-secondary);
    color: var(--color-primary);
    border: var(--border1);
    box-shadow: var(--box-shadow1);
    border-radius: 10px;
  }

  .profile-image-container {
    max-width: 20vw;
    flex: 0 0 auto;
  }

  .profile-image {
    border-radius: 50%;
    width: 80%;
    height: auto;
    object-fit: cover;
  }

  .profile-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    padding-left: 1vw;
    align-items: center;
  }

  .profile-name {
    font-size: var(--font-size5);
    color: var(--color-primary);
    margin-bottom: 0.1rem;
  }

  .profile-email {
    font-size: var(--font-size3);
    color: var(--color-gray2);
  }

  .orders-section {
    width: 75vw;
    max-width: 50vw;
    margin: 2rem auto;
    padding: 20px;
    background-color: var(--color-background-secondary);
    color: var(--color-primary);
    border: var(--border1);
    box-shadow: var(--box-shadow1);
    border-radius: 10px;
    min-height: 20vh;
    overflow: hidden;
  }

  .order-item {
    background-color: var(--color-background-primary);
    color: var(--color-primary);
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    width: 70vw;
  }

  .order-title {
    font-size: var(--font-size5);
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
`;

@customElement('profile-view')
class ProfileView extends App.View {
  @property({ type: Object })
  get profile() {
    return this.getFromModel<Profile>('profile');
  }

  static styles = pageStyles;

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage({
      type: 'RefreshProfile',
    });
  }

  render() {
    if (this.profile === null) {
      Router.go('/login');
    }
    return html` <div
        class="profile-container"
        @click="${this.navigateToEditPage}"
      >
        <div class="profile-image-container">
          <img
            src="${this.profile.profileImageURL}"
            alt="Profile Image"
            class="profile-image"
          />
        </div>
        <div class="profile-details">
          <div class="profile-name">
            ${this.profile.firstName} ${this.profile.lastName}
          </div>
          <div class="profile-email">${this.profile.email}</div>
        </div>
      </div>
      <div class="orders-section">
        <div class="order-title">Your Orders</div>
        ${this.getOrdersContent()}
      </div>`;
  }

  navigateToEditPage() {
    Router.go('/account/edit/');
  }

  getOrdersContent() {
    if (!this.profile) {
      return html``;
    }
    if (!this.profile.orders || this.profile.orders.length === 0) {
      return html`<div>No orders found</div>`;
    }
    return this.profile.orders.map(orderString => {
      const order = JSON.parse(orderString) as Order;
      return html`
        <app-card
          href="/dining/order/${order.orderId}/"
          cardHeight="10vh"
          cardTitle="${order.desc}"
          cardBackground="var(--color-background-primary)"
          cardTextColor="var(--color-primary)"
          style="width: 50vw;"
        ></app-card>
      `;
    });
  }
}
