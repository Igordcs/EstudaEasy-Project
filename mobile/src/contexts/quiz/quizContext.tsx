import React, {createContext, Dispatch, SetStateAction} from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { getQuestion } from '../../api/Quiz/quiz';

interface OptionType {
    id: number,
    text: string,
    correct: boolean,
}

interface QuestionProps {
    statement: string,
    alternatives: Array<OptionType>
}

interface QuizProps {
    questions?: Array<QuestionProps>;
    loading: boolean;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    loadQuestions(): Promise<void>
}

export const QuizContext = createContext<QuizProps>({} as QuizProps);

export const QuizProvider: React.FC = ({children}) => {
    const [questions, setQuestions] = React.useState<Array<QuestionProps>>();
    const [loading, setLoading] = useState(false);

    async function loadQuestions() {
        setLoading(true);
        const content = await getQuestion();

        if(content) {
            setQuestions(content);
            setLoading(false);
        }
    }

    return (
        <QuizContext.Provider
            value={{
                questions, 
                loading, 
                setLoading, 
                loadQuestions
            }}>
            {children}
        </QuizContext.Provider>
    );
};
