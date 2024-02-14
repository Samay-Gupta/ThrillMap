import Session from '/assets/scripts/session';
import { ThrillMapAPI, getURLParams } from '../api';
import { Order } from '/data/models/Order';
import '/components/card';

function loadPage() {
  const params = getURLParams();
  if (!Session.isLoggedIn()) {
    window.location.href = '/login';
  }
  if (params.logout) {
    Session.logoutUser();
    window.location.href = '/';
  }
  ThrillMapAPI.getProfile().then(profile => {
    const container = document.getElementById('profile-container') as HTMLElement;

    const orders = profile.orders.map((order: any) => order);
    const ordersContent = profile.orders.length > 0
      ? orders.map(order => {
        order = JSON.parse(order) as Order;
        return `
          <app-card
            href="/dining/"
            cardHeight="10vh"
            cardTitle="${order.desc}"
            cardBackground="var(--color-background-primary)"
            cardTextColor="var(--color-primary)"
          ></app-card>
        `
    }).join('')
      : '<div>No orders found</div>';

    const profileHTML = `
    <div class="profile-container" onclick="window.location.href='/account/edit-profile.html';">
      <div class="profile-image-container">
        <img src="${profile.profileImageURL}" alt="Profile Image" class="profile-image">
      </div>
      <div class="profile-details">
        <div class="profile-name">${profile.firstName} ${profile.lastName}</div>
        <div class="profile-email">${profile.email}</div>
      </div>
    </div>
    <div class="orders-section">
      <div class="order-title">Your Orders</div>
      ${ordersContent}
    </div>
    `;

    container.innerHTML = profileHTML;
  });
}

loadPage();
