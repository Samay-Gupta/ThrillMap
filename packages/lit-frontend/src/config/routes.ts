import { Route } from '@vaadin/router';

import '/views/home-view';

import '/views/account/login-view';
import '/views/account/signup-view';
import '/views/account/profile-view';
import '/views/account/edit-profile-view';
import '/views/account/settings-view';

import '/views/rides/rides-navigation-view';
import '/views/rides/rides-list-view';
import '/views/rides/ride-details-view';

import '/views/dining/restaurants-list-view';
import '/views/dining/restaurant-details-view';
import '/views/dining/restaurant-order-view';
import '/views/dining/restaurant-order-details-view';

import '/views/events/events-list-view';
import '/views/events/event-details-view';

import '/views/map/park-map-view';

export const AppRoutes: Route[] = [
  {
    path: '/',
    component: 'home-view',
  },
  {
    path: '/account/login/',
    component: 'login-view',
  },
  {
    path: '/account/signup/',
    component: 'signup-view',
  },
  {
    path: '/account/settings/',
    component: 'settings-view',
  },
  {
    path: '/account/edit/',
    component: 'edit-profile-view',
  },
  {
    path: '/account/',
    component: 'profile-view',
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
    path: '/dining/order/',
    component: 'restaurant-order-view',
  },
  {
    path: '/dining/order/:orderId/',
    component: 'restaurant-order-details-view',
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
    path: '(.*)',
    redirect: '/',
  },
];
