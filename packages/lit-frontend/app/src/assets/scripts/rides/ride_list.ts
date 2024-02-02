import { ListDataElement } from '/components/list.ts';

const getRideListData = (rides: [any]) => {
  return rides.map(rideData => {
    const rideUrl = `/rides/ride_details.html?ride=${encodeURIComponent(rideData.name)}`;
    return {
      href: rideUrl,
      imageURL: image(rideData.imageURL),
      name: rideData.name,
      description: rideData.description,
    } as ListDataElement;
  });
};
