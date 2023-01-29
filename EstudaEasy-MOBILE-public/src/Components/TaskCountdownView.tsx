import React from 'react';
import { View, Text, Animated } from 'react-native';
import { fonts } from '../fonts';

interface TaskProps {
    title: string,
    duration: number,
}

export const TaskCountdownView = (props: TaskProps) => {

    return (
        <Animated.View style={{height: 72, backgroundColor: '#516CB2', paddingVertical: 8, paddingHorizontal: 32, borderRadius: 8, marginBottom: 32}}>
            <Text style={{...fonts.taskText, color: '#FFFFFF'}}>{props.title}</Text>
            <Text style={{...fonts.taskText, color: '#D3DAEB'}}>{props.duration}{props.duration > 1 ? ' Minutos' : ' Minuto'}</Text>
        </Animated.View>
    )
} 