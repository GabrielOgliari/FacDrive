import WebView from "react-native-webview";

export const WebViewMap = () => {
    const url = 'http://192.168.15.8:3000';
    return (
        <WebView
            source={{ uri: url }}
            cacheEnabled={false}
        />
    )
}
