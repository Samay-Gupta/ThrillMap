import * as App from './app';

import {
  Message,
  RideFiltered,
  EventFiltered,
  RestaurantFiltered,
} from './config/messages';

import { Ride, Event, Restaurant } from 'thrill-map-models';

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

export default dispatch.update;
