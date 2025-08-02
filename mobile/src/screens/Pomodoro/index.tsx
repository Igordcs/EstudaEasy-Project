import React from 'react';
import { View, StyleSheet} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Colors } from '../../colors';
import { Countdown } from '../../Components/Countdown';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Head from '../../Components/Head';
import { CountdownContext } from '../../contexts/Countdown/countdownContext';
import { TaskContext } from '../../contexts/Tasks/taskContext';
import { TaskCountdownView } from '../../Components/TaskCountdownView';

export const Pomodoro = () => {
    const {resetCountdown, recordStartTime, setIsActive, taskId, isActive} = React.useContext(CountdownContext);
    const {tasks} = React.useContext(TaskContext);

    async function handleResetCountdown() {
        await resetCountdown();
    }

    function handleStartCountdown() {
        if(isActive) 
            return null

        recordStartTime();
        setIsActive(true);
    }

    return (
        <View style={[styles.background, {backgroundColor: Colors.blueBackground }]}>
            <Head title="Pomodoro" description="Divida seus trabalhos em pequenas tarefas de 25 minutos e depois descanse, durante pouco tempo." />
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Countdown />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: taskId !== -1 ? 12 : 140}}> 
                <RectButton style={styles.pauseButton} onPress={handleResetCountdown}>
                    <IconFa name="stop" size={20} color={Colors.title} />
                </RectButton>
                <RectButton style={styles.playButton} onPress={handleStartCountdown}>
                    <IconFa name="play" size={20} color="#fff" />
                </RectButton>
            </View>
            {taskId !== -1 && (
                <TaskCountdownView title={tasks[taskId].title} duration={tasks[taskId].duration} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'space-between'
    },
    pauseButton: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderColor: Colors.title,
        borderWidth: 1,
    },
    playButton: {
        backgroundColor: Colors.title,
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
})