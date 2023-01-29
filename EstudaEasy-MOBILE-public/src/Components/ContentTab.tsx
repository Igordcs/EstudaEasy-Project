import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { fonts } from '../fonts';

interface ContentTabProps {
  content: String,
  setContent: Function,
}

const ContentTab = (props: ContentTabProps ) => {

  const bounceEff = useRef(new Animated.Value(10)).current;

  const onPress = (param: String) => {
    bounceEff.setValue(-10);
    Animated.spring(bounceEff, {
      toValue: 10,
      useNativeDriver: true,
    }).start();
    return props.setContent(param);
  }

  return (
    <View style={styles.tabNavigationContainer}>
        <BorderlessButton onPress={() => onPress('exatas')} >
          <Text style={styles.tabNavigationText}>Exatas</Text>
          {
            props.content === 'exatas' ? <Animated.View style={[styles.circle, {translateY: bounceEff}]} /> : null
          }
        </BorderlessButton>
        <BorderlessButton onPress={() => onPress('humans')}>
          <Text style={styles.tabNavigationText}>Humanas</Text>
          {
            props.content === 'humans' ? <Animated.View style={[styles.circle, {translateY: bounceEff}]} /> : null
          }
        </BorderlessButton>
      </View>
  )
}

const styles = StyleSheet.create({
  tabNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
  },

  tabNavigationText: {
    ...fonts.sectionTitle,
    fontFamily: 'Manrope_400Regular',
    color: '#6486DE',  
    marginBottom: 4,
  },

  circle: {
    width: 16,
    height: 16,
    backgroundColor: '#6486DE',
    borderRadius: 8,
    alignSelf: 'center',
  },
})

export default ContentTab;