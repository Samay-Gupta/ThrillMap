import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '../../app';

import { Event, EventSearchProps } from 'thrill-map-models';

const pageStyles = css`
  .event-div {
    display: flex;
    border: var(--border1);
    border-radius: 10px;
    overflow: hidden;
    align-items: flex-start;
    margin-bottom: 20px;
    width: 80vw;
    padding: 20px;
    background-color: var(--color-background-secondary);
  }

  .event-image {
    width: 400px;
    height: auto;
    margin-right: 20px;
    border-radius: 10px;
  }

  .text-div {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
  }

  .event-name {
    font-size: var(--font-size4);
    color: var(--color-gray2);
    margin-bottom: 10px;
  }

  .event-description {
    font-size: var(--font-size2);
    color: var(--color-gray2);
  }
`;

@customElement('event-details-view')
class EventDetailsView extends App.View {
  @property({ attribute: 'name', reflect: true })
  get name() {
    // @ts-ignore
    return this.location?.params.name || '';
  }

  @property({ type: Array })
  get eventsList() {
    return this.getFromModel<Event[]>('events');
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage({
      type: 'EventFiltered',
      eventFilters: {
        name: this.name,
      } as EventSearchProps,
    });
  }

  static styles = pageStyles;

  render() {
    if (!this.eventsList || this.eventsList.length === 0) {
      return html``;
    }
    const event = this.eventsList[0];
    return html`
      <div class="event-div">
        <img src="${event.imageURL}" alt="${event.name}" class="event-image" />
        <div class="text-div">
          <h2 class="event-name">${event.name}</h2>
          <p class="event-description">${event.description}</p>
        </div>
      </div>
    `;
  }
}
