import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Restaurant,
  Order,
  OrderSearchProps,
  RestaurantSearchProps,
  MenuItem,
} from 'thrill-map-models';

import * as App from '/app';
import { Router } from '@vaadin/router';

const pageStyles = css`
  .order-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    min-width: 80vw;
    margin: 20px auto;
    border: 1px solid var(--color-gray1);
    border-radius: 8px;
    background-color: var(--color-background-secondary);
    box-shadow: var(--box-shadow1);
    min-height: 70vh;
  }

  .order-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .order-details {
    background-color: var(--color-background-primary);
    border: var(--border2);
    border-radius: 8px;
    box-shadow: var(--box-shadow1);
    padding: 20px;
    flex: 1;
    margin-right: 20px;
  }

  .order-details h2 {
    color: var(--color-primary);
    margin-bottom: 15px;
  }

  .order-details div {
    margin-bottom: 10px;
    font-size: var(--font-size2);
    color: var(--color-primary);
  }

  .order-details div span {
    font-weight: bold;
  }

  .restaurant-name {
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
    color: var(--color-primary);
  }

  .order-summary {
    width: 300px;
    padding: 20px;
    background-color: var(--color-background-primary);
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    color: var(--color-primary);
    min-height: 50vh;
    border: var(--border1);
  }

  .order-items {
    overflow-y: auto;
    margin-bottom: 20px;
  }

  .order-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: var(--color-gray3);
  }

  .order-total {
    font-weight: bold;
    margin-top: auto;
    color: var(--color-gray2);
  }

  .order-button:hover {
    background-color: var(--color-accent4);
  }

  .order-qty {
    color: var(--color-primary);
  }
`;

@customElement('restaurant-order-details-view')
class RestaurantOrderDetailsView extends App.View {
  @property({ attribute: 'orderId', reflect: true })
  get orderId() {
    return this.location?.params.orderId || '';
  }

  @property()
  get profile() {
    return this.getFromModel<Profile>('profile');
  }

  @property()
  get orderList() {
    return this.getFromModel<Order[]>('orders');
  }

  @property()
  get restaurantList() {
    return this.getFromModel<Restaurant[]>('restaurants');
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage({
      type: 'FilterRestaurant',
      restaurantFilters: {} as RestaurantSearchProps,
    });
    this.dispatchMessage({
      type: 'OrderFiltered',
      orderFilters: {
        orderId: this.orderId,
      } as OrderSearchProps,
    });
  }

  render() {
    if (this.profile === null) {
      Router.go('/account/login');
    }
    if (!this.orderList || this.orderList.length === 0) {
      return html``;
    }
    if (!this.restaurantList || this.restaurantList.length === 0) {
      return html``;
    }
    const order = this.orderList[0];
    if (!order) {
      return html``;
    }
    const restaurant = this.restaurantList.filter(
      rest => rest.restaurantId === order.restaurantId
    )[0];
    if (!restaurant) {
      return html``;
    }
    const dateTime = new Date(order.date);
    const orderDateString = dateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const orderTimeString = dateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return html`
      <div class="order-container">
        <h1 class="restaurant-name">${restaurant.name}</h1>
        <div class="order-content">
          <div class="order-details">
            <h2>Order Details</h2>
            <div><span>Order Date:</span> ${orderDateString}</div>
            <div><span>Order Time:</span> ${orderTimeString}</div>
            <div><span>Order Status:</span> ${order.status}</div>
          </div>
          <div class="order-summary">
            <h2>Your Order</h2>
            <div class="order-items">
              ${order.items.map(
                item => html`
                  <div class="order-item">
                    <div>${item.item} x${item.quantity}</div>
                    <div>$${item.quantity * item.price}</div>
                  </div>
                `
              )}
            </div>
            <div class="order-total">Total: $${order.total}</div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = pageStyles;
}
