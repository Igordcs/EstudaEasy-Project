import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginOrRegister from '../screens/Auth/LoginOrRegister';

const Stack = createStackNavigator();

export const AppRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginOrRegister"
        component={LoginOrRegister}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
