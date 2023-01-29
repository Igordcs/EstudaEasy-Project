import React from 'react';
import { Animated, Dimensions } from 'react-native';
import {StyleSheet, View, Text} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../colors';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

interface AdviceProps {
    onReject(): void,
    onConfirm(): void, 
    visible: boolean,
}

export const Advice = (props: AdviceProps) => {

    const translateEff = React.useRef(new Animated.Value(HEIGHT/1.2)).current;

    React.useEffect(() => {
        Animated.spring(translateEff, {
            toValue: 10,
            useNativeDriver: true,
        }).start()
    }, [])

    function closeRegister() {
        Animated.spring(translateEff, {
            toValue: HEIGHT/1.2,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            props.onReject()
        }, 100)
    }

    return !props.visible ? null : (
        <View style={styles.background}>
            <Animated.View style={[styles.contentWrapper, {transform: [{translateY: translateEff}]}]}>
                <Text style={{fontSize: 18, fontWeight: '700', color: Colors.title, textAlign: 'center'}}>Você realmente quer ir para o quiz?</Text>
                <View style={{flexDirection: 'row'}}>
                    <BorderlessButton style={styles.RejectButton} onPress={closeRegister}>
                        <Text style={{fontSize: 18, color: Colors.red}}>Não</Text>
                    </BorderlessButton>
                    <BorderlessButton style={styles.button} onPress={props.onConfirm}>
                        <Text style={{fontSize: 18, color: Colors.green}}>Sim</Text>
                    </BorderlessButton>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        zIndex: 32,
    },
    contentWrapper: {
        backgroundColor: Colors.blueBackground,
        borderRadius: 24,
        height: HEIGHT / 4,
        width: WIDTH,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    RejectButton: {
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
        backgroundColor: '#ff3b3b1f'
    },
    button: {
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
        marginLeft: 12,
    },
})