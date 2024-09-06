import WebView from "react-native-webview";

export const WebViewMap = () => {
    //aqui vou passar a url do meu front de roteamento
    const url = '';
    return (
        <WebView
            source={{ uri: url }}
        />
    )
}
