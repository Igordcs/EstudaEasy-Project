import React from 'react';
import { AuthProvider } from './auth/authContext';
import { CountdownProvider } from './Countdown/countdownContext';
import { DeckProvider } from './Deck/DeckContext';
import { HomeProvider } from './Home/homeContext';
import { LevelProvider } from './Level/levelContext';
import { QuizProvider } from './quiz/quizContext';
import { TaskProvider } from './Tasks/taskContext';

export const ContextsProvider: React.FC = ({children}) => {
    return (
        <AuthProvider>
            <HomeProvider>
                <TaskProvider>
                    <CountdownProvider>
                        <LevelProvider>
                            <QuizProvider>
                                <DeckProvider>
                                    {children}
                                </DeckProvider>
                            </QuizProvider>
                        </LevelProvider>
                    </CountdownProvider>
                </TaskProvider>
            </HomeProvider>
        </AuthProvider>
    )
}