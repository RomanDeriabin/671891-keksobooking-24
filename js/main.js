'use sctrict';

import {renderAds} from './render.js';
import {generateAppartmentData} from './data.js';
import { disabledPage } from './form.js';

const map = document.querySelector('#map-canvas');

const dataCount = 1;

const arrayOfAppartments = generateAppartmentData(dataCount);
const [firstElement] = arrayOfAppartments;

renderAds(firstElement, map);
disabledPage(true);
