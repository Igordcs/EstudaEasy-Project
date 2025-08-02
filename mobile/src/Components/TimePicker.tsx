import React, { SetStateAction } from 'react';
import { View, Dimensions, Animated } from 'react-native'
import { fonts } from '../fonts';

const WIDTH = Dimensions.get('window').width;

const ITEM_WIDTH = WIDTH * 0.28;
const ITEM_SPACING = (WIDTH - ITEM_WIDTH) / 2;

interface TimeProps {
    initial: number,
    onUpdate?: React.Dispatch<SetStateAction<number>>,
    color: string
}

export const TimePicker = (props: TimeProps) => {
    const ScrollX = React.useRef(new Animated.Value(0)).current;

    const timers = [...Array(13).keys()].map(item => item === 0 ? 1 : item * 5 );

    React.useEffect(() => {
        if(props.onUpdate)
            props.onUpdate(timers[5]);
    }, [])

    return (
        <Animated.FlatList
            data={timers}
            keyExtractor={item => String(item)}
            renderItem={({item, index}) => {
                const inputRange = [
                    (index - 1) * ITEM_WIDTH,
                    (index) * ITEM_WIDTH,
                    (index + 1) * ITEM_WIDTH,
                ]

                const opacity = ScrollX.interpolate({
                    inputRange,
                    outputRange: [.7,1,.7]
                })

                return (
                    <View style={{width: ITEM_WIDTH, justifyContent: 'center', alignItems: 'center'}}>
                        <Animated.Text style={{...fonts.levelText, fontSize: 32, opacity, color: props.color}}>{item}{':'}{'00'}</Animated.Text>
                    </View>
                )
            }}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: ScrollX}}}],
                {useNativeDriver: true}
            )}
            onMomentumScrollEnd={ev => {
                const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_WIDTH);
                if(props.onUpdate)
                    props.onUpdate(timers[index]);
            }}
            getItemLayout={(timers, index) => (
                {length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index}
            )}
            initialScrollIndex={props.initial/5}
        />
    )
}