import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
    {
        channelId: "create-post",
        channelName: "Create Post",
        channelDescription: "Ativado quando posts serem criados",
        soundName: "default",
        importance: 4,
        vibrate: false,
    },
    _ => {}
);

const pushNotification = () => {
    PushNotification.localNotification({
        channelId: "create-post",
        title: "Post realizado com sucesso",
        message: "Estará visivel no seu perfil",
    });
}

export { pushNotification };
