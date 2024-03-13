import {
  EventSearchProps,
  RestaurantSearchProps,
  RideSearchProps,
  Order,
  OrderSearchProps,
  OrderForm,
} from 'thrill-map-models';

import { LoginForm, SignUpForm, ProfileForm } from 'thrill-map-models';

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

export interface RefreshProfile extends MessageType<'RefreshProfile'> {}

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

export interface OrderFiltered extends MessageType<'OrderFiltered'> {
  orderFilters: OrderSearchProps;
}

export interface CreateOrder extends MessageType<'CreateOrder'> {
  orderDetails: OrderForm;
}

export type Message =
  | RideFiltered
  | RestaurantFiltered
  | EventFiltered
  | RefreshProfile
  | LoginUser
  | SignUpUser
  | LogoutUser
  | ProfileUpdate
  | OrderFiltered
  | CreateOrder;

export type TypedMessage = MessageType<string>;
