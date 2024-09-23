export class  InputComponent {
    createSearchBox(container) {
        const searchBox = document.createElement('input');
        searchBox.setAttribute('id', 'pac-input');
        searchBox.setAttribute('class', 'controls');
        searchBox.setAttribute('type', 'text');
        searchBox.setAttribute('placeholder', 'Pesquisar...');

        container.appendChild(searchBox);
    }
}
