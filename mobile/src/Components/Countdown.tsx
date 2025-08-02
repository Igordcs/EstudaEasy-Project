import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../colors';
import { CountdownContext } from '../contexts/Countdown/countdownContext';
import { fonts } from '../fonts';
import { TimePicker } from './TimePicker';


export const Countdown = () => {
    const {setIsActive, isActive, screenState, setScreenState, time, setTime} = React.useContext(CountdownContext);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [leftMinute, rightMinute] = String(minutes).padStart(2, '0').split('');
    const [leftSecond, rightSecond] = String(seconds).padStart(2, '0').split('');

    return !isActive ? <TimePicker initial={25} onUpdate={setTime} color={Colors.title} /> : (
        <View>
            <Text style={{...fonts.countdownText, color: screenState === 'SHORTBREAK' ? Colors.awardButton : Colors.title}}>{`${leftMinute}${rightMinute}:${leftSecond}${rightSecond}`}</Text>
        </View>
    )
}