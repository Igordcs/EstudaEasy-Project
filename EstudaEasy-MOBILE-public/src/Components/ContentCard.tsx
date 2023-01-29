import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { Animated, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../colors';
import heartIcon from '../assets/Heart.png';
import { fonts } from '../fonts';
import { biologyIcon, chesmistryIcon, filoIcon, geoIcon, historyIcon, literatureIcon, mathIcon, physisIcon, portugueseIcon, socioIcon } from './icons';

interface CardProps {
  title: string,
  description?: string,
  onPress: Function,
}

const WIDTH = Dimensions.get('window').width;

const ContentCard = (props: CardProps) => {

  const fadeAnimate = useRef(new Animated.Value(0)).current;
  const translateAnimate = useRef(new Animated.Value(5)).current;

  const onPress = () => {
    props.onPress();
  }

  useEffect(() => {
    Animated.timing(fadeAnimate, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
    Animated.timing(translateAnimate, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, []);

  const icons = {
    'Matemática': mathIcon,
    'Química': chesmistryIcon,
    'Física': physisIcon,
    'História': historyIcon,
    'Geografia': geoIcon,
    'Filosofia': filoIcon,
    'Sociologia': socioIcon,
    'Português': portugueseIcon,
    'Literatura': literatureIcon,
    'Biologia': biologyIcon,
  }

  return(
    <Animated.View style={{opacity: fadeAnimate, translateY: translateAnimate, translateX: translateAnimate}}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image style={{width: WIDTH*0.4, height: (WIDTH*0.2) * 1.2, alignSelf: 'center'}} source={icons[props.title]} resizeMode="contain" />
        <Text style={styles.cardText}>{props.title}</Text>
        <Image style={{width: 18, height: 18}} source={heartIcon} resizeMode="contain" />
      </TouchableOpacity>
    </Animated.View>
  ); 
}

const styles = StyleSheet.create({
  card: {
    width: WIDTH*0.4,
    height: (WIDTH*0.4) * 1.2,
    borderRadius: 16,
    justifyContent: 'flex-end',

    backgroundColor: '#617EC9',
    marginHorizontal: 6,
    marginVertical: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },

  cardText: {
    color: '#fff',
    ...fonts.cardTitle,
    fontFamily: 'Manrope_700Bold',
    
    marginVertical: 2,
  },

  heart: {
  },
});

export default ContentCard