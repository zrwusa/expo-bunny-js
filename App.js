import {Platform} from "react-native";

export {default} from "./src/index";

if (__DEV__ && Platform.OS !== 'web') {
  // todo expo-notifications gets an error
  // global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  // global.WebSocket = global.originalWebSocket || global.WebSocket;
}
