import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';
import {Dimensions, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import Trophy from '../../assets/Trophy.png'
import { Colors } from '../../colors';
import { LevelContext } from '../../contexts/Level/levelContext';
import { fonts } from '../../fonts';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface RouteProps {
  questions: Array<Boolean>;
}

const QuizFinish = () => {
  const {addExp} = React.useContext(LevelContext);
  const Navigation = useNavigation();

  const route = useRoute();
  const routeParams = route.params as RouteProps;
  const questionStats = routeParams.questions;
  const answersRight = questionStats.filter((x) => x).length;

  const greetings = [
    'Tente novamente e dê o seu melhor,',
    'Não desista. Dê o seu melhor,',
    'Tenha mais foco,',
    'Você está quase lá,',
    'Muito bem,',
    'Parabéns,',
  ];

  const Circle = (props: {color: string}) => {
    return <View style={[styles.circle, {backgroundColor: props.color}]} />;
  };

  const handleNavigateToHome = () => {
    return Navigation.navigate('Home');
  };

  React.useEffect(() => {
    const amount = answersRight * 16;
    addExp(amount)
  }, [])

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigateToHome}>
          <Icon name="times" size={36} color={Colors.red} />
        </TouchableOpacity>
        <View />
      </View>

      <View style={styles.textResultWrapper}>
        <Text style={[styles.textResult, fonts.quizFinishText]}>
          Você acertou {answersRight} perguntas!
        </Text>
        <Text style={[styles.textResult, fonts.quizFinishText]}>{greetings[answersRight]} Paulo!</Text>
      </View>

      <View style={{marginVertical: 24}}>
        <Image source={Trophy} resizeMode="contain" style={{width: WIDTH - 30, height: HEIGHT / 2.5}} />
      </View>

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.statsWrapper}>
          {questionStats.map((question: Boolean, index: number) => (
            <Circle key={index} color={question ? Colors.green : Colors.red} />
          ))}
        </View>
        <View>
          <Text style={styles.gainResult}>+ {answersRight * 16} XP!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flex: 1,
  },

  header: {
    marginTop: Platform.OS === 'ios' ? 64 : 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 24,
    color: '#6486DE',
    fontWeight: '700',
  },

  textResultWrapper: {
    marginTop: 24,
  },

  textResult: {
    fontSize: 24,
    color: '#6486DE',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center'
  },

  statsWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  circle: {
    width: 24,
    height: 24,

    borderRadius: 12,
    alignSelf: 'center',
    marginHorizontal: 4,
  },

  gainResult: {
    color: Colors.green,
    fontSize: 24,
    fontWeight: '700',
  },

  button: {
    width: WIDTH - 30,
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default QuizFinish;
