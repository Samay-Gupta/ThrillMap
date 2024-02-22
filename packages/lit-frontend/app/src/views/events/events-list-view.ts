import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '/app';

import { ListDataElement } from '/components/list';

import '/components/list';
import { Event, EventSearchProps } from 'thrill-map-models';

@customElement('events-list-view')
class EventsListView extends App.View {
  @property()
  get eventsList() {
    return this.getFromModel<Event[]>('events');
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage({
      type: 'FilterEvent',
      eventFilters: {} as EventSearchProps,
    });
  }

  eventToListData(eventData: Event): ListDataElement {
    const eventUrl = `/events/${encodeURIComponent(eventData.name)}/`;
    return {
      href: eventUrl,
      imageURL: eventData.imageURL,
      name: eventData.name,
      description: eventData.description,
    } as ListDataElement;
  }

  render() {
    const listTitle = 'Events';
    return html`
      <app-list
        .listTitle=${listTitle}
        .listData=${this.eventsList.map(this.eventToListData)}
      ></app-list>
    `;
  }
}
