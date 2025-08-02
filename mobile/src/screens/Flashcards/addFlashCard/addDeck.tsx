import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Alert, FlatList, TouchableOpacity} from 'react-native';
import { View, Text } from 'react-native';
import { BorderlessButton, RectButton, TextInput, } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../colors';
import ContentCard from '../../../Components/ContentCard';
import { fonts } from '../../../fonts';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Modal } from './modal';
import { CardType, DeckContext } from '../../../contexts/Deck/DeckContext';

const dimensions = Dimensions.get('window')


export const AddDeck = () => {
    const {addDeck, cards, removeCard} = React.useContext(DeckContext);
    const Navigation = useNavigation();
    const route = useRoute();
    const [deckTitle, setDeckTitle] = React.useState('');

    const [modalIsVisible, setModalIsVisible] = React.useState(false);

    function returnToBack(){
        if(cards.length >= 1 ) {
            return Alert.alert('Você tem certeza que quer sair?', '', [
                {
                    text: 'Não',
                    onPress: () => 'CANCELED',
                    style: 'cancel'
                },
                {text: 'Sim', onPress: () => Navigation.goBack()}
            ]);
        }
        return Navigation.goBack();
    }

    function submitDeck () {
        if(deckTitle.length < 3 )
            return Alert.alert('Dê um nome maior para seu Deck.');

        if(cards.length < 1) 
            return Alert.alert('Dê um nome maior para seu Deck.');
        addDeck(deckTitle);
        setDeckTitle('');
        Navigation.goBack();
    }

    const ContentButton = ({item, index}: {item: CardType, index: number}) => {

        if(index === cards.length - 1 && cards.length % 2 !== 0) {
            return (
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.card} key={`${index}-${item.question}*`}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}} >
                            <Text style={styles.cardText}>{item.question}</Text>
                            <Text style={[styles.cardText, {color: Colors.underBlue}]}>{item.answer}</Text>
                        </View>
                        <TouchableOpacity style={styles.remove} onPress={() => removeCard(index)}>
                            <Icon name="trash-2" size={24} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                    <RectButton style={styles.buttonCard} onPress={() => setModalIsVisible(true)}>
                        <Icon name="plus" size={50} color={Colors.white} />
                    </RectButton>
                </View>
            )
        }

        return (
            <View style={styles.card} key={`${index}-${item.question}*`}>
                <View style={{alignItems: 'center', justifyContent: 'center'}} >
                    <Text style={styles.cardText}>{item.question}</Text>
                    <Text style={[styles.cardText, {color: Colors.underBlue}]}>{item.answer}</Text>
                </View>
                <TouchableOpacity style={styles.remove} onPress={() => removeCard(index)}>
                    <Icon name="trash-2" size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.head}>
                <BorderlessButton style={{width: 32, height: 32}} onPress={returnToBack}>
                    <Icon name="chevron-left" size={32} color={Colors.white} />
                </BorderlessButton>
                <Text style={styles.title}>Criar baralho</Text>
                <View style={{width: 30}}></View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={{marginBottom: 24}}>
                    <Text style={styles.sectionTitle}>Dê um nome ao baralho</Text>
                    <TextInput style={styles.textInput} value={deckTitle} onChangeText={(e) => setDeckTitle(e)} placeholder="Ex: Função Seno" placeholderTextColor="#fff" />
                </View>
                <Text style={styles.sectionTitle}>
                    Flashcards
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <FlatList
                        data={cards}
                        keyExtractor={(_, index) => String(index) }
                        renderItem={ContentButton}
                        numColumns={2}
                        contentContainerStyle={{alignItems: 'center', width: dimensions.width - 32}}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={cards.length % 2 === 0 ?  (
                            <BorderlessButton style={styles.buttonCard} onPress={() => setModalIsVisible(true)}>
                                <Icon name="plus" size={50} color={Colors.white} />
                            </BorderlessButton>
                        ) : null}
                    />
                </View>

                <RectButton style={styles.button} onPress={submitDeck}>
                    <Text style={{...fonts.textBolded, color: Colors.title}}>Criar deck</Text>
                </RectButton>
            </ScrollView>
            {modalIsVisible && <Modal onPress={setModalIsVisible} />}
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
        textAlign: 'center'
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