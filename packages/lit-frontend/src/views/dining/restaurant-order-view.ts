import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Restaurant, RestaurantSearchProps } from 'thrill-map-models';

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

  .restaurant-name {
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
    color: var(--color-primary);
  }

  .menu-items {
    flex: 1;
    margin-right: 20px;
  }

  .order-summary {
    width: 300px;
    padding: 20px;
    background-color: var(--color-background-primary);
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    color: var(--color-primary);
  }

  .menu-item {
    border-bottom: 1px solid var(--color-gray1);
    padding: 10px 0;
  }

  .menu-item-name {
    color: var(--color-primary);
  }

  .menu-item-description {
    margin-bottom: 5px;
    color: var(--color-gray3);
  }

  .add-to-order {
    background-color: var(--color-accent1);
    color: var(--color-secondary);
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .add-to-order:hover {
    background-color: var(--color-accent2);
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

  .order-button {
    background-color: var(--color-accent3);
    color: var(--color-secondary);
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .order-button:hover {
    background-color: var(--color-accent4);
  }

  .button-icon {
    background-color: var(--color-accent1);
    color: var(--color-secondary);
    height: 20px;
    width: 20px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button-icon:hover {
    background-color: var(--color-accent2);
  }

  .order-qty {
    color: var(--color-primary);
  }
`;

@customElement('restaurant-order-view')
class RestaurantOrderView extends App.View {
  @property()
  get profile() {
    return this.getFromModel<Profile>('profile');
  }

  @property()
  get restaurantsList() {
    return this.getFromModel<Restaurant[]>('restaurants');
  }

  @property({ reflect: true })
  private orderItems: { [index: number]: number } = {};

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    if (this.profile === null) {
      Router.go('/account/login');
    }
    if (!this.restaurantsList || this.restaurantsList.length === 0) {
      Router.go('/dining');
    }
    const restaurant = this.restaurantsList[0];
    return html`
      <div class="order-container">
        <h1 class="restaurant-name">${restaurant.name}</h1>
        <div class="order-content">
          <div class="menu-items">
            ${restaurant.menu.map(
              (menuItem, index) => html`
                <div class="menu-item">
                  <div class="menu-item-name">
                    ${menuItem.item} - $${menuItem.price}
                  </div>
                  <div class="menu-item-description">
                    ${menuItem.description}
                  </div>
                  <div class="item-controls">
                    ${this.orderItems[index] > 0
                      ? html`
                          <button
                            class="button-icon"
                            @click="${() => this.removeItem(index)}"
                          >
                            -
                          </button>
                          <span class="order-qty"
                            >${this.orderItems[index]}</span
                          >
                          <button
                            class="button-icon"
                            @click="${() => this.addItem(index)}"
                          >
                            +
                          </button>
                        `
                      : html`
                          <button
                            class="add-to-order"
                            @click="${() => this.addItem(index)}"
                          >
                            Add
                          </button>
                        `}
                  </div>
                </div>
              `
            )}
          </div>
          <div class="order-summary">
            <h2>Your Order</h2>
            <div class="order-items">
              ${Object.keys(this.orderItems).map(
                index => html`
                  <div class="order-item">
                    <div>${restaurant.menu[Number(index)].item}</div>
                    <div>${this.orderItems[Number(index)]}</div>
                  </div>
                `
              )}
            </div>
            <div class="order-total">Total: $${this.getTotal().toFixed(2)}</div>
            <button class="order-button" @click="${this.placeOrder}">
              Place Order
            </button>
          </div>
        </div>
      </div>
    `;
  }

  static styles = pageStyles;

  addItem(index: number) {
    if (!this.orderItems[index]) {
      this.orderItems[index] = 0;
    }
    this.orderItems[index] = (this.orderItems[index] ?? 0) + 1;
    this.orderItems = {
      ...this.orderItems,
    };
  }

  removeItem(index: number) {
    if (this.orderItems[index] > 0) {
      this.orderItems[index]--;
    }
    this.orderItems = { ...this.orderItems };
  }

  placeOrder() {
    if (!this.restaurantsList || this.restaurantsList.length === 0) {
      return;
    }
    const restaurant = this.restaurantsList[0];
    const orderDetails = {
      restaurantId: restaurant.restaurantId,
      desc: `${restaurant.name}\n${this.getTotal()}`,
      items: this.getOrder(),
      total: this.getTotal(),
      status: 'Placed',
    };
    // ThrillMapAPI.createOrder(orderDetails);
    if (this.getOrder().length === 0) {
      return;
    }
    this.dispatchMessage({
      type: 'CreateOrder',
      orderDetails: orderDetails,
    });
    Router.go('/account/');
  }

  getOrder() {
    if (!this.restaurantsList || this.restaurantsList.length === 0) {
      return;
    }
    const restaurant = this.restaurantsList[0];
    return restaurant.menu
      .filter((menuItem, index) => this.orderItems[index] > 0)
      .map((menuItem, index) => {
        return {
          ...menuItem,
          quantity: this.orderItems[index],
        };
      });
  }

  getTotal() {
    if (!this.restaurantsList || this.restaurantsList.length === 0) {
      return 0;
    }
    const restaurant = this.restaurantsList[0];
    let total = 0;
    Object.keys(this.orderItems).forEach(item => {
      total += restaurant.menu[item].price * this.orderItems[item];
    });
    return total;
  }
}
