import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { AppRoutes } from '/config/routes';
import update from '/update';

import * as App from '/app';

import '/components/thrill-map-router';
import '/components/navbar';

@customElement('thrill-map-app')
class ThrillMapApp extends App.Main {
  constructor() {
    super(update);
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <thrill-map-router .routes=${AppRoutes}></thrill-map-router>
    `;
  }
}
