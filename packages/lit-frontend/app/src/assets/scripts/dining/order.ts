import { ThrillMapAPI, getURLParams } from '/assets/scripts/api';
import { Restaurant } from '/data/models/restaurant';
import RestaurantOrder from '/components/restaurant-order';

function loadPage() {
  const params = getURLParams();

  ThrillMapAPI.getRestaurants(params).then((restaurantList: [Restaurant]) => {
    if (!restaurantList) {
      return (window.location.href = '/dining/');
    }
    const restaurant = restaurantList[0];
    const element = document.querySelector(
      'restaurant-order'
    ) as RestaurantOrder;
    element.restaurant = restaurant;
  });
}

loadPage();
