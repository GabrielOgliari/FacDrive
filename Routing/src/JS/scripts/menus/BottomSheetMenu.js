import {components, utils} from "../../Globals";
import {MyRoutesScreen} from "../Screens/MyRoutesScreen";

export class BottomSheetMenu {
    constructor(container) {
        this.container = container;
        this.bottomSheet = null;
        this.expandedButton = null;
        this.expandedMenu = this.expandedMenu.bind(this);
    }

    init() {
        this.createExpandedButton();

        this.bottomSheet = document.createElement('div');
        this.bottomSheet.setAttribute('id', 'bottom-sheet-menu');
        const headerMenu = document.createElement('div');
        headerMenu.setAttribute('id', 'header-bottom-sheet');
        const labelMenu = document.createElement('span');
        labelMenu.innerHTML = 'Menu de rotas';
        headerMenu.append(labelMenu);

        const bodyMenu = document.createElement('div');

        bodyMenu.setAttribute('id', 'body-bottom-sheet')

        const myRoutesButton = this.createMyRoutesButton();
        const createRouterButton = this.createCreateRouterButton();
        const betterRouterButton = this.createBetterRouterButton();
        const findRideButton = this.createFindRideButton();

        bodyMenu.append(myRoutesButton, createRouterButton, betterRouterButton, findRideButton);

        this.bottomSheet.append(headerMenu, bodyMenu);
        this.container.appendChild(this.bottomSheet);
    }

    exit() {
        this.bottomSheet.remove();
    }

    createExpandedButton() {
        const buttonOptions = {
            icon: 'fa-solid fa-bars',
            class: 'expanded-button',
            event: this.expandedMenu
        };
        this.expandedButton = components.button.circleButton(buttonOptions)
        this.container.appendChild(this.expandedButton);
    }

    createMyRoutesButton() {
        const buttonOptions = {
            icon: 'fa-solid fa-map',
            class: 'medium-button blue',
            label: 'Minhas rotas',
            event: () => (new MyRoutesScreen(this.container).init())
        }
        return components.button.mediumButton(buttonOptions);
    }

    createCreateRouterButton() {
        const buttonOptions = {
            icon: 'fa-solid fa-plus',
            class: 'medium-button orange',
            label: 'Criar rota',
            event: this.expandedMenu
        }
        return components.button.mediumButton(buttonOptions);
    }

    createBetterRouterButton() {
        const buttonOptions = {
            icon: 'fa-solid fa-road-circle-check',
            class: 'medium-button green',
            label: 'Melhor caminho',
            event: () => {
                this._showBestRoute()
                this.expandedMenu()
            }
        }
        return components.button.mediumButton(buttonOptions);
    }

    createFindRideButton() {
        const buttonOptions = {
            icon: 'fa-solid fa-magnifying-glass',
            class: 'medium-button blue',
            label: 'Encontrar carona',
            event: this.expandedMenu
        }
        return components.button.mediumButton(buttonOptions);
    }

    expandedMenu() {
        this.bottomSheet.classList.toggle('expanded');
        this.expandedButton.classList.toggle('up-button');
    }

    _showBestRoute() {
        console.log('fui clicado')
        if (utils.hasGeolocation) {
            utils.map.getBestRoute();
            return;
        }
        utils.map.requestLocationPermission();
    }

    _saveBestRoute() {

    }
}
