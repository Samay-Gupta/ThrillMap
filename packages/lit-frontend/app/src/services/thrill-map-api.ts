import {
  Ride,
  RideSearchProps,
  Event,
  EventSearchProps,
  Restaurant,
  RestaurantSearchProps,
  MenuItem,
  Order,
  Profile
} from 'thrill-map-models';
import { LoginForm, SignUpForm } from 'thrill-map-models';

import { AUTH_TOKEN_KEY, API_ROOT } from '/config/constants';

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
  static getRequestHeaders(): Record<string, string> {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return {
      'Content-Type': 'application/json',
      Authorization: authToken,
    };
  }

  static async getRides(params: RideSearchProps): Promise<Ride[]> {
    const searchFilters = getURLSearchParams(params);
    const urlString = `${API_ROOT}/rides${searchFilters}`;
    const response = await fetch(urlString);
    const data = await response.json();
    return data.map((ride: any) => {
      return ride as Ride;
    });
  }

  static async getRestaurants(params: RestaurantSearchProps): Promise<Restaurant[]> {
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

  static async getEvents(params: EventSearchProps): Promise<Event[]> {
    const eventFilters = getURLSearchParams(params);
    const urlString = `${API_ROOT}/events${eventFilters}`;
    const response = await fetch(urlString);
    const data = await response.json();
    return data.map((event: any) => {
      return event as Event;
    });
  }

  static async loginUser(loginForm: LoginForm): Promise<Profile | null> {
    const response = await fetch(`${API_ROOT}/account/login`, {
      method: 'POST',
      body: JSON.stringify(loginForm),
      headers: ThrillMapAPI.getRequestHeaders(),
    });
    let userProfile: Profile | null = null;
    if (response.status === 200) {
      const authKey = (await response.json() ?? {}).authKey;
      if (authKey) {
        localStorage.setItem(AUTH_TOKEN_KEY, authKey);
        userProfile = await ThrillMapAPI.getUser();
      }
    }
    return userProfile
  }

  static async signUpUser(signUpForm: SignUpForm): Promise<Profile | null> {
    const response = await fetch(`${API_ROOT}/account/signup`, {
      method: 'POST',
      body: JSON.stringify(signUpForm),
      headers: ThrillMapAPI.getRequestHeaders(),
    });
    let userProfile: Profile | null = null;
    if (response.status === 200) {
      const authKey = (await response.json() ?? {}).authKey;
      if (authKey) {
        localStorage.setItem(AUTH_TOKEN_KEY, authKey);
        userProfile = await ThrillMapAPI.getUser();
      }
    }
    return userProfile
  }

  static async getUser(): Promise<Profile | null> {
    const response = await fetch(`${API_ROOT}/account/profile`, {
      method: 'GET',
      headers: ThrillMapAPI.getRequestHeaders()
    });
    if (response.status === 200) {
      return (await response.json()) as Profile;
    }
    return null;
  }

  static async createOrder(order: Order) {
    const authKey = '';
    const response = await fetch(
      `${API_ROOT}/dining/orders/new/`,
      {
        method: 'POST',
        body: JSON.stringify(order),
        headers: ThrillMapAPI.getRequestHeaders(),
      }
    );
    return await response.json();
  }
}
