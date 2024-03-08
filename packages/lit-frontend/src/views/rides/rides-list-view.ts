import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '../../app';

import { Ride, RideSearchProps } from 'thrill-map-models';
import { ListDataElement } from '../../assets/components/list';

import '../../assets/components/list';

@customElement('rides-list-view')
class RidesListView extends App.View {
  @property({ attribute: 'category', reflect: true })
  get category() {
    return this.location?.params.category || '';
  }

  @property()
  get ridesList() {
    return this.getFromModel<Ride[]>('rides');
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage({
      type: 'FilterRide',
      rideFilters: {
        category: this.category,
      } as RideSearchProps,
    });
  }

  rideToListData(rideData: Ride): ListDataElement {
    const rideUrl = `/rides/${encodeURIComponent(rideData.name)}/`;
    return {
      href: rideUrl,
      imageURL: rideData.imageURL,
      name: rideData.name,
      description: rideData.description,
    } as ListDataElement;
  }

  render() {
    const listTitle = this.category
      ? this.category.charAt(0).toUpperCase() +
        this.category.slice(1) +
        ' Rides'
      : 'All Rides';
    return html`
      <app-list
        .listTitle=${listTitle}
        .listData=${this.ridesList.map(this.rideToListData)}
      ></app-list>
    `;
  }
}
