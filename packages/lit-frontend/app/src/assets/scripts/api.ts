import { Ride } from '/data/models/ride';
import { Restaurant, MenuItem } from '/data/models/restaurant';
import { Profile } from '/data/models/profile';
import { Event } from '/data/models/event';
import Session from '/assets/scripts/session';
import { Order } from '/data/models/Order';

const API_ROOT = 'http://localhost:3000/api';

export function getURLParams(): Record<string, string> {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};

  urlSearchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export class ThrillMapAPI {
  static async getRides(params: Record<string, string>) {
    const rideFilters: string[] = [];
    if (params.name) {
      rideFilters.push(`name=${params.name}`);
    }
    if (params.category) {
      rideFilters.push(`category=${params.category}`);
    }
    const rideFiltersString = rideFilters ? '?' + rideFilters.join('&') : '';
    const urlString = `${API_ROOT}/rides${rideFiltersString}`;
    const response = await fetch(urlString);
    const data = await response.json();
    return data.map((ride: any) => {
      return ride as Ride;
    });
  }

  static async getRestaurants(params: Record<string, string>) {
    const restaurantFilters: string[] = [];
    if (params.name) {
      restaurantFilters.push(`name=${params.name}`);
    }
    const restaurantFiltersString = restaurantFilters
      ? '?' + restaurantFilters.join('&')
      : '';
    const urlString = `${API_ROOT}/dining${restaurantFiltersString}`;
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

  static async getOrder(orderId: string) {
    const urlString = `${API_ROOT}/dining/orders/get?orderId=${orderId}`;
    const response = await fetch(urlString);
    return response.json() as Order;
  }

  static async getEvents(params: Record<string, string>) {
    const eventFilters: string[] = [];
    if (params.name) {
      eventFilters.push(`name=${params.name}`);
    }
    const eventFiltersString = eventFilters ? '?' + eventFilters.join('&') : '';
    const urlString = `${API_ROOT}/events${eventFiltersString}`;
    const response = await fetch(urlString);
    const data = await response.json();
    return data.map((event: any) => {
      return {
        name: event.name,
        description: event.description,
        date: event.date,
        location: event.location,
        imageURL: event.imageURL,
      } as Event;
    });
  }

  static async loginUser(loginDetails: Record<string, string>) {
    const response = await fetch(`${API_ROOT}/profile/login`, {
      method: 'POST',
      body: JSON.stringify(loginDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  static async getProfile() {
    const authKey = Session.getCookie('authKey');
    const response = await fetch(`${API_ROOT}/profile/get?authKey=${authKey}`);
    return response.json() as Profile;
  }

  static async updateProfile(profile: Partial<Profile>) {
    const authKey = Session.getCookie('authKey');
    const response = await fetch(`${API_ROOT}/profile/edit?authKey=${authKey}`, {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify({
        ...JSON.parse(localStorage.getItem('user') as string),
        ...profile
      }));
    }
  }

  static async createOrder(order: Order) {
    const authKey = Session.getCookie('authKey');
    const response = await fetch(`${API_ROOT}/dining/orders/new?authKey=${authKey}`, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
}
