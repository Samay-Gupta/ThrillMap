import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Session from '/assets/scripts/session';
import { Restaurant } from '/assets/scripts/restaurant';
import { ThrillMapAPI } from '../assets/scripts/api';

const orderTemplate = (
  restaurant: Restaurant,
  orderItems: { [index: number]: number },
  instance: RestaurantOrder
) => {
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
                <div class="menu-item-description">${menuItem.description}</div>
                <div class="item-controls">
                  ${orderItems[index] > 0
                    ? html`
                        <button
                          class="button-icon"
                          @click="${() => instance.removeItem(index)}"
                        >
                          -
                        </button>
                        <span class="order-qty">${orderItems[index]}</span>
                        <button
                          class="button-icon"
                          @click="${() => instance.addItem(index)}"
                        >
                          +
                        </button>
                      `
                    : html`
                        <button
                          class="add-to-order"
                          @click="${() => instance.addItem(index)}"
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
            ${instance.getOrder().map(
              (menuItem, index) => html`
                <div class="order-item">
                  <div>${menuItem.item}</div>
                  <div>${instance.getQuantity(index)}</div>
                </div>
              `
            )}
          </div>
          <div class="order-total">
            Total: $${instance.getTotal().toFixed(2)}
          </div>
          <button class="order-button" @click="${instance.placeOrder}">
            Place Order
          </button>
        </div>
      </div>
    </div>
  `;
};

const orderStyles = css`
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

@customElement('restaurant-order')
class RestaurantOrder extends LitElement {
  @property({ type: Object })
  restaurant: Restaurant = {
    name: '',
    menu: [],
  };

  @property()
  private orderItems: { [index: number]: number } = {};

  @property()
  private refreshCount = 0;

  render() {
    if (!Session.isLoggedIn()) {
      window.location.href = '/login/';
    }
    return orderTemplate(this.restaurant, this.orderItems, this);
  }

  static styles = orderStyles;

  addItem(index: number) {
    if (!this.orderItems[index]) {
      this.orderItems[index] = 0;
    }
    this.orderItems[index]++;
    this.refreshCount++;
  }

  removeItem(index: number) {
    if (this.orderItems[index] > 0) {
      this.orderItems[index]--;
    }
    this.refreshCount++;
  }

  placeOrder() {
    const orderDetails = {
      restaurant: this.restaurant.name,
      desc: this.restaurant.name,
      items: this.getOrder(),
      total: this.getTotal(),
      status: "Placed"
    };
    ThrillMapAPI.createOrder(orderDetails);
    alert('Order placed!');
  }

  getOrder() {
    return this.restaurant.menu.filter(
      (menuItem, index) => this.orderItems[index] > 0
    );
  }

  getTotal() {
    let total = 0;
    Object.keys(this.orderItems).forEach(item => {
      total += this.restaurant.menu[item].price * this.orderItems[item];
    });
    return total;
  }

  getQuantity(index: number) {
    return this.orderItems[index];
  }
}
