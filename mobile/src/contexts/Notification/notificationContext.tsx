import React, {createContext, Dispatch, SetStateAction, useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


interface NotificationProps {
    schedulePushNotification(duration: number): Promise<void>;
}

export const NotificationContext = createContext<NotificationProps>({} as NotificationProps);

export const NotificationProvider: React.FC = ({children}) => {
    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(Boolean(notification));
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function schedulePushNotification(duration: number) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Tempo de foco terminado! 👌",
                body: `Sua pequena pausa começou!`,
                data: { data: 'goes here' },
            },
            trigger: { seconds: duration },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }

    return (
        <NotificationContext.Provider
            value={{schedulePushNotification}}>
            {children}
        </NotificationContext.Provider>
    );
};
