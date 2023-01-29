import React from 'react';
import {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Colors} from '../colors';
import {AuthContext} from '../contexts/auth/authContext';
import {AppRoutes} from './app.routes';
import {AuthRoutes} from './auth.routes';

const Routes: React.FC = () => {
  const {signed, loading} = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.backgroundOnboarding,
        }}>
        <ActivityIndicator color="#fff" size={48} />
      </View>
    );
  }

  return signed ? <AuthRoutes /> : <AppRoutes />;
};

export default Routes;
