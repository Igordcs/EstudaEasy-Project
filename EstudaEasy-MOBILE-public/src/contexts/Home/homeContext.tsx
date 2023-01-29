import React, {createContext, Dispatch, SetStateAction} from 'react';
import {useState} from 'react';
import * as auth from '../../api/auth/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';
import {useEffect} from 'react';
import { Alert } from 'react-native';
import { getAllContents } from '../../api/Quiz/quiz';

interface ContentType {
    id: number,
    content_name: string,
    content_type: string,
}

interface DataType {
    exatas: Array<ContentType>,
    humanas: Array<ContentType>
}

interface HomeProps {
    data: DataType,
    loading: boolean,
    loadContents(): Promise<void>,
}

export const HomeContext = createContext<HomeProps>({} as HomeProps);

export const HomeProvider: React.FC = ({children}) => {
    const [data, setData] = useState<DataType>({} as DataType);
    const [loading, setLoading] = useState(false);

    async function loadContents() {
        setLoading(true);
        const storagedData = await AsyncStorage.getItem('@EstudaEasy:Data');

        if(storagedData) {
            setData(JSON.parse(storagedData));
            setLoading(false);
            return;
        }

        const dados: Array<ContentType> = await getAllContents();

        const exatas = dados.filter((item) => {
            if(item.content_type === 'Exatas'){
                return item
            }
        });
        const humanas = dados.filter((item) => {
            if(item.content_type === 'Humanas'){
                return item
            }
        });

        setData({exatas, humanas});
        await AsyncStorage.multiSet([
            ['@EstudaEasy:Data', JSON.stringify({exatas, humanas})],
        ]);
        setLoading(false);
    }

    useEffect(() => {
        async function loadStoragedValues() {
            setLoading(true)
            const storagedData = await AsyncStorage.getItem('@EstudaEasy:Data');

            if(storagedData) {
                setData(JSON.parse(storagedData));
                setLoading(false)
            }
            setLoading(true)
        }
        loadStoragedValues();
    }, [])

    return (
        <HomeContext.Provider
            value={{
                loading,
                data,
                loadContents
            }}>
            {children}
        </HomeContext.Provider>
    );
};
