import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar, SafeAreaView, Dimensions} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import { Audio } from 'expo-av';

import Icon from 'react-native-vector-icons/FontAwesome';
import { getQuestion } from '../../api/Quiz/quiz';
import { Colors } from '../../colors';
import AnswerButton from '../../Components/AnswerButton';
import { Loading } from '../Loading/loading';


interface OptionType {
  id: number,
  text: string,
  correct: boolean,
}

interface QuestionProps {
  statement: string,
  alternatives: Array<OptionType>
}

let countdownTimeout: NodeJS.Timeout;
const TIMEOUTVALUE = 10;
const WIDTH = Dimensions.get('window').width;

const Quiz = () => {
  const Navigation = useNavigation();

  //Variáveis de estado, responsáveis por gerar novas questões
  const [question, setQuestion] = useState<QuestionProps>();
  const [loading, setLoading] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isActive, setIsActive] = useState(true)
  const [time, setTime] = useState(TIMEOUTVALUE);
  const [sound, setSound] = React.useState({});
  const [questionsAnswered, setQuestionsAnswered] = useState<Array<Boolean>>([],);

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/audios/wrong.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 
  }

  async function CheckAnswer(value: Boolean) {
    setAnswered(true);
    if (value) {
      setQuestionsAnswered([...questionsAnswered, true]);
      console.log('Acertou');
    } else {
      playSound()
      setQuestionsAnswered([...questionsAnswered, false]);
      console.log('errou');
    }

    await timeout(1000);
    getNewQuestion();
    setTime(TIMEOUTVALUE);
  }

  //Gera números aleatórios para acessar o conteúdo do array questions
  async function getNewQuestion() {
    setLoading(true);
    const random = Math.floor(Math.random() * (9 - 1 + 1 ) + 1);
    const content = await getQuestion();
    setQuestion(content);
    setAnswered(false);
    setQuestionIndex(questionIndex + 1);
    await timeout(1000);
    setLoading(false);
  }

  function finishQuiz(questions: Array<Boolean>) {
    console.log(questionsAnswered);
    return Navigation.navigate('QuizFinish', {questions});
  }

  useEffect(() => {
    if (questionIndex + 1 > 5) {
      return finishQuiz(questionsAnswered);
    }
  }, [questionsAnswered]);

  useEffect(() => {
    if(!answered && time > 0 && questionIndex + 1 <= 6){
      countdownTimeout = setTimeout(() => {
          setTime(time - 1);
      }, 1000)
  } else if ( !answered && time === 0 && questionIndex + 1 <= 6 ){
    CheckAnswer(false);
  }
  }, [answered, time]) 

  //Ao entrar na tela uma questão será gerada aleatoriamente
  useEffect(() => {
    getNewQuestion();
  }, []);

  const handleGoBack = () => {
    return Navigation.goBack();
  };

  return loading ? <Loading/> : (
    <SafeAreaView style={styles.Background}>
      <View style={styles.HeaderModal}>
        <BorderlessButton style={{width: 30}} onPress={handleGoBack}>
          <Icon name="close" size={24} color="#fff" />
        </BorderlessButton>
        <View style={{width: WIDTH - 120}}>
        </View>
        <View style={{width: 30}}>
          <Text style={styles.CountDown}>
            {time}
          </Text>
        </View>
      </View>
      <ScrollView style={{paddingTop: 64}}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundOnboarding}  />
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 24}}>
          <Text style={styles.contentTitle}>{question?.statement}</Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {question && question.alternatives.length <= 2 ? 
            question.alternatives.map(alternative => (
              <AnswerButton
                key={alternative.text}
                answered={answered}
                correct={alternative.correct}
                title={alternative.text}
                id={alternative.id}
                type='TRUEORFALSE'
                onPress={() => CheckAnswer(alternative.correct)}
              />)) 
            : 
            question?.alternatives.map(alternative => (
              <AnswerButton
                key={alternative.text}
                answered={answered}
                correct={alternative.correct}
                title={alternative.text}
                id={alternative.id}
                onPress={() => CheckAnswer(alternative.correct)}
              />))
          } 
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: Colors.backgroundOnboarding,
    alignItems: 'center',
  },

  questionContainer: {
    width: '90%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 28,
  },

  contentTitle: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  questionText: {
    fontSize: 18,
    color: '#6486DE',
    textAlign: 'center',
  },

  HeaderModal: {
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    marginTop: 12,
  },

  CountDown: {
    color: Colors.red,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Quiz;
