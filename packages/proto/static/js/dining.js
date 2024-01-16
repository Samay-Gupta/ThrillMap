function getDiningDetails(data, restaurantName) {
    restaurantName = restaurantName || getQueryParam('name');
    const restaurant = data.dining.find(restaurant => restaurant.name === restaurantName);
    return restaurant;
}

function createRestaurantElement(restaurant) {
    const restaurantElement = document.createElement('div');
    restaurantElement.className = 'restaurant-info';

    const name = document.createElement('h3');
    name.textContent = restaurant.name;
    restaurantElement.appendChild(name);

    const description = document.createElement('p');
    description.textContent = restaurant.description;
    restaurantElement.appendChild(description);

    const moreInfoLink = document.createElement('a');
    moreInfoLink.href = `/dining/restaurants.html?name=${encodeURIComponent(restaurant.name)}`;
    moreInfoLink.textContent = 'More Info';
    moreInfoLink.className = 'more-info-link';
    restaurantElement.appendChild(moreInfoLink);

    return restaurantElement;
}

function createDiningDetails(restaurant, containerDiv) {
    const diningContainer = document.getElementById(containerDiv);

    const restaurantElement = document.createElement('div');
    restaurantElement.className = 'restaurant-info';

    const name = document.createElement('h2');
    name.textContent = restaurant.name;
    restaurantElement.appendChild(name);

    const description = document.createElement('p');
    description.textContent = restaurant.description;
    restaurantElement.appendChild(description);

    const menuTitle = document.createElement('h3');
    menuTitle.textContent = "Menu";
    restaurantElement.appendChild(menuTitle);

    const menuList = document.createElement('ul');
    menuList.className = 'menu-list';

    restaurant.menu.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item';

        const itemTitle = document.createElement('span');
        itemTitle.textContent = item.item;
        itemTitle.className = 'menu-item-title';
        menuItem.appendChild(itemTitle);

        const itemPrice = document.createElement('span');
        itemPrice.textContent = ` - $${item.price}`;
        itemPrice.className = 'menu-item-price';
        menuItem.appendChild(itemPrice);

        const itemDescription = document.createElement('div');
        itemDescription.textContent = item.description;
        itemDescription.className = 'menu-item-description';
        menuItem.appendChild(itemDescription);

        menuList.appendChild(menuItem);
    });

    restaurantElement.appendChild(menuList);
    diningContainer.appendChild(restaurantElement);

    const navContainer = document.getElementsByClassName('breadcrumb')[0];
    const nav = document.createElement('li');
    nav.className = 'breadcrumb-item';
    nav.textContent = restaurant.name;
    navContainer.appendChild(nav);
}

function createDiningList(restaurants, containerDiv) {
    const diningContainer = document.getElementById(containerDiv);

    restaurants.forEach(restaurant => {
        diningContainer.appendChild(createRestaurantElement(restaurant));
    });
}
