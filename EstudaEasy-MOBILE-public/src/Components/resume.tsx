import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import Animated from 'react-native-reanimated';
import { Colors } from '../colors';
import { fonts } from '../fonts';
import { ImageZoom } from './ImageZoom';

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

interface PropType {
    resumeData: ResumeProps | undefined;
}

const WIDTH = Dimensions.get('window').width;


export const ResumeComponent = ({resumeData}: PropType) => { 

    return resumeData ? (
        <View style={styles.Background}>
            {
            resumeData && resumeData.sections.map(item => {
                let texto = item.text.split(/(\*.*?\*)/g);
                return (
                    <View key={item.text} style={{marginBottom: 18}}>
                        <View >
                            {item.resume_title ? (
                                <Text style={styles.Section}>{item.resume_title}</Text>
                            ) : null }
                            <Text style={styles.Text}>{texto.map((item, index) => {
                                if(item.length > 1) {
                                    if(item.indexOf('*') !== -1) {
                                        item = item.replace('*', '');
                                        item = item.replace('*', '');
                                        return (<Text key={index} style={[styles.Text, {...fonts.textBolded}]}>{`${item}`}</Text>)
                                    }
                                    return <Text key={index}>{`${item}`}</Text>
                                }
                            })}</Text>
                            <View>
                                {item.lista && (
                                    <View style={{marginVertical: item.lista && 12}}>
                                        {item.lista.map(item => (
                                            <Text style={styles.ListText} key={item}>{`• ${item}`}</Text>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </View>
                        {item.url !== '' ? (
                            <Image style={{width: WIDTH - 32, height: WIDTH * 0.8, alignSelf: 'center' }} source={{uri: item.url}} resizeMode="contain" />
                        ) : null}
                    </View>
                )
            })}
        </View>
    )  : null
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
        fontSize: 24,
        color: Colors.title,
        fontWeight: '700',
    },
    HeadView: {
        width: 30,
    },
    ContentWrapper: {
        paddingHorizontal: 16,
    },
    Section: {
        textAlign: 'left',
        width: WIDTH - 16,
        ...fonts.sectionTitle,
        color: Colors.title,
        marginBottom: 18,
    },
    Text: {
        ...fonts.text,
        color: Colors.boldBlue,
        textAlign: 'justify',
        lineHeight: WIDTH / 12,
        paddingHorizontal: 10,
    },
    ListText: {
        ...fonts.text,
        color: Colors.title,
        fontWeight: '600',
        lineHeight: WIDTH / 12,
        textAlign: 'justify',
        paddingLeft: 20,
    },
    ImageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})