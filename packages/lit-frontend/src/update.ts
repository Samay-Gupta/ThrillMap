import * as App from './app';

import {
  Message,
  RideFiltered,
  EventFiltered,
  RestaurantFiltered,
  LoginUser,
  SignUpUser,
  ProfileUpdate,
  OrderFiltered,
  CreateOrder,
} from './config/messages';

import { AUTH_TOKEN_KEY } from './config/constants';

import { Ride, Event, Restaurant, Profile, Order } from 'thrill-map-models';

import { ThrillMapAPI } from './services/thrill-map-api';

const dispatch = App.createDispatch();

dispatch.addMessage('FilterRide', (message: Message) => {
  const { rideFilters } = message as RideFiltered;

  return ThrillMapAPI.getRides(rideFilters).then((rideList: Ride[]) => {
    return App.updateProps({ rides: rideList });
  });
});

dispatch.addMessage('FilterRestaurant', (message: Message) => {
  const { restaurantFilters } = message as RestaurantFiltered;

  return ThrillMapAPI.getRestaurants(restaurantFilters).then(
    (restaurantList: Restaurant[]) => {
      return App.updateProps({ restaurants: restaurantList });
    }
  );
});

dispatch.addMessage('FilterEvent', (message: Message) => {
  const { eventFilters } = message as EventFiltered;

  return ThrillMapAPI.getEvents(eventFilters).then((eventList: Event[]) => {
    return App.updateProps({ events: eventList });
  });
});

dispatch.addMessage('RefreshProfile', (_: Message) => {
  return ThrillMapAPI.getUser().then((profile: Profile | null) => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
    return App.updateProps({ profile: profile });
  });
});

dispatch.addMessage('LoginUser', (message: Message) => {
  const { loginForm } = message as LoginUser;

  return ThrillMapAPI.loginUser(loginForm).then((profile: Profile | null) => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
    return App.updateProps({ profile: profile });
  });
});

dispatch.addMessage('SignUpUser', (message: Message) => {
  const { signUpForm } = message as SignUpUser;

  return ThrillMapAPI.signUpUser(signUpForm).then((profile: Profile | null) => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
    return App.updateProps({ profile: profile });
  });
});

async function logoutUser() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  return null;
}

dispatch.addMessage('LogoutUser', (_: Message) => {
  return logoutUser().then((profile: Profile | null) => {
    return App.updateProps({ profile: profile });
  });
});

dispatch.addMessage('ProfileUpdate', (message: Message) => {
  const { profileForm } = message as ProfileUpdate;
  return ThrillMapAPI.updateProfile(profileForm).then(
    (profile: Profile | null) => {
      if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
      }
      return App.updateProps({ profile: profile });
    }
  );
});

dispatch.addMessage('OrderFiltered', (message: Message) => {
  const { orderFilters } = message as OrderFiltered;
  return ThrillMapAPI.getOrders(orderFilters).then((orderList: Order[]) => {
    return App.updateProps({ orders: orderList });
  });
});

dispatch.addMessage('CreateOrder', (message: Message) => {
  const { orderDetails } = message as CreateOrder;
  return ThrillMapAPI.createOrder(orderDetails).then((order: Order | null) => {
    return App.updateProps({ orders: [order] });
  });
});

export default dispatch.update;
