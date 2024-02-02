function getRideDetails(data, rideName) {
  rideName = rideName || getQueryParam('ride');
  const categories = ['thrill', 'water', 'family'];
  for (const category of categories) {
    const ride = data.rides[category].find(ride => ride.name === rideName);
    if (ride) {
      return ride;
    }
  }
  return null;
}

function createRideDetailsSection(iconName, title, value) {
  const isDarkMode =
    document.getElementsByTagName('html')[0].className === 'dark-mode';
  const section = document.createElement('div');
  section.className = 'ride-details-section';

  const icon = document.createElement('div');
  icon.className = isDarkMode ? 'icon-dark' : 'icon';
  icon.innerHTML = `<svg class="icon"> <use href="/assets/icons/icons.svg#${iconName}" /></svg>`;
  section.appendChild(icon);

  const text = document.createElement('span');
  text.textContent = `${title}: ${value}`;
  text.className = 'ride-details-text';
  section.appendChild(text);

  return section;
}

function createRideDetails(ride, containerDiv) {
  const rideContainer = document.getElementById(containerDiv);

  const rideDiv = document.createElement('div');
  rideDiv.className = 'ride-details';

  const image = document.createElement('img');
  image.src = '/assets/images' + ride.imageURL;
  image.alt = ride.name;
  image.className = 'ride-image';
  rideDiv.appendChild(image);

  const infoDiv = document.createElement('div');
  infoDiv.className = 'ride-info';

  const title = document.createElement('h2');
  title.textContent = ride.name;
  title.className = 'ride-title';
  infoDiv.appendChild(title);

  const description = document.createElement('p');
  description.textContent = ride.description;
  description.className = 'ride-description';
  infoDiv.appendChild(description);

  if (ride.minHeight > 0) {
    infoDiv.appendChild(
      createRideDetailsSection(
        'icon-min-height',
        'Minimum Height',
        `${ride.minHeight}in`
      )
    );
  }

  infoDiv.appendChild(
    createRideDetailsSection('icon-duration', 'Duration', `${ride.duration}s`)
  );

  rideDiv.appendChild(infoDiv);
  rideContainer.appendChild(rideDiv);
}
