import { ThrillMapAPI, getURLParams } from '/assets/scripts/api';
import { Event } from '/data/models/event';

function createEventDetails(event) {
  const eventDetailsContainer = document.getElementById(
    'event-container'
  ) as HTMLElement;

  eventDetailsContainer.innerHTML = `
    <div class="event-div">
      <img src="${event.imageURL}" alt="${event.name}" class="event-image" />
      <div class="text-div">
        <h2 class="event-name">${event.name}</h2>
        <p class="event-description">${event.description}</p>
      </div>
    </div>
  `;
}

function loadPage() {
  const params = getURLParams();

  ThrillMapAPI.getEvents(params).then((eventList: [Event]) => {
    if (!eventList) {
      return (window.location.href = '/events/');
    }
    const event = eventList[0];
    createEventDetails(event);
  });
}

loadPage();
