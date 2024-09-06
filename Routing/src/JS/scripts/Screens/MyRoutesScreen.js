export class MyRoutesScreen {
    constructor(container) {
        this.container = container;
        this.screen = null;
        this.darkBackground = null;
    }

    init() {
        this.screen = document.createElement('div');
        this.screen.setAttribute('id', 'my-routes-screen');

        const header = this.createHeader();
        const body = this.createBody();
        const footer = this.createFooter();

        this.screen.appendChild(header);
        this.screen.appendChild(body);
        this.screen.appendChild(footer);

        this.darkBackground = document.createElement('div');
        this.darkBackground.setAttribute('id', 'dark-background');

        this.darkBackground.appendChild(this.screen);

        this.container.appendChild(this.darkBackground);
    }

    createHeader() {
        const header = document.createElement('div');
        header.setAttribute('id', 'my-routes-header');

        const label = document.createElement('span');
        label.innerHTML = 'Minhas rotas';

        const exitButton = this.createExitButton();

        header.append(label, exitButton);
        return header;
    }

    createBody() {
        const body = document.createElement('div');
        body.setAttribute('id', 'my-routes-body');
        // Add content to the body as needed
        return body;
    }

    createFooter() {
        const footer = document.createElement('div');
        footer.setAttribute('id', 'my-routes-footer');

        const selectRouteButton = this.createSelectRouteButton();
        footer.appendChild(selectRouteButton);
        return footer;
    }

    createExitButton() {
        const button = document.createElement('div');
        button.setAttribute('id', 'exit-my-routes-button');
        button.addEventListener('click', () => this.exit());

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fa-solid fa-x');

        button.appendChild(icon);
        return button;
    }

    createSelectRouteButton() {
        const button = document.createElement('div');
        button.setAttribute('id', 'select-route-button');
        button.addEventListener('click', () => this._selectRoute());

        const label = document.createElement('span');
        label.innerHTML = 'Selecionar está rota'
        button.appendChild(label);
        return button;
    }

    _selectRoute() {
        console.log('calabreso')
    }

    exit() {
        if (this.darkBackground) {
            this.darkBackground.remove();
        }
    }
}
