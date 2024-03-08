function createEventElement(event) {
    const eventUrl = `/events/event_details.html?name=${encodeURIComponent(event.name)}`;
    return createListElement(eventUrl, image(event.imageURL), event.name, event.description);
}