import {
  Ride,
  RideSearchProps,
  Event,
  EventSearchProps,
  Restaurant,
  RestaurantSearchProps,
  MenuItem,
  Order,
} from 'thrill-map-models';

const API_ROOT = 'http://localhost:3000/api';
const TOKEN_KEY = 'JWT_AUTH_TOKEN';

function getURLSearchParams<T extends object>(params: T): string {
  const filters: string[] = [];
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== undefined && value !== null) {
      filters.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });
  return filters.length ? `?${filters.join('&')}` : '';
}

export function getURLParams(): Record<string, string> {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};

  urlSearchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export class ThrillMapAPI {
  static async getRides(params: RideSearchProps) {
    const searchFilters = getURLSearchParams(params);
    const urlString = `${API_ROOT}/rides${searchFilters}`;
    const response = await fetch(urlString);
    const data = await response.json();
    return data.map((ride: any) => {
      return ride as Ride;
    });
  }

  static async getRestaurants(params: RestaurantSearchProps) {
    const restaurantFilters = getURLSearchParams(params);
    const urlString = `${API_ROOT}/dining${restaurantFilters}`;
    const response = await fetch(urlString);
    const data = await response.json();
    return data.map((restaurant: any) => {
      return {
        name: restaurant.name,
        description: restaurant.description,
        imageURL: restaurant.imageURL,
        type: restaurant.type,
        menu: restaurant.menu.map((menuItem: any) => menuItem as MenuItem),
      } as Restaurant;
    });
  }

  static async getEvents(params: EventSearchProps) {
    const eventFilters = getURLSearchParams(params);
    const urlString = `${API_ROOT}/events${eventFilters}`;
    const response = await fetch(urlString);
    const data = await response.json();
    return data.map((event: any) => {
      return event as Event;
    });
  }

  static async createOrder(order: Order) {
    const authKey = '';
    const response = await fetch(
      `${API_ROOT}/dining/orders/new?authKey=${authKey}`,
      {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await response.json();
  }
}
