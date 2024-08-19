import { Map } from "./scripts/Map";
import { CreateRoutingButton } from "./scripts/Components/Button/CreateRouting";
const container = document.getElementById('map-container');

const map = new Map(container);
map.init();
const button = new CreateRoutingButton(container);
button.init();

