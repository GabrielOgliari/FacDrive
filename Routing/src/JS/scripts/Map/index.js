import { Loader } from "@googlemaps/js-api-loader"
import {utils} from "../../Globals";

export class Map {
    constructor(container) {
        this.container = container;
        this.map = null;
        this.directionsService = null;
        this.directionsRenderer = null;
        this.markers = [];
        this.waypoints = [];
        this.universityPosition = {lat: -27.09390800094124, lng: -52.66638176434375}
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
            const { Map, places  } = await loader.importLibrary("maps");
            const { SearchBox } = await loader.importLibrary("places");

            this.map = new Map(document.getElementById("map"), {
                center: { lat: -27.093898594238937, lng: -52.6664602479717 },
                zoom: 20,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                scaleControl: false,
                rotateControl: false,
                fullscreenControl: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT
                },
            });

            this.directionsService = new google.maps.DirectionsService();
            this.directionsRenderer = new google.maps.DirectionsRenderer();
            this.directionsRenderer.setMap(this.map);

            const input = document.getElementById("pac-input");
            const searchBox = new SearchBox(input);

            this.map.addListener("bounds_changed", () => {
                searchBox.setBounds(this.map.getBounds());
            });

            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                if (places.length === 0) {
                    return;
                }

                const place = places[0];

                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                if (place.geometry.viewport) {
                    this.map.fitBounds(place.geometry.viewport);
                } else {
                    this.map.setCenter(place.geometry.location);
                    this.map.setZoom(10);
                }
            });
        } catch (error) {
            console.error("Erro ao carregar a biblioteca Google Maps:", error);
        }

    }

    initMapEvents() {
        this.map.addListener("click", (event) => {
            const latLng = event.latLng;

            const marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                label: `${this.markers.length + 1}`,
            });

            this.markers.push(marker);

            if (this.markers.length > 1) {
                this.waypoints.push({
                    location: latLng,
                    stopover: true,
                });
            }

            if (this.markers.length > 1) {
                this.calculateAndDisplayRoute();
            }
        });
    }

    calculateAndDisplayRoute() {
        const start = this.markers[0].getPosition();
        const end = this.markers[this.markers.length - 1].getPosition();

        const waypoints = this.waypoints.slice(1, this.waypoints.length - 1);

        this.directionsService.route(
            {
                origin: start,
                destination: end,
                waypoints: waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.directionsRenderer.setDirections(response);
                } else {
                    console.error("Directions request failed due to " + status);
                }
            }
        );
    }

    clearRoutes() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];

        this.directionsRenderer.setDirections({ routes: [] });

        this.waypoints = [];
    }

    getBestRoute() {
        this.clearRoutes();
        const origin = { lat: utils.userPosition.latitude, lng: utils.userPosition.longitude };
        this.directionsService.route(
            {
                origin: origin,
                destination: this.universityPosition,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(response);
                    this.directionsRenderer.setDirections(response);

                    const route = response.routes[0];
                    const coordinates = [];

                    route.legs[0].steps.forEach(step => {
                        coordinates.push({
                            lat: step.start_location.lat(),
                            lng: step.start_location.lng()
                        });

                        const path = step.path || step.lat_lngs;
                        path.forEach(latlng => {
                            coordinates.push({
                                lat: latlng.lat(),
                                lng: latlng.lng()
                            });
                        });

                        coordinates.push({
                            lat: step.end_location.lat(),
                            lng: step.end_location.lng()
                        });
                    });

                    //aqui eu tenho todas as coordenadas e se eu criar um polilyne da exatamente o trajeto
                    console.log('Coordenadas extraídas:', coordinates);

                } else {
                    console.error("Directions request failed due to " + status);
                }
            }
        );
    }


    requestLocationPermission() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    utils.userPosition = {
                        latitude,
                        longitude
                    }
                    utils.hasGeolocation = true;
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.error("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.error("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.error("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            console.error("An unknown error occurred.");
                            break;
                    }
                    utils.hasGeolocation = false;
                }
            );
        }
    }
}
