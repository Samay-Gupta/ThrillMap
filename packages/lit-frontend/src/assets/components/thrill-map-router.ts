import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Route, Router } from '@vaadin/router';

@customElement('thrill-map-router')
export class ThrillMapRouter extends LitElement {
  router = new Router(this);

  @property({ attribute: false })
  routes: Route[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.router.setRoutes(this.routes);
  }

  render() {
    return html`<slot></slot>`;
  }
}
