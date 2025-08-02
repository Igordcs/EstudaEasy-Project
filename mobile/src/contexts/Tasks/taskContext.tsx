import React, {createContext, Dispatch, SetStateAction} from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { LevelContext } from '../Level/levelContext';

interface TaskType {
    title: string,
    duration: number,
    shortBreak: number,
    completed: boolean
}

interface TaskProps {
    tasks: Array<TaskType>,
    createTask(title: string, duration: number, shortBreak: number): Promise<void>,
    completeTask(index: number): Promise<void>,
    loadStoragedValues(): Promise<void>,
}

export const TaskContext = createContext<TaskProps>({} as TaskProps);

export const TaskProvider: React.FC = ({children}) => {
    const {addExp} = React.useContext(LevelContext);

    const [tasks, setTasks] = React.useState<Array<TaskType>>([])

    async function createTask(title: string, duration: number, shortBreak: number) {
        const storagedValues = await AsyncStorage.getItem('@EstudaEasy:Tasks');
        const task = {title, duration, shortBreak, completed: false};

        if(storagedValues) {
            const storaged = JSON.parse(storagedValues)
            const newTasks = [...storaged, task];
            
            await AsyncStorage.setItem('@EstudaEasy:Tasks', JSON.stringify(newTasks));
            setTasks(newTasks)
            return;
        }

        await AsyncStorage.setItem('@EstudaEasy:Tasks', JSON.stringify([task]));
        setTasks([task]);
    }

    async function completeTask(index: number) {
        const storagedTasks = await AsyncStorage.getItem('@EstudaEasy:Tasks');

        if(storagedTasks) {
            const array = JSON.parse(storagedTasks);
            array.splice(index, 1);
            await AsyncStorage.setItem('@EstudaEasy:Tasks', JSON.stringify(array));
        }
    }

    async function loadStoragedValues(){
        const storagedTasks = await AsyncStorage.getItem('@EstudaEasy:Tasks')

        if(storagedTasks) {
            setTasks(JSON.parse(storagedTasks));
            return;
        }
    }

    useEffect(() => {
        loadStoragedValues();
    }, [])

    return (
        <TaskContext.Provider
            value={{tasks, createTask, completeTask, loadStoragedValues}}>
            {children}
        </TaskContext.Provider>
    );
};
