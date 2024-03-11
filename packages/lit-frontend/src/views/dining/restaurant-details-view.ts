import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '../../app';

import { Restaurant, RestaurantSearchProps, MenuItem, Profile } from 'thrill-map-models';
import { NavPages } from '../../assets/components/navbar';

const pageStyles = css`
  .restaurant {
    border: var(--border1);
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: var(--color-background-secondary);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .restaurant > .restaurant-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: min-content;
  }

  .restaurant-info > .restaurant-image {
    width: auto;
    height: min(60vh, 40vw);
    background-size: cover;
    background-position: center;
    border-radius: 8px;
  }

  .restaurant-info > .restaurant-name {
    color: var(--color-gray2);
  }

  .restaurant > .restaurant-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-background-primary);
    margin-inline-start: 20px;
    border-radius: 8px;
    height: 100%;
    border: 1px solid var(--color-gray1);
    overflow-y: auto;
    height: 72vh;
  }

  .restaurant-menu-title {
    color: var(--color-gray2);
  }

  .restaurant-menu-items {
    margin-inline: 20px;
    color: var(--color-gray2);
  }

  .restaurant-menu-item-title {
    font-weight: bold;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }

  .restaurant-menu-item-name {
    text-align: left;
    margin-block: 0.5em;
  }

  .restaurant-menu-item-price {
    text-align: center;
    margin-block: 0.5em;
  }

  .restaurant-menu-item-description {
    margin-block-start: 0;
  }

  .restaurant-menu hr {
    width: 95%;
  }

  .order-button-container {
    text-align: center;
    margin-top: 20px;
  }

  .order-button {
    display: inline-block;
    background-color: var(--color-accent1);
    color: var(--color-white);
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: var(--fot-size1);
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .order-button:hover {
    background-color: var(--color-accent2);
  }
`;

@customElement('restaurant-details-view')
class RestaurantDetailsView extends App.View {
  @property({ attribute: 'name', reflect: true })
  get name() {
    // @ts-ignore
    return this.location?.params.name || '';
  }

  @property({ type: Object }) 
  get profile() {
    return this.getFromModel<Profile>('profile');
  };

  @property({ type: Array })
  get restaurantsList() {
    return this.getFromModel<Restaurant[]>('restaurants');
  }

  connectedCallback() {
    super.connectedCallback();
    NavPages.setActive('/dining/');
    this.dispatchMessage({
      type: 'RestaurantFiltered',
      restaurantFilters: {
        name: this.name,
      } as RestaurantSearchProps,
    });
  }

  static styles = pageStyles;

  render() {
    if (!this.restaurantsList || this.restaurantsList.length === 0) {
      return html``;
    }
    const loggedIn = this.profile !== null;
    const restaurant = this.restaurantsList[0];
    let remainingItemCount = restaurant.menu.length;
    return html`<div class="restaurant">
      <div class="restaurant-info">
        <img
          src="${restaurant.imageURL}"
          alt="${restaurant.name}"
          class="restaurant-image"
        />
        <h1 class="restaurant-name">${restaurant.name}</h1>
      </div>
      <div class="restaurant-menu">
        <h2 class="restaurant-menu-title">Dining Menu</h2>
        <div class="restaurant-menu-items">
          ${restaurant.menu?.map((menuItem: MenuItem) => {
            return html` <div class="restaurant-menu-item">
              <div class="restaurant-menu-item-title">
                <h3 class="restaurant-menu-item-name">${menuItem.item}</h3>
                <p class="restaurant-menu-item-price">$${menuItem.price}</p>
              </div>
              <p class="restaurant-menu-item-description">
                ${menuItem.description}
              </p>
              ${remainingItemCount <= 1
                ? ''
                : html`<hr class="restaurant-menu-item-divider" />`}
            </div>`;
          })}
          ${loggedIn ? html` <div class="order-button-container">
            <a
              href="/dining/order/?name=${restaurant.name}"
              class="order-button"
              >Order Now</a
            >
          </div>` : ``}
        </div>
      </div>
    </div>`;
  }
}
