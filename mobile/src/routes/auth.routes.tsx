import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from '../screens/Onboarding/Onboarding';
import Home from '../screens/Home/Home';
import QuizFinish from '../screens/QuizFinish/QuizFinish';
import Quiz from '../screens/Quiz/Quiz';
import Notes from '../screens/Notes/Notes';
import AddNotes from '../screens/Notes/AddNotes';
import {useContext} from 'react';
import {AuthContext} from '../contexts/auth/authContext';
import { ContentClasses } from '../screens/ContentClasses';
import { Resume } from '../screens/ContentClasses/resume';
import { Pomodoro } from '../screens/Pomodoro';
import { Profile } from '../screens/Profile/Profile';
import { FlashcardHome } from '../screens/Flashcards';
import { AddFlashCardHome } from '../screens/Flashcards/addFlashCard';
import { SeeDeck } from '../screens/Flashcards/seeDeck';
import { AddDeck } from '../screens/Flashcards/addFlashCard/addDeck';
import { SeeFlashCards } from '../screens/Flashcards/seeFlashCards';
import { PlayingFlashCards } from '../screens/Flashcards/playing';

const Stack = createStackNavigator();

export const AuthRoutes: React.FC = () => {
  const {firstLogin} = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!firstLogin && (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
      )}

      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ContentClasses"
        component={ContentClasses}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Resume"
        component={Resume}
        options={{headerShown: false}}
      />

      {/* {Quiz stack} */}
      <Stack.Screen
        name="QuizFinish"
        component={QuizFinish}
        options={{headerShown: false}}
      />

      {/* {HomeCards stack} */}
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addNotes"
        component={AddNotes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pomodoro"
        component={Pomodoro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      {/* HomeCards STACK */}
      
      {/* FLASHCARDS STACK */}
      <Stack.Screen
        name="FlashCardHome"
        component={FlashcardHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddFlashCardHome"
        component={AddFlashCardHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeeDeck"
        component={SeeDeck}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddDeck"
        component={AddDeck}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="seeFlashCards"
        component={SeeFlashCards}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlayingFlashCards"
        component={PlayingFlashCards}
        options={{headerShown: false}}
      />
      {/* FLASHCARDS STACK */}
    </Stack.Navigator>
  );
};
