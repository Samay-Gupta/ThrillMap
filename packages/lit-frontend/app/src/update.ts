import * as App from './app';

import {
  Message,
  RideFiltered,
  EventFiltered,
  RestaurantFiltered,
  LoginUser,
    SignUpUser,
    ProfileUpdate
} from './config/messages';

import { AUTH_TOKEN_KEY } from './config/constants';

import { Ride, Event, Restaurant, Profile } from 'thrill-map-models';

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
  
    return ThrillMapAPI.signUpForm(signUpForm).then((profile: Profile | null) => {
        if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
        }
      return App.updateProps({ profile: profile });
    });
  });

dispatch.addMessage('LogoutUser', (message: Message) => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  return App.updateProps({ profile: null });
});

dispatch.addMessage('ProfileUpdate', (message: Message) => {
    const { profileForm } = message as ProfileUpdate;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return App.updateProps({ profile: null });
  });

export default dispatch.update;
