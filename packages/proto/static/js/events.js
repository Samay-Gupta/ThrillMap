function getEventDetails(data, eventName) {
    eventName = eventName || getQueryParam('name');
    const event = data.events.find(event => event.name === eventName);
    return event;
}

function createEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.className = 'event-item';

    const title = document.createElement('h3');
    title.textContent = event.name;
    eventElement.appendChild(title);

    const description = document.createElement('p');
    description.textContent = event.description;
    eventElement.appendChild(description);

    const link = document.createElement('a');
    link.href = `event_details.html?name=${encodeURIComponent(event.name)}`;
    link.textContent = 'More Info';
    link.className = 'event-link';
    eventElement.appendChild(link);

    return eventElement;
}

function createEventDetails(event, containerDiv) {
    const eventDetailsContainer = document.getElementById(containerDiv);

    eventDetailsContainer.innerHTML = '';

    const eventName = document.createElement('h2');
    eventName.textContent = event.name;
    eventName.className = 'event-name';

    const eventDescription = document.createElement('p');
    eventDescription.textContent = event.description;
    eventDescription.className = 'event-description';

    const eventDate = document.createElement('p');
    eventDate.textContent = `Date: ${event.date}`;
    eventDate.className = 'event-date';

    const eventLocation = document.createElement('p');
    eventLocation.textContent = `Location: ${event.location}`;
    eventLocation.className = 'event-location'; 
    
    eventDetailsContainer.appendChild(eventName);
    eventDetailsContainer.appendChild(eventDate);
    eventDetailsContainer.appendChild(eventLocation);
    eventDetailsContainer.appendChild(eventDescription);

    const navContainer = document.getElementsByClassName('breadcrumb')[0];
    const nav = document.createElement('li');
    nav.className = 'breadcrumb-item';
    nav.textContent = event.name;
    navContainer.appendChild(nav);
}



function createEventsList(events, containerDiv) {
    const eventsContainer = document.getElementById(containerDiv);

    events.forEach(event => {
        eventsContainer.appendChild(createEventElement(event));
    });
}