export class CreateRoutingButton { 
    /**
     * 
     * @param {HTMLElement} container 
     */
    constructor(container) {
        this.container = container;
    }

    init() {
        const button = document.createElement('div');
        button.setAttribute('id', 'create-routing-button');

        button.addEventListener('click', () => {
            console.log('alexandre');
        })

        this.container.appendChild(button);
    }
}