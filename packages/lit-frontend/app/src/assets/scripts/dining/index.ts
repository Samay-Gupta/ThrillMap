import { ListDataElement, ListElement } from '/components/list.ts';
import { ThrillMapAPI, getURLParams } from '/assets/scripts/api.ts';
import { Restaurant } from '/data/models/Restaurant.ts';

function RestaurantToListData(restaurantData: Restaurant) {
  const restaurantUrl = `/dining/restaurants.html?name=${encodeURIComponent(restaurantData.name)}`;
    return {
      href: restaurantUrl,
      imageURL: restaurantData.imageURL,
      name: restaurantData.name,
      description: restaurantData.description,
    } as ListDataElement;
};


function loadPage() {
  const params = getURLParams();

  const title = 'Dining';

  const pageTitleElement = document.querySelector('title') as HTMLTitleElement;
  pageTitleElement.text = title;
  
  const appListElement = document.querySelector('app-list') as ListElement;
  ThrillMapAPI.getRestaurants(params).then((restaurantList: [Restaurant]) => {
    appListElement.listTitle = title;
    appListElement.listData = restaurantList.map(RestaurantToListData);
  });
}

loadPage();
