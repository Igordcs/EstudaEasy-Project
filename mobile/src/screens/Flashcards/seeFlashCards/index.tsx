import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../../colors';
import ContentCard from '../../../Components/ContentCard';
import { CardType, DeckContext, DeckType } from '../../../contexts/Deck/DeckContext';
import { fonts } from '../../../fonts';
import { Modal } from '../addFlashCard/modal';

const dimensions = Dimensions.get('window');

export const SeeFlashCards = () => {
    const {colections, ColectionIndex, decksVisible, deckIndex, removeCard} = React.useContext(DeckContext);
    const [modalIsVisible, setModalIsVisible] = React.useState(false);
    const Navigation = useNavigation();
    const route = useRoute();

    function returnToBack(){
        return Navigation.goBack();
    }

    const submitRemove = async (index: number) => {
        await removeCard(index);
    }

    const ContentButton = ({item, index}: {item: CardType, index: number}) => {

        if(index === decksVisible[deckIndex].cards.length - 1 && decksVisible[deckIndex].cards.length % 2 !== 0) {
            return (
                <View style={{flexDirection: 'row'}}>
                    <RectButton style={styles.card} key={`${index}-${item.question}`}>
                        <Text style={styles.cardText}>{item.question}</Text>
                        <TouchableOpacity style={styles.remove} onPress={() => submitRemove(index)}>
                            <Icon name="trash-2" size={24} color={Colors.white} />
                        </TouchableOpacity>
                    </RectButton>
                    <RectButton style={styles.buttonCard} onPress={() => setModalIsVisible(true)}>
                        <Icon name="plus" size={50} color={Colors.white} />
                    </RectButton>
                </View>
            )
        }

        return (
            <View style={styles.card} key={`${index}-${item.question}`}>
                <View style={{height: 30}}></View>
                <Text style={styles.cardText}>{item.question}</Text>
                <TouchableOpacity style={styles.remove} onPress={() => submitRemove(index)}>
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
                <Text style={styles.title}>{colections[ColectionIndex].decks[deckIndex].title}</Text>
                <View style={{width: 30}}></View>
            </View>

            
            <Text style={[styles.title, {marginBottom: 24}]}>Flashcards do baralho</Text>
            <RectButton 
                style={{width: dimensions.width - 64, borderRadius: 8, marginBottom: 24, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 48, backgroundColor: Colors.white}}
                onPress={() => Navigation.navigate('PlayingFlashCards')}
            >
                <Text style={{...fonts.textBolded, color: Colors.title}}>Revisar flashcards</Text>
            </RectButton>
            <View style={styles.contentWrapper}>
                <FlatList
                    data={decksVisible[deckIndex].cards}
                    keyExtractor={(_, index) => String(index) }
                    renderItem={ContentButton}
                    numColumns={2}
                    contentContainerStyle={{alignItems: 'center', width: dimensions.width - 32}}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={decksVisible[deckIndex].cards.length % 2 === 0 ?  (
                        <BorderlessButton style={styles.buttonCard} onPress={() => setModalIsVisible(true)}>
                            <Icon name="plus" size={50} color={Colors.white} />
                        </BorderlessButton>
                    ) : null}
                />
            </View>
            {modalIsVisible && <Modal onPress={setModalIsVisible} selected={deckIndex} />}
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
    contentWrapper: {
        flexDirection: 'row',
        width: dimensions.width - 32,
    },
    card: {
        width: dimensions.width * 0.4,
        height: (dimensions.width * 0.4) * 1.2,
        backgroundColor: Colors.white,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
        marginVertical: 6,
    },
    cardText: {
        ...fonts.flashCardTitle,

        width: dimensions.width / 4,
        textAlign: 'center',
        color: Colors.title,
    },
    buttonCard: {
        width: dimensions.width * 0.4,
        height: (dimensions.width * 0.4) * 1.2,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
        marginVertical: 6,
    },
    button: {
        width: dimensions.width - 64,
        borderRadius: 8,
        height: 48,
        backgroundColor: Colors.title,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 24,
    },
    buttonText: {
        ...fonts.textBolded,
        color: Colors.white,
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