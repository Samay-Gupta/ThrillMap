import { ListDataElement } from '/components/list.ts';

const getEventsListData = (events: [any]) => {
  return events.map(eventData => {
    const eventUrl = `/events/event_details.html?name=${encodeURIComponent(eventData.name)}`;
    return {
      href: eventUrl,
      imageURL: image(eventData.imageURL),
      name: eventData.name,
      description: eventData.description,
    } as ListDataElement;
  });
};
