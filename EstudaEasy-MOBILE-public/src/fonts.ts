import { Dimensions } from "react-native"

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const fonts = {
    title: {
        fontSize: HEIGHT/22,
        fontFamily: 'Ubuntu_700Bold'
    },
    onboardingTitle: {
        fontSize: HEIGHT/22,
        fontFamily: 'Ubuntu_400Regular'
    },
    text: {
        fontSize: HEIGHT/50,
        fontFamily: 'Ubuntu_400Regular'
    },
    onboardingDescription: {
        fontSize: HEIGHT/42,
        fontFamily: 'Ubuntu_400Regular'
    },
    sectionTitle: {
        fontSize: HEIGHT/36,
        fontFamily: 'Ubuntu_700Bold'
    },
    description: {
        fontSize: HEIGHT/52,
        fontFamily: 'Manrope_300Light'
    },
    cardTitle: {
        fontSize: HEIGHT/48,
        fontFamily: 'Ubuntu_700Bold'
    },
    textBolded: {
        fontSize: HEIGHT/50,
        fontFamily: 'Ubuntu_700Bold',
    },
    resumeButtonText: {
        fontSize: WIDTH/32,
        fontFamily: 'Ubuntu_400Regular'
    },
    resumeHeadTitle: {
        fontSize: WIDTH/18,
        fontFamily: 'Ubuntu_700Bold'
    },
    levelText: {
        fontSize: WIDTH/18,
        fontFamily: 'Rajdhani_700Bold'
    },
    HeadTitle: {
        fontSize: WIDTH/12,
        fontFamily: 'Ubuntu_700Bold'
    },
    HeadDescription: {
        fontSize: WIDTH/24,
        fontFamily: 'Ubuntu_400Regular'
    },
    taskText: {
        fontSize: HEIGHT/48,
        fontFamily: 'Ubuntu_400Regular'
    },
    countdownText: {
        fontSize: HEIGHT/10,
        fontFamily: 'Rajdhani_700Bold'
    },
    quizFinishText: {
        fontSize: HEIGHT/30,
        fontFamily: 'Rajdhani_700Bold'
    },
    flashCardTitle: {
        fontSize: HEIGHT/72,
        fontFamily: 'Ubuntu_700Bold'
    },
}