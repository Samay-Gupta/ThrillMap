import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '../../app';

import { ListDataElement } from '../../assets/components/list';

import './../../assets/components/list';
import { Event, EventSearchProps } from 'thrill-map-models';
import { NavPages } from '../../assets/components/navbar';

@customElement('events-list-view')
class EventsListView extends App.View {
  @property({ type: Array })
  get eventsList() {
    return this.getFromModel<Event[]>('events');
  }

  connectedCallback() {
    super.connectedCallback();
    NavPages.setActive('/events/');
    this.dispatchMessage({
      type: 'EventFiltered',
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
