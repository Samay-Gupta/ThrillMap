import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '/app';

import { ListDataElement } from '/components/list';

import { Restaurant, RestaurantSearchProps } from 'thrill-map-models';

import '/components/list';

@customElement('restaurants-list-view')
class RestaurantsListView extends App.View {
  @property()
  get restaurantsList() {
    return this.getFromModel<Restaurant[]>('restaurants');
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage({
      type: 'FilterRestaurant',
      restaurantFilters: {} as RestaurantSearchProps,
    });
  }

  restaurantToListData(restaurantData: Restaurant): ListDataElement {
    const restaurantUrl = `/dining/${encodeURIComponent(restaurantData.name)}/`;
    return {
      href: restaurantUrl,
      imageURL: restaurantData.imageURL,
      name: restaurantData.name,
      description: restaurantData.description,
    } as ListDataElement;
  }

  render() {
    const listTitle = 'Restaurants';
    return html`
      <app-list
        .listTitle=${listTitle}
        .listData=${this.restaurantsList.map(this.restaurantToListData)}
      ></app-list>
    `;
  }
}
