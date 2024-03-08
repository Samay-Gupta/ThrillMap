function createRideElement(ride) {
    const rideUrl = `/rides/ride_details.html?ride=${encodeURIComponent(ride.name)}`;
    return createListElement(rideUrl, image(ride.imageURL), ride.name, ride.description);
}