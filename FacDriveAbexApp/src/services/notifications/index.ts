import PushNotification from 'react-native-push-notification';
import {io, Socket} from "socket.io-client";
import {notificationProp} from "./types";

export class NotificationManager {
    private socket: Socket;
    constructor(userId: number | string) {
        PushNotification.createChannel(
            {
                channelId: "routing-notify",
                channelName: "ROUTING",
                channelDescription: "ROUTING NOTIFY",
                soundName: "default",
                importance: 4,
                vibrate: false,
            },
            _ => {}
        );

        this.socket = io("https://facdrive-socket.glitch.me", {
            transports: ['websocket'],
            query: { userId }
        });

        this.socket.on("connect", () => {
            console.log("Conectado ao servidor");
        });

        this.socket.on("disconnect", () => {
            console.log("Desconectado do servidor");
        });

        this.socket.on("messageFromServer", (data) => {
            const dataParsed = JSON.parse(data);
            this.onMessageReceived(dataParsed);
        });
    }

    private dispatchNotification(data: notificationProp) {
        PushNotification.localNotification({
            channelId: "routing-notify",
            title: data.title,
            message: data.text
        });
    }

    onMessageReceived(data: notificationProp) {
        this.dispatchNotification(data);
    }

    sendMessage(message: notificationProp) {
        this.socket.emit("message", JSON.stringify(message));
    }
}
