import { Map } from "./scripts/Map";
import {components, utils} from "./Globals";
import {BottomSheetMenu} from "./scripts/menus/BottomSheetMenu";
const container = document.getElementById('map-container');

utils.map = new Map(container);
utils.map.init();

const searchBar = components.input.createSearchBox();
container.appendChild(searchBar);

const bottomSheetMenu = new BottomSheetMenu(container);
bottomSheetMenu.init();

utils.map.requestLocationPermission();
