import { ThrillMapAPI, getURLParams } from '/assets/scripts/api';
import { Restaurant, MenuItem } from '/data/models/restaurant';
import Session from '/assets/scripts/session';

function createDiningDetails(restaurant: Restaurant) {
  const diningContainer = document.getElementById(
    'dining-container'
  ) as HTMLElement;
  let remainingItemCount = restaurant.menu.length;
  diningContainer.innerHTML = `
    <div class="restaurant">
      <div class="restaurant-info">
        <img src="${restaurant.imageURL}" alt="${restaurant.name}" class="restaurant-image"/>
        <h1 class="restaurant-name">
          ${restaurant.name} 
        </h1>
      </div>
      <div class="restaurant-menu">
        <h2 class="restaurant-menu-title">Dining Menu</h2>
        <div class="restaurant-menu-items">
          ${restaurant.menu
            .map((menuItem: MenuItem) => {
              return `
              <div class="restaurant-menu-item">
                <div class="restaurant-menu-item-title">
                  <h3 class="restaurant-menu-item-name">${menuItem.item}</h3>
                  <p class="restaurant-menu-item-price">$${menuItem.price}</p>
                </div>
                <p class="restaurant-menu-item-description">${menuItem.description}</p>
                ${remainingItemCount <= 1 ? '' : `<hr class="restaurant-menu-item-divider"/>`}
              </div>`;
            })
            .join('')}
          ${
            Session.isLoggedIn()
              ? `
            <div class="order-button-container">
                <a href="/dining/order.html?name=${encodeURIComponent(restaurant.name)}" class="order-button">Order Now</a>
            </div>`
              : ''
          }
        </div>
      </div
    </div>
  `;
}

function loadPage() {
  const params = getURLParams();

  ThrillMapAPI.getRestaurants(params).then((restaurantList: [Restaurant]) => {
    if (!restaurantList) {
      return (window.location.href = '/dining/');
    }
    const restaurant = restaurantList[0];
    createDiningDetails(restaurant);
  });
}

loadPage();
