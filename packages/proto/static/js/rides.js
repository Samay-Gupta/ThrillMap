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

function createRideElement(ride) {
    const rideElement = document.createElement('div');
    rideElement.className = 'ride-info';

    const title = document.createElement('h3');
    title.textContent = ride.name;
    rideElement.appendChild(title);

    const description = document.createElement('p');
    description.textContent = ride.description;
    rideElement.appendChild(description);

    const rideLink = document.createElement('a');
    rideLink.className = 'ride-link';
    rideLink.href = `/rides/ride_details.html?ride=${encodeURIComponent(ride.name)}`;
    rideLink.textContent = 'More Info';
    rideElement.appendChild(rideLink);

    return rideElement;
}

function createRideDetails(ride, containerDiv) {
    const rideContainer = document.getElementById(containerDiv);

    const title = document.createElement('h2');
    title.textContent = ride.name;
    rideContainer.appendChild(title);

    const description = document.createElement('p');
    description.textContent = ride.description;
    rideContainer.appendChild(description);

    const minHeight = document.createElement('p');
    minHeight.textContent = `Minimum height: ${ride.minHeight} inches`;
    rideContainer.appendChild(minHeight);

    const duration = document.createElement('p');
    duration.textContent = `Duration: ${ride.duration} seconds`;
    rideContainer.appendChild(duration);

    const navContainer = document.getElementsByClassName('breadcrumb')[0];
    const nav = document.createElement('li');
    nav.className = 'breadcrumb-item';
    nav.textContent = ride.name;
    navContainer.appendChild(nav);  
}

function createRidesList(rides, containerDiv) {
    const ridesContainer = document.getElementById(containerDiv);
    rides.forEach(ride => {
        ridesContainer.appendChild(createRideElement(ride));
    });
}
