import styled from 'styled-components/native';
import WebView from "react-native-webview";
import {height, width} from "../../../../utils/dimensions.ts";

export const Body = styled(WebView)`
    flex: 1;
    width: ${width}px;
    height: ${height - (height*0.07)}px;
`;
