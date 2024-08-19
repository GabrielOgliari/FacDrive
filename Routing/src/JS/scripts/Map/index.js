import { Loader } from "@googlemaps/js-api-loader"
export class Map {
    constructor(container) {
        this.container = container;
        this.map = null;
    }

    async init() {
        await this.loadMap();
        this.initMapEvents();
    }

    async loadMap() {
        const loader = new Loader({
            apiKey: "AIzaSyCplFtJUTMPVqb_Pi39bW5dgkvxNTV31cw",
            version: "weekly",
        });

        try {
            const { Map } = await loader.importLibrary("maps");

            this.map = new Map(document.getElementById("map"), {
                center: { lat: -27.093898594238937, lng: -52.6664602479717 },
                zoom: 20,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                scaleControl: false,
                rotateControl: false,
                fullscreenControl: false,
            });
        } catch (error) {
            console.error("Erro ao carregar a biblioteca Google Maps:", error);
        }

    }

    initMapEvents() {
        this.map.addListener("click", function (event) {
            const latLng = event.latLng;
            const lat = latLng.lat();
            const lng = latLng.lng();

            console.log(lat, lng);
        });
    }
}