import React from 'react'; 
import { Animated, Dimensions, StyleProp, Text} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Colors } from '../colors';
import { fonts } from '../fonts';

const dimensions = Dimensions.get('window')
const ITEM_WIDTH = dimensions.width * 0.76;

export const FlipView = ({question, answer, style}) => {

    const animate = React.useRef(new Animated.Value(0)).current;
    const [isFlipped, setIsFlipped] = React.useState(false);
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
    
    return (
        <Animated.View style={[{...style},{transform: [{rotateY: isFlipped ? backInterpolate : frontInterpolate }]}]}>
            {isFlipped ? 
            (
                <Text style={{...fonts.textBolded, color: Colors.title, textAlign: 'center', backfaceVisibility: 'hidden'}}>{answer}</Text>
            ) : (
                <Text style={{...fonts.textBolded, color: Colors.title, textAlign: 'center', backfaceVisibility: 'hidden'}}>{question}</Text>
            )}
            <BorderlessButton style={{width: ITEM_WIDTH - 64, height: 48, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}} onPress={flip}>
                <Text style={{...fonts.textBolded, color: Colors.white}}>{isFlipped ? 'Esconder resposta' : 'Mostrar resposta' }</Text>
            </BorderlessButton>
        </Animated.View>
    )
}