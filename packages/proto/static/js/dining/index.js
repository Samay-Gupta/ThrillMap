function createDiningElement(restaurant) {
    const restarantUrl = `/dining/restaurants.html?name=${encodeURIComponent(restaurant.name)}`;
    return createListElement(restarantUrl, image(restaurant.imageURL), restaurant.name, restaurant.description);
}