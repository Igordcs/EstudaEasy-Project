import React from 'react';
import { View, Dimensions, StatusBar, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const WIDTH = Dimensions.get('window').width;

export const Loading: React.FC = () => {
    return (
        <View 
        style={styles.background}
        >
            <StatusBar barStyle="light-content" />
            <LottieView 
                style={styles.animationWrapper} 
                source={require('../../assets/animation/loading.json')} 
                autoPlay 
                loop 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#1473b6',
    },
    animationWrapper: {
        width: WIDTH/2, 
        height: WIDTH, 
    },

})