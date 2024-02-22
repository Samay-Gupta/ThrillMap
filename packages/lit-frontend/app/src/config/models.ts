import { Event, Order, Profile, Restaurant, Ride } from 'thrill-map-models';

export type ModelMap<M> = (model: M) => M;

export interface Model {
  events?: Event[];
  orders?: Order[];
  restaurants?: Restaurant[];
  rides?: Ride[];
  profile?: Profile;
}
