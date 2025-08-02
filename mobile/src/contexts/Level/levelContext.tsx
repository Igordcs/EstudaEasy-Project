import React, {createContext} from 'react';
import { AuthContext } from '../auth/authContext';
import { addExpToUser } from '../../api/auth/auth';

interface LevelProps {
    progress: number | null,
    addExp(amount: number): Promise<void>,
}

export const LevelContext = createContext<LevelProps>({} as LevelProps);

export const LevelProvider: React.FC = ({children}) => {
    const {user, updateUser} = React.useContext(AuthContext);
    const experienceToNextLevel = Math.pow((Number(user?.level) + 1) * 4, 2);
    const progress = user && Math.round((Number(user?.experience) * 100 ) / experienceToNextLevel);

    async function addExp(amount: number) {
        if(!user){
            return;
        }

        let finalExperience = Number(user?.experience) + amount;
        const levels = getLevelGained(finalExperience);
        
        if(levels > 0) {
            const experienceToNextLevel = Math.pow((Number(user.level) + levels) * 4, 2)
            finalExperience =  finalExperience - experienceToNextLevel;
            const userLevel = Number(user.level) + levels;
            await addExpToUser(finalExperience, userLevel);
            updateUser(Number(finalExperience), Number(userLevel))
            return;
        }
        
        await addExpToUser(finalExperience);
        updateUser(Number(finalExperience), Number(user.level))
        return;
    }

    function getLevelGained(amount: number) {
        if(!user)
            return 0;

        let contador = 0;

        for(let i = 0; i < 10; i++){
            const NextLevel = Math.pow((Number(user.level) + i) * 4, 2);

            if(amount < NextLevel)
                break;

            contador = i
        }

        return contador;
    }


    return (
        <LevelContext.Provider value={{progress, addExp}}>
            {children}
        </LevelContext.Provider>
    );
};
