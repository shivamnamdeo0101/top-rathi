/**
 * @format
 */

import { Alert, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle ,EventType} from '@notifee/react-native';



async function onDisplayNotification(payload) {

    console.log(JSON.stringify(payload), "Hiiiiiiiiiiiiiiiiiiiiiiiii")

    // Create a channel
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });
    // Display a notification
    await notifee.displayNotification({
        title: payload.data.title,
        body: payload.data.body,
        android: {
            channelId,
            style: { type: AndroidStyle.BIGPICTURE, picture: 'https://wallup.net/wp-content/uploads/2017/03/28/424982-digital_art-landscape-trees-night-anime_girls-sky-748x466.png' },
        },
    });
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    onDisplayNotification(remoteMessage)

});

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => backgroundNotificationHandler)

