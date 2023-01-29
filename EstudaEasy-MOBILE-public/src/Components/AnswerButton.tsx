import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Colors } from '../colors';

interface AnswerButtonProps {
  id: Number,
  title: string,
  correct: Boolean,
  answered: boolean,
  onPress: Function,
  type?: string,
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const AnswerButton = (props: AnswerButtonProps) => {

  const [click, setClick] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#D2DFFF');
  const [fontColor, setFontColor] = useState(Colors.title);


  async function onPress(){
    setBackgroundColor(props.correct ? '#46e074' : '#d65547');
    setFontColor('#fff');

    await props.onPress();
    setClick(!click);
  }

  useEffect(()=>{
    setBackgroundColor("#FFFFFF");
  }, [click]);

  return props.type === 'TRUEORFALSE' ? (
    <TouchableWithoutFeedback key={props.title} disabled={props.answered} style={[styles.answerButton, {height: HEIGHT / 4.5, backgroundColor: backgroundColor}]} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.answerText, {color: fontColor}]}>{props.title}</Text>
      </View>
  </TouchableWithoutFeedback>
  ) : (
    <TouchableWithoutFeedback key={props.title} disabled={props.answered} style={[styles.answerButton, {backgroundColor: backgroundColor}]} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.answerText}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  answerButton: {
    width: WIDTH - 50,
    height: 70,
    marginBottom: 25,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#3c3c3c',
  },

  answerText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#617DC6',
  },
});

export default AnswerButton;