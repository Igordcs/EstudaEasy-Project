import React from 'react';
import { Animated, View } from 'react-native';

export const GainedExp = () => {
    const fadeAnimate = React.useRef(new Animated.Value(0)).current;
    const translateAnimate = React.useRef(new Animated.Value(20)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnimate, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
        }).start();
        Animated.timing(translateAnimate, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
        }).start();
        setTimeout(() => {
            Animated.timing(fadeAnimate, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }).start();
        }, 800)
    }, [])

    return (
        <Animated.View style={{position: 'absolute', bottom: 40, right: 32, zIndex: 19, opacity: fadeAnimate, transform: [{translateY: translateAnimate}]}}>
            <Animated.Text style={{fontSize: 24}}>100 XP</Animated.Text>
        </Animated.View>
    )
}