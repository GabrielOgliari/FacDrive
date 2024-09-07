export class  InputComponent {
    createSearchBox() {
        const searchBox = document.createElement('input');
        searchBox.setAttribute('id', 'pac-input');
        searchBox.setAttribute('class', 'controls');
        searchBox.setAttribute('type', 'text');
        searchBox.setAttribute('placeholder', 'Pesquisar...');

        return searchBox;
    }
}
