/**
 * @format
 */

import { Alert, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle ,EventType} from '@notifee/react-native';



async function onDisplayNotification(payload) {
    // Create a channel
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });
    // Display a notification
    await notifee.displayNotification({
        title: payload.notification.title,
        body: payload.notification.body,
        android: {
            channelId,
            style: { type: AndroidStyle.BIGPICTURE, picture: payload?.data?.url },
        },
    });
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(remoteMessage,"Index")
     onDisplayNotification(remoteMessage)

});

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => backgroundNotificationHandler)

