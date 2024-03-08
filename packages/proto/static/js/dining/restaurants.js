function getDiningDetails(data, restaurantName) {
    restaurantName = restaurantName || getQueryParam('name');
    const restaurant = data.dining.find(restaurant => restaurant.name === restaurantName);
    return restaurant;
}

function createDiningDetails(restaurant, containerDiv) {
    const diningContainer = document.getElementById(containerDiv);

    const restaurantDiv = document.createElement('div');
    restaurantDiv.className = 'restaurant';

    const restaurantInfo = document.createElement('div');
    restaurantInfo.className = 'restaurant-info';

    const restaurantImage = document.createElement('img');
    restaurantImage.src = image(restaurant.imageURL);
    restaurantImage.alt = restaurant.name;
    restaurantImage.className = 'restaurant-image';
    restaurantInfo.appendChild(restaurantImage);

    const restaurantName = document.createElement('h1');
    restaurantName.textContent = restaurant.name;
    restaurantName.className = 'restaurant-name';
    restaurantInfo.appendChild(restaurantName);

    const restaurantMenu = document.createElement('div');
    restaurantMenu.className = 'restaurant-menu';

    const restaurantMenuTitle = document.createElement('h2');
    restaurantMenuTitle.textContent = 'Dining Menu';
    restaurantMenuTitle.className = 'restaurant-menu-title';
    restaurantMenu.appendChild(restaurantMenuTitle);

    const restaurantMenuItems = document.createElement('div');
    restaurantMenuItems.className = 'restaurant-menu-items';

    let remainingItemCount = restaurant.menu.length;

    for (const menuItem of restaurant.menu) {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'restaurant-menu-item';

        const menuItemTitleDiv = document.createElement('div');
        menuItemTitleDiv.className = 'restaurant-menu-item-title';

        const menuItemName = document.createElement('h3');
        menuItemName.textContent = menuItem.item;
        menuItemName.className = 'restaurant-menu-item-name';
        menuItemTitleDiv.appendChild(menuItemName);

        const menuItemPrice = document.createElement('p');
        menuItemPrice.textContent = `$${menuItem.price}`;
        menuItemPrice.className = 'restaurant-menu-item-price';
        menuItemTitleDiv.appendChild(menuItemPrice);

        menuItemDiv.appendChild(menuItemTitleDiv);

        const menuItemDescription = document.createElement('p');
        menuItemDescription.textContent = menuItem.description;
        menuItemDescription.className = 'restaurant-menu-item-description';
        menuItemDiv.appendChild(menuItemDescription);        

        if (remainingItemCount > 1) {
            const menuItemDivider = document.createElement('hr');
            menuItemDivider.className = 'restaurant-menu-item-divider';
            menuItemDiv.appendChild(menuItemDivider);
            remainingItemCount--;
        }

        restaurantMenuItems.appendChild(menuItemDiv);
    }

    restaurantMenu.appendChild(restaurantMenuItems);

    const spacer = document.createElement('div');
    spacer.className = 'v-spacer';
    restaurantMenu.appendChild(spacer);


    restaurantDiv.appendChild(restaurantInfo);
    restaurantDiv.appendChild(restaurantMenu);

    diningContainer.appendChild(restaurantDiv);
}

