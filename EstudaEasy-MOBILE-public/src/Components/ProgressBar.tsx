import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Animated, View } from 'react-native';

const WIDTH = Dimensions.get('window').width;

interface ProgressProps {
  progress: number,
}

const ProgressBar = (props: ProgressProps) => {

  const progressAnimate = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.timing(progressAnimate, {
      toValue: props.progress,
      duration: 30 * 1000,
      useNativeDriver: true,
    }).start();
  }, [props.progress]);

  return (
    <View style={styles.progressField}>
      <Animated.View style={[styles.progress, {scaleX: progressAnimate}]}></Animated.View >
    </View>
  );
}

const styles = StyleSheet.create({
  progressField: {
    width: 300,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#f78b6d',
  },

  progress: {
    height: 20,
    borderRadius: 20,
    backgroundColor: '#fde73c',
  },
})

export default ProgressBar;