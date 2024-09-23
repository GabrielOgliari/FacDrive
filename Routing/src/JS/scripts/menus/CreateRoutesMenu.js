import {route, utils} from "../../Globals";

export class CreateRoutesMenu {

    constructor(container) {
        this.container = container;
        this.distance = null;
        this.hideBottomSheetMenu = this.hideBottomSheetMenu.bind(this);
        this.showBottomSheetMenu = this.showBottomSheetMenu.bind(this);
        this.saveRoute = this.saveRoute.bind(this);
    }

    init() {
        this.hideBottomSheetMenu();
        route.createRouteIsActive = true;

        this.menuContainer = document.createElement('div');
        this.menuContainer.setAttribute('id', 'routes-menu-container');
        const distanceComponent = this.createDistanceComponent();
        const saveButton = this.createSaveButton();
        const exitButton = this.createExitButton();

        const bottomButtonsContainer = document.createElement('div');
        bottomButtonsContainer.setAttribute('class', 'create-routes-bottom-buttons')
        bottomButtonsContainer.append(exitButton, saveButton);

        this.verticalMenuContainer = this.createVerticalMenuButtons();

        this.menuContainer.append(distanceComponent, bottomButtonsContainer);
        this.container.append(this.menuContainer, this.verticalMenuContainer);
    }

    exit() {
        route.createRouteIsActive = false;
        this.showBottomSheetMenu();
        this.menuContainer.remove();
        this.verticalMenuContainer.remove();
    }

    hideBottomSheetMenu() {
        const circleButton = document.getElementById('circle-button');
        circleButton.classList.remove('up-button')
        circleButton.classList.add('hide')

        const bottomSheetMenu = document.getElementById('bottom-sheet-menu');
        bottomSheetMenu.classList.remove('expanded')
    }

    showBottomSheetMenu() {
        const circleButton = document.getElementById('circle-button');
        circleButton.classList.remove('hide')
        circleButton.classList.add('up-button')

        const bottomSheetMenu = document.getElementById('bottom-sheet-menu');
        bottomSheetMenu.classList.add('expanded')
    }

    createDistanceComponent() {
        const distanceComponent = document.createElement('div');
        distanceComponent.setAttribute('class', 'distance-component');

        this.distance = document.createElement('span');
        this.distance.setAttribute('class', 'label-distance');
        this.distance.innerHTML = "0 KM";

        distanceComponent.appendChild(this.distance);
        return distanceComponent
    }

    createSaveButton() {
        const saveButton = document.createElement('div');
        saveButton.setAttribute('class', 'create-route-button save');

        const buttonName = document.createElement('span')
        buttonName.innerHTML = 'Salvar rota';

        saveButton.appendChild(buttonName);
        saveButton.addEventListener('click', this.saveRoute)
        return saveButton;
    }

    createExitButton() {
        const exitButton = document.createElement('div');
        exitButton.setAttribute('class', 'create-route-button exit');

        const buttonName = document.createElement('span')
        buttonName.innerHTML = 'Sair';

        exitButton.appendChild(buttonName);
        exitButton.addEventListener('click', () => { this.exit() })
        return exitButton;
    }

    createVerticalMenuButtons() {
        const verticalContainer = document.createElement('div');
        verticalContainer.setAttribute('id', 'vertical-create-route-container');

        const completeRouteButton = this.createCompleteRouteButton();
        const backLastPointButton = this.createBackLastPointButton();
        const restartButton = this.createRestartButton();

        const buttonsContainer = document.createElement('div');
        buttonsContainer.setAttribute('class', 'vertical-buttons-container')
        buttonsContainer.append(completeRouteButton, backLastPointButton, restartButton);

        const openVerticalContainerButton = document.createElement('div');
        openVerticalContainerButton.setAttribute('class', 'open-vertical-button-container');
        const iconOpen = document.createElement('i');
        iconOpen.setAttribute('class', 'fa-solid fa-chevron-left')

        openVerticalContainerButton.addEventListener('click', () => {
            verticalContainer.classList.toggle('expanded')
            if (iconOpen.classList.contains('fa-chevron-left')) {
                iconOpen.classList.remove('fa-chevron-left');
                iconOpen.classList.add('fa-chevron-right');
            } else {
                iconOpen.classList.remove('fa-chevron-right');
                iconOpen.classList.add('fa-chevron-left');
            }
        })

        openVerticalContainerButton.appendChild(iconOpen);
        verticalContainer.append(openVerticalContainerButton, buttonsContainer);
        return verticalContainer;
    }

    createCompleteRouteButton() {
        const completeRoute = document.createElement('div');
        completeRoute.setAttribute('class', 'create-route-vertical-button complete');

        const buttonName = document.createElement('span')
        buttonName.innerHTML = 'Completar caminho';

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fa-solid fa-thumbtack')

        completeRoute.append(buttonName, icon);
        completeRoute.addEventListener('click', this.exit)
        return completeRoute;
    }

    createBackLastPointButton() {
        const backLastPoint = document.createElement('div');
        backLastPoint.setAttribute('class', 'create-route-vertical-button last-point');

        const buttonName = document.createElement('span')
        buttonName.innerHTML = 'Voltar ponto';

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fa-solid fa-rotate-left')

        backLastPoint.append(buttonName, icon);
        backLastPoint.addEventListener('click', this.exit)
        return backLastPoint;
    }

    createRestartButton() {
        const restartButton = document.createElement('div');
        restartButton.setAttribute('class', 'create-route-vertical-button restart');

        const buttonName = document.createElement('span')
        buttonName.innerHTML = 'Reiniciar';

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fa-solid fa-repeat')

        restartButton.append(buttonName, icon);
        restartButton.addEventListener('click', this.exit)
        return restartButton;
    }

    saveRoute() {

    }

    updateDistanceComponent() {
        const distance = utils.map.calculateCoordinatesDistance(route.coordinates);
        this.distance.innerHTML = distance + " KM";
    }
}