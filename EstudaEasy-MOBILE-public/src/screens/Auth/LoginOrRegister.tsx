import React from 'react';
import {StatusBar, Image, View, Dimensions, Text} from 'react-native';
import * as Styled from './Styled';

import HeroImg from '../../assets/LoginHero.png';
import {Colors} from '../../colors';
import Slide from '../Onboarding/Slide';
import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import Register from './Register';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const LoginOrRegister = () => {
  const navigation = useNavigation();
  const [screen, setScreen] = useState('INITIAL');

  return (
    <Styled.Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundOnboarding}
        />
      <Slide
        title="Dê início a sua jornada"
        description="Faça login ou cadastre-se para utilizar o app"
        background={Colors.backgroundOnboarding}
        >
        <View>
          <Image
            style={{width: WIDTH - 70, height: HEIGHT / 2.25}}
            resizeMode="contain"
            source={HeroImg}
          />
        </View>

        <View>
          <Styled.Button
            onPress={() => setScreen('LOGIN')}
            underlayColor={Colors.awardButton}>
            <Text style={{color: '#fff', fontSize: 16}}>Login</Text>
          </Styled.Button>
          <Styled.Register
            onPress={() => setScreen('REGISTER')}
            underlayColor={Colors.backgroundOnboarding}>
            <Text style={{color: '#fff', fontSize: 16}}>Cadastrar-se</Text>
          </Styled.Register>
        </View>
      </Slide>
      {screen !== 'INITIAL' ? <Register onClose={() => setScreen('INITIAL')} screen={screen}/> : null }
    </Styled.Background>
  );
};

export default LoginOrRegister;
