import { Map } from "./scripts/Map";
import {components, menus, utils} from "./Globals";
import {BottomSheetMenu} from "./scripts/menus/BottomSheetMenu";
import {CreateRoutesMenu} from "./scripts/menus/CreateRoutesMenu";
const container = document.getElementById('map-container');

utils.map = new Map(container);
utils.map.init();

components.input.createSearchBox(container);

menus.createRoutesMenu = new CreateRoutesMenu(container);

menus.bottomSheetMenu = new BottomSheetMenu(container);
menus.bottomSheetMenu.init();


utils.map.requestLocationPermission();
