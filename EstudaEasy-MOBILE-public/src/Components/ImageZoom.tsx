import React from 'react';
import { Image, StyleSheet, Dimensions, View, Text } from 'react-native';
import { HandlerStateChangeEvent, PinchGestureHandler, PinchGestureHandlerEventPayload, State,  } from 'react-native-gesture-handler';
import Animated, { block, cond, eq, set, useCode, Value } from 'react-native-reanimated';

import {
    onGestureEvent, timing, transformOrigin, translate,
} from 'react-native-redash'
import { Vector } from './AnimatedHelpers';

interface PropsType {
    img: string,
}

const WIDTH = Dimensions.get('window').width;

export const ImageZoom = ({img}: PropsType) => {
    const state = new Value(State.UNDETERMINED)
    const scale = new Value(1);
    const focal = Vector.create(0, 0);
    const origin = Vector.create(0, 0);
    const translation = Vector.create(0, 0);
    const gestureHandler = onGestureEvent({state, scale: scale, focalX: focal.x, focalY: focal.y})
    const adjustedFocal = Vector.add({x: -WIDTH/2, y: -WIDTH/2}, focal);
    const zIndex = cond(eq(state, State.ACTIVE), -100, 1);
    
    useCode(
        () => block([
            cond(eq(state, State.BEGAN), Vector.set(origin, adjustedFocal)),
            cond(
                eq(state, State.ACTIVE), 
                Vector.set(translation, 
                    Vector.invert(Vector.sub(origin, adjustedFocal))
                )),
            cond(eq(state, State.END), [
                set(translation.x, timing({ from: translation.x, to: 0})),
                set(translation.y, timing({ from: translation.y, to: 0})),
                set(scale, timing({ from: scale, to: 1})),
            ])
        ]),
        [adjustedFocal, origin, scale, state, translation]
    );

    return (
            <PinchGestureHandler 
                {...gestureHandler}
            >
                <Animated.View style={{zIndex}}>
                    <Animated.Image 
                        style={[
                            styles.Images,
                            {
                                transform: [
                                    ...translate(translation),
                                    ...transformOrigin(origin, {scaleX: scale, scaleY: scale})
                                ]
                            }
                          ]}
                        resizeMode="contain" 
                        source={{uri: img}} 
                    />
                </Animated.View>
            </PinchGestureHandler>
    )
}

const styles = StyleSheet.create({
    Images: {
        width: WIDTH,
        height: 300,
    },
})