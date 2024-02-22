import { EventSearchProps, RideSearchProps } from 'thrill-map-models';

export interface MessageType<t extends string> {
  type: t;
}

export interface RideFiltered extends MessageType<'RideFiltered'> {
  rideFilters: RideSearchProps;
}

export interface RestaurantFiltered extends MessageType<'RestaurantFiltered'> {
  restaurantFilters: RideSearchProps;
}

export interface EventFiltered extends MessageType<'EventFiltered'> {
  eventFilters: EventSearchProps;
}

export type Message = RideFiltered | RestaurantFiltered | EventFiltered;

export type TypedMessage = MessageType<string>;
