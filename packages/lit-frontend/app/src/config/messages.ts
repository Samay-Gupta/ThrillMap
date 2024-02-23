import {
  EventSearchProps,
  RestaurantSearchProps,
  RideSearchProps,
} from 'thrill-map-models';

import { LoginForm, SignUpForm } from 'thrill-map-models';

export interface MessageType<t extends string> {
  type: t;
}

export interface RideFiltered extends MessageType<'RideFiltered'> {
  rideFilters: RideSearchProps;
}

export interface RestaurantFiltered extends MessageType<'RestaurantFiltered'> {
  restaurantFilters: RestaurantSearchProps;
}

export interface EventFiltered extends MessageType<'EventFiltered'> {
  eventFilters: EventSearchProps;
}

export interface LoginUser extends MessageType<'LoginUser'> {
  loginForm: LoginForm;
}

export interface SignUpUser extends MessageType<'SignUpUser'> {
  signUpForm: SignUpForm;
}

export interface LogoutUser extends MessageType<'LogoutUser'> {}

export interface ProfileUpdate extends MessageType<'ProfileUpdate'> {
  profileForm: ProfileForm;
}

export interface OrderUpdate extends MessageType<'OrderUpdate'> {
  orderForm: OrderForm;
}

export type Message =
  | RideFiltered
  | RestaurantFiltered
  | EventFiltered
  | LoginUser
  | SignUpUser
  | LogoutUser
  | ProfileUpdate;

export type TypedMessage = MessageType<string>;
