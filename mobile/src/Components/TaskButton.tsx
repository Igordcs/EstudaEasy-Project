import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import IconFa from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../colors';
import { CountdownContext } from '../contexts/Countdown/countdownContext';
import { TaskContext } from '../contexts/Tasks/taskContext';
import { fonts } from '../fonts';

interface TaskProps {
  id: number,
  title: string,
  duration: number,
  shortBreak: number,
  completed: boolean,
}


export const TaskButton = (props: TaskProps) => {
  const {isActive, setTime, setShortBreak, setIsActive, setTaskId, recordStartTime} = React.useContext(CountdownContext)
  const {tasks} = React.useContext(TaskContext)

  const Navigation = useNavigation();

  const handleNavigation = async () => {
    if(isActive) {
      Alert.alert('Há uma tarefa em andamento!')
      return Navigation.navigate('Pomodoro');
    }

    setShortBreak(props.shortBreak);
    recordStartTime(props.duration);
    setIsActive(true);
    setTaskId(props.id)

    return Navigation.navigate('Pomodoro');
  }

  return (
    <View style={styles.background}>
      <View style={styles.contentWrapper}>
        <View style={[styles.square, {backgroundColor: props.completed ? Colors.green : '#BBC9EF'}]}></View>
        <View>
          <Text style={{...fonts.taskText, color: Colors.title}}>{props.title}</Text>
          <Text style={{...fonts.taskText, color: Colors.title}}>{props.duration}{' minutos'}</Text>
        </View>
      </View>
      <RectButton style={styles.playButton} onPress={handleNavigation}>
        <IconFa name="play" size={12} color="#fff"/>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff', 
        width: '100%', 
        height: 72, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    contentWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    square: {
        width: 20, 
        height: 20, 
        marginRight: 16
    },
    playButton: {
        width: 32, 
        height: 32, 
        borderRadius: 32 / 2, 
        backgroundColor: Colors.title, 
        alignItems: 'center', 
        justifyContent: 'center',
    }
})