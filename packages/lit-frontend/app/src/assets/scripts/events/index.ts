import { ListDataElement, ListElement } from '/components/list.ts';
import { ThrillMapAPI, getURLParams } from '/assets/scripts/api.ts';
import { Event } from '/data/models/Event.ts';

function loadPage() {
  const params = getURLParams();

  const appListElement = document.querySelector('app-list') as ListElement;
  ThrillMapAPI.getEvents(params).then((eventList: [Event]) => {
    appListElement.listTitle = '';
    appListElement.listData = eventList.map(eventData => {
      const eventUrl = `/events/event_details.html?name=${encodeURIComponent(eventData.name)}`;
      return {
        href: eventUrl,
        imageURL: eventData.imageURL,
        name: eventData.name,
        description: eventData.description,
      } as ListDataElement;
    });
  });
}

loadPage();
