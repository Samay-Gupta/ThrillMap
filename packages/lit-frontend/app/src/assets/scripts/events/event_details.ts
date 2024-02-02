function getEventDetails(data, eventName) {
  eventName = eventName || getQueryParam('name');
  const event = data.events.find(event => event.name === eventName);
  return event;
}

function createEventDetails(event, containerDiv) {
  const eventDetailsContainer = document.getElementById(containerDiv);

  const eventDiv = document.createElement('div');
  eventDiv.className = 'event-div';

  const eventImage = document.createElement('img');
  eventImage.src = image(event.imageURL);
  eventImage.alt = event.name;
  eventImage.className = 'event-image';
  eventDiv.appendChild(eventImage);

  const textDiv = document.createElement('div');
  textDiv.className = 'text-div';

  const eventName = document.createElement('h2');
  eventName.textContent = event.name;
  eventName.className = 'event-name';
  textDiv.appendChild(eventName);

  const eventDescription = document.createElement('p');
  eventDescription.textContent = event.description;
  eventDescription.className = 'event-description';
  textDiv.appendChild(eventDescription);

  eventDiv.appendChild(textDiv);
  eventDetailsContainer.appendChild(eventDiv);
}
