import React from 'react';
import { useEffect } from 'react';
import { Animated, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../../colors';
import { DeckContext } from '../../../contexts/Deck/DeckContext';
import { fonts } from '../../../fonts';

const dimensions = Dimensions.get('window')

interface CardType {
    question: string,
    answer: string,
}

interface Props {
    onPress: React.Dispatch<React.SetStateAction<boolean>>,
    selected?: number,
}

export const Modal = ({onPress, selected}: Props) => {
    const {cards, setCards, addCard} = React.useContext(DeckContext)
    const animate = React.useRef(new Animated.Value(0)).current;
    const translateEff = React.useRef(new Animated.Value(dimensions.height/1.2)).current;
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [canGoOut, setCanGoOut] = React.useState(false);

    const flip = () => {
        Animated.timing(animate, {
            toValue: isFlipped ? 0 : 180,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setIsFlipped(!isFlipped);
        })
    }

    const frontInterpolate = animate.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    })

    const backInterpolate = animate.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '0deg']
    })

    React.useEffect(() => {
        if(answer.length > 0 && title.length > 0){
            return setCanGoOut(true);
        }
        setCanGoOut(false);
    }, [answer, title]);

    React.useEffect(() => {
        Animated.spring(translateEff, {
            toValue: 10,
            useNativeDriver: true,
        }).start()
    }, [])

    function closeRegister() {
        Animated.spring(translateEff, {
            toValue: dimensions.height/1.2,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            onPress(false);
        }, 300)
    }

    function submitCard() {
        addCard(title, answer);
        closeRegister();
    }

    return (
        <Animated.View 
            style={[styles.background, {transform: [{translateY: translateEff}]}]}
        >
            <BorderlessButton style={{width: 32, height: 32}} onPress={closeRegister}>
                <Icon name="x" size={32} color={Colors.red} />
            </BorderlessButton>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'position' : 'padding' }
                keyboardVerticalOffset={Platform.OS === 'ios' ? -dimensions.height/4.25 : -100 }
            >
                <View style={styles.cardWrapper}>
                    <Animated.View style={[styles.card, {transform: [{rotateY: isFlipped ? backInterpolate : frontInterpolate }]}]}>
                        {isFlipped ? 
                        (
                            <TextInput value={answer} onChangeText={(e) => setAnswer(e)} placeholder="Digite a resposta do flashcard" placeholderTextColor="#fff" style={{fontSize: dimensions.height / 48, color: '#fff'}}  />
                        ) : (
                            <TextInput value={title} onChangeText={(e) => setTitle(e)} placeholder="Digite o título do flashcard" placeholderTextColor="#fff" style={{fontSize: dimensions.height / 48, color: '#fff'}}  />
                        )}
                        <RectButton style={styles.button} onPress={flip} >
                            <Text style={{...fonts.textBolded, color: "#fff"}}>Girar</Text>
                        </RectButton>
                    </Animated.View>
                </View>
            </KeyboardAvoidingView>
            <RectButton style={[styles.button, {backgroundColor: canGoOut ? Colors.title : Colors.underBlue }]} onPress={canGoOut ? submitCard : () => true} >
                <Text style={{...fonts.textBolded, color: "#fff"}}>Criar Flashcard</Text>
            </RectButton>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        zIndex: 100,
        bottom: 0,
        backgroundColor: '#fff',
        width: dimensions.width,
        height: dimensions.height / 1.2,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 16,
        paddingTop: 32,
    },
    cardWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: dimensions.height / 2,
    },
    card: {
        width: dimensions.width - 100,
        height: dimensions.height / 2.5,
        backgroundColor: Colors.title,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: dimensions.width - 100, 
        height: 48, 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center', 
        borderRadius: 8
    },

})