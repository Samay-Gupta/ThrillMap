import { ListDataElement } from '/components/list.ts';

const getDiningListData = (restaurants: [any]) => {
  return restaurants.map(restaurantData => {
    const restaurantUrl = `/dining/restaurants.html?name=${encodeURIComponent(restaurantData.name)}`;
    return {
      href: restaurantUrl,
      imageURL: image(restaurantData.imageURL),
      name: restaurantData.name,
      description: restaurantData.description,
    } as ListDataElement;
  });
};
