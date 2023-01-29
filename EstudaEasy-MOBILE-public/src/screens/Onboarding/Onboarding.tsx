import React, {useContext, useRef} from 'react';
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Colors} from '../../colors';
import Slide from './Slide';
import * as styled from './styled';
import AboutStudyImg from '../../assets/onboarding/AboutStudy.png';
import HeroImgFinish from '../../assets/onboarding/HeroFinish.png';
import WelcomeImg from '../../assets/onboarding/welcome.png';
import { AuthContext } from '../../contexts/auth/authContext';
import { fonts } from '../../fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

export default function Onboarding() {
  const {user, setUserFirstLogin} = useContext(AuthContext);
  const scroll = useRef<Animated.ScrollView>(null);

  const slides = [
    {
      title: 'Bem-vindo ao',
      bolded: 'EstudaEasy',
      description:
        'O EstudaEasy é um app que vai te auxiliar durante os teus estudos.',
      image: WelcomeImg,
    },
    {
      title: 'Estudo com',
      bolded: 'Técnica',
      description:
        'A curva de aprendizagem quando se tem uma técnica envolvida é bem maior que a padrão.',
      image: AboutStudyImg,
    },
    {
      title: 'Aoba, ',
      bolded: `${user?.nome}!`,
      description: 'Eaí, tá pronto!? Então bora aprender!',
      image: HeroImgFinish,
    },
  ];

  const navigation = useNavigation();

  function HandleNavigation(index: number) {
    return scroll.current.scrollTo({x: width * (index + 1), animated: true});
  }

  async function handleGoHome() {
    await setUserFirstLogin();
    return navigation.navigate('Home');
  }

  return (
    <View style={{backgroundColor: Colors.backgroundOnboarding, flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.white}
      />

      <Animated.ScrollView
        ref={scroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        {slides.map((slide, index) => {
          return (
            <Slide
              key={slide.title}
              title={slide.title}
              bolded={slide.bolded}
              description={slide.description}
              image={slide.image}>
              <styled.Footer key={slide.bolded}>
                {index === slides.length - 1 ? (
                  <TouchableHighlight
                    underlayColor={Colors.white}
                    style={{flex: 1, alignItems: 'flex-end'}}
                    onPress={handleGoHome}>
                    <Icon name="check" size={32} color={Colors.title} />
                  </TouchableHighlight>
                ) : (
                  <>
                    <TouchableHighlight
                      onPress={() => HandleNavigation(slides.length - 1)}
                      underlayColor={Colors.white}>
                      <Text style={{color: Colors.title, ...fonts.onboardingDescription}}>
                        Pular
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => HandleNavigation(index)}
                      underlayColor={Colors.white}>
                      <Icon name="arrow-right" size={32} color={Colors.title} />
                    </TouchableHighlight>
                  </>
                )}
              </styled.Footer>
            </Slide>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}
