import { toggleActiveStatus } from './form.js';
import {generateAppartmentData} from './data.js';

const dataCount = 1;
const arrayOfAppartments = generateAppartmentData(dataCount);

const map = L.map('map-canvas');
const TOKIO_CENTER = {
  lat: 35.68074835749536,
  lng: 139.76829770191296,
};

function activateMap () {
  map.on('load', () => {
    toggleActiveStatus(false);
  })
    .setView(TOKIO_CENTER, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const sameAdsIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const mainPinMarker = L.marker(
  {
    lat: 35.68074835749536,
    lng: 139.76829770191296,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const sameAds = [
  arrayOfAppartments['location'],
];

sameAds.forEach(({lat, lng}) => {
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: sameAdsIcon,
  });
  marker.addTo(map);
});

mainPinMarker.addTo(map);


export {activateMap, TOKIO_CENTER, mainPinMarker};
