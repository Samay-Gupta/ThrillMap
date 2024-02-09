import { ThrillMapAPI, getURLParams } from "../api";
import { Ride } from "../models/ride";

function createRideDetails(ride: Ride) {
  const rideContainer = document.getElementById('ride-container') as HTMLElement;

  const rideMinHeightHTML = ride.minHeight === 0 ? '' : `
  <div class="ride-details-section">
    <svg class="icon"><use href="/assets/icons/icons.svg#icon-min-height"></use></svg>
    <span class="ride-details-text">Min Height: ${ride.minHeight}in</span>
  </div>
  `;
  rideContainer.innerHTML = `
    <div class="ride-details">
      <img src="${ride.imageURL}" alt="${ride.name}" class="ride-image" />
      <div class="ride-info">
        <h2 class="ride-title">${ride.name}</h2>
        <p class="ride-description">${ride.description}</p>
        ${rideMinHeightHTML}
        <div class="ride-details-section">
          <svg class="icon"><use href="/assets/icons/icons.svg#icon-duration"></use></svg>
          <span class="ride-details-text">Duration: ${ride.duration}</span>
        </div>
      </div>
    </div>
  `;
}

function loadPage() {
  const params = getURLParams();

  ThrillMapAPI.getRides(params).then((rideList: [Ride]) => {
    if (!rideList) {
      return window.location.href = '/rides/ride_list.html';
    }
    const ride = rideList[0];
    createRideDetails(ride);
  });
}

loadPage();
