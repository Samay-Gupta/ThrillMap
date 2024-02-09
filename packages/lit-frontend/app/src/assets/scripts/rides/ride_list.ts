import { ListDataElement, ListElement } from '/components/list.ts';
import { ThrillMapAPI, getURLParams } from '/assets/scripts/api.ts';
import { Ride } from '/data/models/Ride.ts';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function RideToListData(rideData: Ride): ListDataElement {
  const rideUrl = `/rides/ride_details.html?name=${encodeURIComponent(rideData.name)}`;
  return {
    href: rideUrl,
    imageURL: rideData.imageURL,
    name: rideData.name,
    description: rideData.description,
  } as ListDataElement;
}

function loadPage() {
  const params = getURLParams();

  const title = `${params.category? capitalize(params.category): 'All'} Rides`

  const pageTitleElement = document.querySelector('title') as HTMLTitleElement;
  pageTitleElement.text = title;
  
  const appListElement = document.querySelector('app-list') as ListElement;
  ThrillMapAPI.getRides(params).then((rideList: [Ride]) => {
    appListElement.listTitle = title;
    appListElement.listData = rideList.map(RideToListData);
  });
}

loadPage();
