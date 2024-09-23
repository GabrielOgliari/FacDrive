import { ButtonComponent } from "./scripts/Components/ButtonComponent";
import {InputComponent} from "./scripts/Components/InputComponent";

export const components = {
    button: new ButtonComponent(),
    input: new InputComponent()
}

/**
 * @typedef {Object} Utils
 * @property {Map} map - Instance of the Map class
 * @property {boolean} hasGeolocation - Has user geolocation
 * @property {Object} userPosition - User's geolocation
 * @property {number} userPosition.latitude - Latitude of the user's position
 * @property {number} userPosition.longitude - Longitude of the user's position
 */

/** @type {Utils} */
export const utils = {};

/**
 *
 * @typedef {Object} Route
 * @property {boolean} createRouteIsActive - Flag mode is active
 * @property {array} coordinates - Route coordinates
 */

/**
 *
 * @type {Route}
 */
export const route = {
    createRouteIsActive: false,
    coordinates: []
};


/**
 *
 * @typedef {Object} Menus
 * @property {BottomSheetMenu} bottomSheetMenu - instance of BottomSheet menu
 * @property {CreateRoutesMenu} createRoutesMenu - instance of CreateRoutesMenu menu
 */

/**
 *
 * @type {Menus}
 */
export const menus = {}