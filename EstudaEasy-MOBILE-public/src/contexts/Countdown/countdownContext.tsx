import React, {createContext, Dispatch, SetStateAction, useRef} from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { TaskContext } from '../Tasks/taskContext';
import { AppState } from "react-native"
import * as dateFns from "date-fns";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface CountdownProps {
    isActive: boolean,
    screenState: string,
    time: number,
    shortBreak: number,
    taskId: number,
    setIsActive: React.Dispatch<SetStateAction<boolean>>,
    setScreenState: React.Dispatch<SetStateAction<string>>,
    setTime: React.Dispatch<SetStateAction<number>>,
    setShortBreak: React.Dispatch<SetStateAction<number>>,
    setTaskId: React.Dispatch<SetStateAction<number>>,
    resetCountdown(): void,
    recordStartTime(duration?: number, title?: string, body?: string): Promise<void>
}

export const CountdownContext = createContext<CountdownProps>({} as CountdownProps);

let countdownTimeout: NodeJS.Timeout;

export const CountdownProvider: React.FC = ({children}) => {
    const [taskId, setTaskId] = useState(-1)
    const [time, setTime] = useState(25);
    const [shortBreak, setShortBreak] = useState(5);
    const [isActive, setIsActive] = useState(false);
    const [screenState, setScreenState] = useState('INITIAL');
    const {completeTask} = React.useContext(TaskContext);
    const appState = React.useRef(AppState.currentState);
    const [hasFinished, setHasFinished] = useState(false); 
    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    async function resetCountdown() {
        clearTimeout(countdownTimeout);
        await Notifications.cancelAllScheduledNotificationsAsync();
        await AsyncStorage.removeItem("@start_time");
        setScreenState('INITIAL')
        setIsActive(false);
        setTime(25);
        setShortBreak(5);
        setTaskId(-1);
    }

    const recordStartTime = async (duration: number = time, title?: string, body?: string) => {
        try {
            clearTimeout(countdownTimeout);
            const now = new Date();
            const data = dateFns.addSeconds(now, duration * 60);
            await AsyncStorage.setItem("@start_time", data.toISOString());
            setTime(duration * 60);
            schedulePushNotification(duration, title || 'Seu tempo de foco terminou!', body || 'Abra o app para iniciar sua pequena pausa!');
        } catch (err) {
            // TODO: handle errors from setItem properly
            console.warn(err);
        }
    };

    React.useEffect(() => {
        if(isActive && time > 0 ){
            countdownTimeout = setTimeout(async () => {
                const elapsed = await getElapsedTime();
                if(elapsed > 0)
                    setTime(elapsed);
            }, 1000)
        } else if (isActive && time === 0 && screenState === 'INITIAL') {
            setScreenState('SHORTBREAK');
            recordStartTime(shortBreak, 'Sua pequena pausa acabou!', 'Inicie outro ciclo');
            taskId !== -1 && completeTask(taskId);
        } else if (isActive && time === 0 && screenState === 'SHORTBREAK'){
            setScreenState('INITIAL');
            setTime(25);
            setShortBreak(5);
            setIsActive(false);
            setHasFinished(true);
        }
    }, [isActive, time]);

    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange);
        return () => AppState.removeEventListener("change", handleAppStateChange);
        }, []);

        const handleAppStateChange = async (nextAppState: any) => {
        if (appState.current.match(/inactive|background/) &&
            nextAppState === "active") {
            // We just became active again: recalculate elapsed time based 
            // on what we stored in AsyncStorage when we started.
            const elapsed = await getElapsedTime();
            // Update the elapsed seconds state
            if(elapsed > 0) {
                setTime(elapsed);
            }
        }
        appState.current = nextAppState;
        };
      
    const getElapsedTime = async () => {
    try {
        const startTime = await AsyncStorage.getItem("@start_time");
        if(startTime){
            const now = new Date();
            const seconds = dateFns.differenceInSeconds(Date.parse(startTime), now);

            if(seconds <= 0){
                setTime(0);
                return 0;
            }

            return seconds;
        }
        return 0;
    } catch (err) {
        // TODO: handle errors from setItem properly
        console.warn(err);
        return 0;
    }
    };

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

    async function schedulePushNotification(duration: number, title: string, body: string) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `👌 | ${title}`,
            body: body,
            data: { data: 'goes here' },
          },
          trigger: { seconds: duration * 60 },
        });
      }

    return (
        <CountdownContext.Provider
            value={{
                isActive,
                screenState,
                time,
                shortBreak,
                taskId,
                setIsActive,
                setScreenState,
                setTime,
                setShortBreak,
                setTaskId,
                resetCountdown,
                recordStartTime
            }}>
            {children}
        </CountdownContext.Provider>
    );
};
