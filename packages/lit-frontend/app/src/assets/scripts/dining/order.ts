const orderItems = {}

function getOrderDetails(data, restaurantName) {
    restaurantName = restaurantName || getQueryParam('name');
    const loggedIn = true;
    if (!restaurantName || !loggedIn) {
      window.location.href = '/';

    }
    const restaurant = data.dining.find(
      restaurant => restaurant.name === restaurantName
    );
    return restaurant;
  }

  function createOrderMenu(restaurant, containerDivId) {
    const orderContainerDiv = document.getElementById(containerDivId);

    const restaurantNameElement = document.createElement('h1');
    restaurantNameElement.textContent = restaurant.name;
    restaurantNameElement.className = 'restaurant-name';
    orderContainerDiv.appendChild(restaurantNameElement);

    const containerDiv = document.createElement('div');
    containerDiv.className = 'order-content';
    orderContainerDiv.appendChild(containerDiv);

    const menuItemsDiv = document.createElement('div');
    menuItemsDiv.className = 'menu-items';
    containerDiv.appendChild(menuItemsDiv);

    const orderSummaryDiv = document.createElement('div');
    orderSummaryDiv.className = 'order-summary';
    containerDiv.appendChild(orderSummaryDiv);

    restaurant.menu.forEach(menuItem => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
            <div class="menu-item-name">${menuItem.item} - $${menuItem.price}</div>
            <div class="menu-item-description">${menuItem.description}</div>
            <button class="add-to-order" onclick="addToOrder('${menuItem.item}', ${menuItem.price})">Add</button>
        `;
        menuItemsDiv.appendChild(itemElement);
    });

    orderSummaryDiv.innerHTML = `
        <h2>Your Order</h2>
        <div class="order-items" id="order-items"></div>
        <div class="order-total" id="order-total">Total: $0</div>
        <button class="order-button" onclick="placeOrder()">Place Order</button>
    `;
}

function addToOrder(itemName, price) {
    const orderItemsDiv = document.getElementById('order-items');
    const orderTotalDiv = document.getElementById('order-total');

    if (orderItems[itemName]) {
        orderItems[itemName].count++;
    } else {
        orderItems[itemName] = {price: price, count: 1};
    }

    let total = 0;
    orderItemsDiv.innerHTML = '';
    Object.keys(orderItems).forEach(item => {
        const itemTotal = orderItems[item].price * orderItems[item].count;
        total += itemTotal;
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `${item} x ${orderItems[item].count} - $${itemTotal.toFixed(2)}`;
        orderItemsDiv.appendChild(itemElement);
    });

    orderTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
}
