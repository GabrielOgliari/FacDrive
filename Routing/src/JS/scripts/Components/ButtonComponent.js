export class ButtonComponent {

    circleButton(options) {
        const button = document.createElement('div');
        button.setAttribute('id', 'circle-button');
        button.setAttribute('class', options.class);
        button.addEventListener('click', options.event);
        const icon = document.createElement('i');
        icon.setAttribute('class', options.icon);

        button.append(icon);
        return button;
    }

    mediumButton(options) {
        const button = document.createElement('div');
        button.setAttribute('id', 'generic-button');
        button.setAttribute('class', options.class);
        button.addEventListener('click', options.event);

        const buttonLabel = document.createElement('span');
        buttonLabel.innerHTML = options.label;

        const icon = document.createElement('i');
        icon.setAttribute('class', options.icon);

        button.append(buttonLabel, icon);
        return button;
    }
}
