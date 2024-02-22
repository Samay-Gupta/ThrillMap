import { Route } from '@vaadin/router';

import '/views/home-view';
import '/views/rides/rides-navigation-view';
import '/views/rides/rides-list-view';
import '/views/rides/ride-details-view';

import '/views/dining/restaurants-list-view';
import '/views/dining/restaurant-details-view';
import '/views/dining/restaurant-order-view';

import '/views/events/events-list-view';
import '/views/events/event-details-view';

import '/views/map/park-map-view';

export const AppRoutes: Route[] = [
  {
    path: '/',
    component: 'home-view',
  },
  {
    path: '/rides/',
    component: 'rides-navigation-view',
  },
  {
    path: '/rides/list/',
    component: 'rides-list-view',
  },
  {
    path: '/rides/list/:category/',
    component: 'rides-list-view',
  },
  {
    path: '/rides/:name/',
    component: 'ride-details-view',
  },
  {
    path: '/dining/',
    component: 'restaurants-list-view',
  },
  {
    path: '/dining/:name/order/',
    component: 'restaurant-order-view',
  },
  {
    path: '/dining/:name/',
    component: 'restaurant-details-view',
  },
  {
    path: '/events/',
    component: 'events-list-view',
  },
  {
    path: '/events/:name/',
    component: 'event-details-view',
  },
  {
    path: '/map/',
    component: 'park-map-view',
  },
  {
    path: '/order/:orderId/',
    component: 'order-details-page',
  },
  {
    path: '(.*)',
    redirect: '/',
  },
];
