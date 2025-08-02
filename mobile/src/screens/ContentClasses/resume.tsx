import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { View, Text, Image, Dimensions} from 'react-native';
import { BorderlessButton, RectButton, State} from 'react-native-gesture-handler';
import Animated, { Value } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getClassResume } from '../../api/Content/content';
import { Colors } from '../../colors';
import { ResumeComponent } from '../../Components/resume';
import { LevelContext } from '../../contexts/Level/levelContext';
import { fonts } from '../../fonts';

const WIDTH = Dimensions.get('window').width;

interface SectionType {
    title: string,
    resume_title: string,
    text: string,
    lista: Array<string>
    url: string,
}

interface ResumeProps {
    sections: Array<SectionType>,
}

export const Resume: React.FC = () => {
    const {addExp} = React.useContext(LevelContext);

    const Navigation = useNavigation();
    const [resumeData, setResumeData] = useState<ResumeProps>();
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const [isVisible, setIsVisible] = useState(false);

    const {id, name: ResumeName} = route.params as {id: number, name: string};

    useEffect(() => {
        setLoading(true);
        async function loadResume() {
            const data = await getClassResume(id);
            setResumeData(data);
            setLoading(false);
        }

        loadResume();
    }, [])

    const handleGoBack = () => {
        return Navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.Background}>
            <View style={styles.Header}>
                <BorderlessButton style={styles.HeadView} onPress={handleGoBack}>
                    <Icon name="arrow-left" size={24} color="#8AA7EF" />
                </BorderlessButton>
                <View style={styles.HeadView} />
            </View>
            {loading ? <ActivityIndicator/> : (
                <ScrollView style={styles.ContentWrapper}>
                    <ResumeComponent resumeData={resumeData} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Background: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    Header: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height: 70,
        paddingHorizontal: 16,
    },
    HeadTitle: {
        color: Colors.title,
        ...fonts.resumeHeadTitle,
        width: WIDTH/1.5,
    },
    HeadView: {
        width: 30,
    },
    ContentWrapper: {
        paddingHorizontal: 16,
    },
    ListText: {
        fontSize: 16,
        color: Colors.title,
        fontWeight: '600',
        lineHeight: 22,
        textAlign: 'justify',
        marginBottom: 12,
    },
    ImageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
    },
    Images: {
        width: WIDTH,
        height: 200,
    },
    FinishButton: {
        marginTop: 12,
        flex: 1,
        backgroundColor: Colors.boldBlue,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: '700'
    },
})