import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as App from '../../app';

import { Ride, RideSearchProps } from 'thrill-map-models';
import { NavPages } from '../../assets/components/navbar';

const pageStyles = css`
  .ride-details {
    display: flex;
    align-items: flex-start;
    width: 80vw;
    height: 440px;
    border-radius: 10px;
    border: var(--border1);
    padding: 20px;
    margin: 0;
    color: var(--color-gray2);
    background-color: var(--color-background-secondary);
  }

  .ride-image {
    width: 400px;
    height: auto;
    margin-right: 20px;
    border-radius: 10px;
  }

  .ride-info {
    display: flex;
    flex-direction: column;
    font-size: var(--font-size4);
    margin: 0;
    padding: 0;
  }

  .ride-title {
    font-size: var(--font-size6);
    padding: 0;
    margin: 0;
  }

  .ride-description {
    font-size: var(--font-size4);
    padding: 0;
    margin: 0;
    min-height: 200px;
  }

  .ride-details-section {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
    border: var(--border1);
    padding: 2px;
  }

  .icon {
    margin: 0;
    margin-top: 3px;
    height: 48px;
    width: 48px;
    margin-right: 16px;
    -webkit-filter: var(--invert);
    filter: var(--invert);
  }

  .ride-details-text {
    font-size: var(--font-size4);
  }
`;

@customElement('ride-details-view')
class RideDetailsView extends App.View {
  @property({ attribute: 'name', reflect: true })
  get name() {
    // @ts-ignore
    return this.location?.params.name || '';
  }

  @property({ type: Array })
  get ridesList() {
    return this.getFromModel<Ride[]>('rides');
  }

  connectedCallback() {
    super.connectedCallback();
    NavPages.setActive('/rides/');
    this.dispatchMessage({
      type: 'RideFiltered',
      rideFilters: {
        name: this.name,
      } as RideSearchProps,
    });
  }

  static styles = pageStyles;

  render() {
    if (!this.ridesList || this.ridesList.length === 0) {
      return html``;
    }
    const ride = this.ridesList[0];
    const rideMinHeightHTML =
      ride.minHeight === 0
        ? html``
        : html`
            <div class="ride-details-section">
              <svg class="icon">
                <use href="/assets/icons/icons.svg#icon-min-height"></use>
              </svg>
              <span class="ride-details-text"
                >Min Height: ${ride.minHeight}in</span
              >
            </div>
          `;
    return html`
      <div class="ride-details">
        <img src="${ride.imageURL}" alt="${ride.name}" class="ride-image" />
        <div class="ride-info">
          <h2 class="ride-title">${ride.name}</h2>
          <p class="ride-description">${ride.description}</p>
          ${rideMinHeightHTML}
          <div class="ride-details-section">
            <svg class="icon">
              <use href="/assets/icons/icons.svg#icon-duration"></use>
            </svg>
            <span class="ride-details-text">Duration: ${ride.duration}s</span>
          </div>
        </div>
      </div>
    `;
  }
}
