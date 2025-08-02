import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View, Text, Dimensions, Animated} from 'react-native';
import { BorderlessButton, Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import { Colors } from '../../../colors';
import { CardType, DeckContext } from '../../../contexts/Deck/DeckContext';
import { fonts } from '../../../fonts';

const dimensions = Dimensions.get('window')

const ITEM_WIDTH = dimensions.width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const ITEM_SPACING = ((dimensions.width - 32) - ITEM_WIDTH) / 2;
const VISIBLE_ITEMS = 3;

export const PlayingFlashCards = () => {
    const Navigation = useNavigation();
    const {colections, ColectionIndex, deckIndex} = React.useContext(DeckContext);
    const [data, setData] = React.useState<Array<CardType>>([])
    const scrollXIndex = React.useRef(new Animated.Value(0)).current;
    const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
    const [selectedIndex, setIndex] = React.useState(0);
    const setActiveIndex = React.useCallback((activeIndex) => {
        setIndex(activeIndex);
        scrollXIndex.setValue(activeIndex);
    }, []);
    const animate = React.useRef(new Animated.Value(0)).current;
    const [isFlipped, setIsFlipped] = React.useState(false);    

    const flip = () => {
        setIsFlipped(!isFlipped);
    }

    React.useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver: true
        }).start();

    },[])


    React.useEffect(() => {
        if(ColectionIndex !== -1 && deckIndex !== -1) 
            setData(colections[ColectionIndex].decks[deckIndex].cards);
    }, [])

    return (
        <FlingGestureHandler
            key='left'
            direction={Directions.LEFT}
            onHandlerStateChange={ ev => {
                if(ev.nativeEvent.state == State.END) {
                    if(selectedIndex === data.length - 1)
                        return;
                    if(isFlipped)
                        flip()

                    setActiveIndex(selectedIndex + 1);
                }
            }}
        >
            <FlingGestureHandler
                key='Right'
                direction={Directions.RIGHT}
                onHandlerStateChange={ev => {
                    if(ev.nativeEvent.state == State.END) {
                        if(selectedIndex === 0)
                            return;

                        if(isFlipped)
                            flip()

                        setActiveIndex(selectedIndex - 1);
                    }
                }}
            >
            <SafeAreaView style={styles.background}>
                <View style={styles.head}>
                    <BorderlessButton style={{width: 32, height: 32}} onPress={() => Navigation.goBack()}>
                        <Icon name="chevron-left" size={32} color={Colors.white} />
                    </BorderlessButton>
                    <Text style={styles.title}>{colections[ColectionIndex].decks[deckIndex].title}</Text>
                    <View style={{width: 30}}></View>
                </View>

                <View style={{flex: 1,justifyContent: 'center'}}>
                    <Text style={{...fonts.sectionTitle, color: Colors.white, textAlign: 'center', marginTop: 2}}>{`${selectedIndex + 1}/${data.length}`}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(_, index) => String(index)} 
                        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'center',
                            paddingHorizontal: 20
                        }}
                        CellRendererComponent={({item, index, children, style, ...props}) => {
                            const newStyle = [
                                style,
                                {zIndex: data.length - index}
                            ]
                            return (
                                <View style={newStyle} index={index} {...props} >
                                    {children}
                                </View>
                            )
                        }}
                        scrollEnabled={false}
                        removeClippedSubviews={false}
                        inverted
                        horizontal
                        decelerationRate='fast'
                        renderItem={({item, index}) => {
                            const inputRange = [index - 1, index, index + 1];
                            const translateX = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [50, 0, -100]
                            })
                            const scale = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [0.8, 1, 1.3]
                            })
                            const opacity = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0]
                            })

                            return (
                                <Animated.View style={[styles.card, {opacity, transform: [{translateX},{scale}]}]}>
                                    <View style={{height: 30}}></View>
                                    {isFlipped ? (
                                        <Text style={{...fonts.textBolded, color: Colors.title, textAlign: 'center',}}>{item.answer}</Text>
                                    ) : (
                                        <Text style={{...fonts.textBolded, color: Colors.title, textAlign: 'center'}}>{item.question}</Text>
                                    )}
                                </Animated.View>
                            )
                        }}
                    />
                </View>
                <BorderlessButton style={{width: ITEM_WIDTH - 64, height: 48, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}} onPress={flip}>
                    <Text style={{...fonts.textBolded, color: Colors.white}}>{isFlipped ? 'Esconder resposta' : 'Mostrar resposta' }</Text>
                </BorderlessButton>
            </SafeAreaView>
            </FlingGestureHandler>
        </FlingGestureHandler>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.title,
        flex: 1,
        paddingHorizontal: 16,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    title: {
        ...fonts.sectionTitle,
        color: Colors.white,
    },
    card: {
        width: ITEM_WIDTH, 
        height: ITEM_HEIGHT, 
        position: 'absolute', 
        bottom: '10%',
        left: -ITEM_WIDTH / 2,
        backgroundColor: Colors.white, 
        borderRadius: 16, 
        alignItems: 'center', 
        justifyContent: 'center', 

    }
})