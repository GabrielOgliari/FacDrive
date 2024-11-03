import WebView from 'react-native-webview';

export const WebViewMap = ({ userID }: { userID: number }) => (
    <WebView
        source={{
            uri: `https://routing-beta-nine.vercel.app/?userID=${userID}`,
        }}
        cacheEnabled={false}
    />
);
