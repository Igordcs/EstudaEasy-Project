import React from 'react';
import { Dimensions, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { View, Text } from 'react-native';
import { BorderlessButton, RectButton, TextInput, } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../colors';
import ContentCard from '../../../Components/ContentCard';
import { fonts } from '../../../fonts';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Modal } from './modal';
import { DeckContext, DeckType } from '../../../contexts/Deck/DeckContext';
import { Alert } from 'react-native';

const dimensions = Dimensions.get('window');

interface DeckProps {
    title: string,
    cards: {
        question: string,
        answer: string,
    }[],
}

export const AddFlashCardHome = () => {
    const {addCollection, decks, removeDeck, resetStates} = React.useContext(DeckContext);
    const Navigation = useNavigation();
    const [coletionTitle, setColetionTitle] = React.useState('');

    function returnToBack(){
        Alert.alert('Você tem certeza que quer sair?', '', [
            {
                text: 'Não',
                onPress: () =>  'CANCELED',
                style: 'cancel'
            },
            {text: 'Sim', onPress: () => {
                resetStates();
                Navigation.goBack();
            }}
        ]);

    }

    function submitCollection() {
        if(coletionTitle.length < 3 )
            return Alert.alert('Dê um nome maior para sua coleção.');
            
        addCollection(coletionTitle);
        setColetionTitle('');
        Navigation.goBack();
    }

    function handleNavigateToAddDeck() {
        Navigation.navigate('AddDeck');
    }

    const ContentButton = ({item, index}: {item: DeckType, index: number}) => {

        if(index === decks.length - 1 && decks.length % 2 !== 0) {
            return (
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}} key={`${index}-${item.title}`}>
                        <View style={styles.card}>
                            <View>
                                <Text style={styles.cardText}>{item.title}</Text>
                                <Text style={[styles.cardText, {color: Colors.underBlue}]}>{`${item.cards.length} flashcards`}</Text>
                            </View>
                                <TouchableOpacity style={styles.remove} onPress={() => removeDeck(index)}>
                                    <Icon name="trash-2" size={24} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                    </View>
                    <BorderlessButton style={styles.buttonCard} onPress={() => handleNavigateToAddDeck()}>
                        <Icon name="plus" size={50} color={Colors.white} />
                    </BorderlessButton>
                </View>
            )
        }

        return (
            <View style={{flexDirection: 'column'}} key={`${index}-${item.title}`}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.cardText}>{item.title}</Text>
                        <Text style={[styles.cardText, {color: Colors.underBlue}]}>{`${item.cards.length} flashcards`}</Text>
                    </View>
                        <TouchableOpacity style={styles.remove} onPress={() => removeDeck(index)}>
                            <Icon name="trash-2" size={24} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.head}>
                <BorderlessButton style={{width: 32, height: 32}} onPress={returnToBack}>
                    <Icon name="chevron-left" size={32} color={Colors.white} />
                </BorderlessButton>
                <Text style={styles.title}>Criar coleção</Text>
                <View style={{width: 30}}></View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={{marginBottom: 24}}>
                    <Text style={styles.sectionTitle}>Dê um nome a sua coleção</Text>
                    <TextInput style={styles.textInput} value={coletionTitle} onChangeText={(e) => setColetionTitle(e)} placeholder="Ex: Geometria Plana" placeholderTextColor="#fff" />
                </View>
                <Text style={styles.sectionTitle}>
                    Crie seu baralho
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <FlatList
                        data={decks}
                        keyExtractor={(_, index) => String(index) }
                        renderItem={ContentButton}
                        numColumns={2}
                        contentContainerStyle={{alignItems: 'center', width: dimensions.width - 32}}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={decks.length % 2 === 0 ?  (
                            <BorderlessButton style={styles.buttonCard} onPress={() => handleNavigateToAddDeck()}>
                                <Icon name="plus" size={50} color={Colors.white} />
                            </BorderlessButton>
                        ) : null}
                    />
                </View>
                <RectButton style={styles.button} onPress={submitCollection}>
                    <Text style={{...fonts.textBolded, color: Colors.title}}>Criar coleção</Text>
                </RectButton>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.title,
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
    sectionTitle: {
        ...fonts.sectionTitle,
        color: Colors.white,
        marginBottom: 12,
    },
    textInput: {
        width: '100%',
        height: 48,
        borderStyle: 'solid',
        borderColor: Colors.white,
        borderBottomWidth: 1,
        color: Colors.white,
    },
    card: {
        width: dimensions.width * 0.4,
        height: (dimensions.width * 0.4) * 1.2,
        backgroundColor: Colors.white,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        marginVertical: 10,
    },
    cardText: {
        ...fonts.flashCardTitle,
        color: Colors.title,
        textAlign: 'center',
    },
    buttonCard: {
        width: dimensions.width * 0.4,
        height: (dimensions.width * 0.4) * 1.2,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        marginVertical: 10,
    },
    button: {
        width: dimensions.width - 64,
        borderRadius: 8,
        height: 48,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 24,
    },
    remove: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 48, 
        height: 48, 
        position: 'absolute', 
        top: 0, 
        right: 0, 
        backgroundColor: Colors.red,
        borderRadius: 48 /2,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    }
})