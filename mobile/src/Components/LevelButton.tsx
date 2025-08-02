import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Colors } from '../colors';
import { fonts } from '../fonts';
import ProgressBar from './ProgressBar';

interface LevelProps {
    level: number,
    exp: number,
}

const WIDTH = Dimensions.get('window').width;

export const LevelButton = (props: LevelProps) => {

    const experienceToNextLevel = Math.pow((Number(props.level) + 1) * 4, 2);

    const progress = Math.round((props.exp * 100 ) / experienceToNextLevel);

    console.log(experienceToNextLevel)

    return (
        <View style={styles.background}>
            <View style={styles.textWrapper}>
                <Text style={{...fonts.levelText, color: '#fff'}}>Level {props.level}</Text>
                <Text style={{...fonts.levelText, color: '#fff'}}>{props.exp} XP</Text>
            </View>
            <View style={styles.progressWrapper}>
                <View style={[styles.progress, {width: `${progress}%` }]}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        marginVertical: 12,
        backgroundColor: Colors.boldBlue,
        borderRadius: 12,
        height: 100,
        width: '90%',
        alignSelf: 'center',
        padding: 16,
        justifyContent: 'space-between'
    },
    textWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressWrapper: {
        width: '100%',
        height: 8,
        borderRadius: 12,
        backgroundColor: '#fff'
    },
    progress: {
        height: 8,
        borderRadius: 12,
        backgroundColor: '#ffe26f'
    }
})