import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../../colors';
import { DeckContext, DeckType } from '../../../contexts/Deck/DeckContext';
import { fonts } from '../../../fonts';

const dimensions = Dimensions.get('window');

export const SeeDeck = () => {
    const {colections, ColectionIndex, decksVisible, setDeckIndex, removeDeck} = React.useContext(DeckContext);
    const Navigation = useNavigation();

    function returnToBack(){
        return Navigation.goBack();
    }

    function handleNavigate(index: number) {
        setDeckIndex(index);
        Navigation.navigate('seeFlashCards');
    }

    function handleNavigateToAddDeck() {
        setDeckIndex(-1);
        Navigation.navigate('AddDeck');
    }

    const ContentButton = ({item, index}: {item: DeckType, index: number}) => {

        if(index === decksVisible.length - 1 && decksVisible.length % 2 !== 0) {
            return (
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}} key={`${index}-${item.title}`}>
                        <TouchableOpacity style={styles.card} onPress={() => handleNavigate(index)}>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.cardText}>{item.title}</Text>
                                <Text style={[styles.cardText, {color: Colors.underBlue}]}>{`${item.cards.length} flashcards`}</Text>
                            </View>
                            <TouchableOpacity style={styles.remove} onPress={() => removeDeck(index)}>
                                <Icon name="trash-2" size={24} color={Colors.white} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <RectButton style={styles.buttonCard} onPress={() => handleNavigateToAddDeck()}>
                        <Icon name="plus" size={50} color={Colors.white} />
                    </RectButton>
                </View>
            )
        }

        return (
            <View style={{flexDirection: 'column'}} key={`${index}-${item.title}`}>
                <TouchableOpacity style={styles.card} onPress={() => handleNavigate(index)}>
                    <View style={{height: 30}}></View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.cardText}>{item.title}</Text>
                        <Text style={[styles.cardText, {color: Colors.underBlue}]}>{`${item.cards.length} flashcards`}</Text>
                    </View>
                    <TouchableOpacity style={styles.remove} onPress={() => removeDeck(index)}>
                        <Icon name="trash-2" size={24} color={Colors.white} />
                    </TouchableOpacity>
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
                <Text style={styles.title}>{colections[ColectionIndex].title}</Text>
                <View style={{width: 30}}></View>
            </View>
            
            <Text style={[styles.title, {marginBottom: 24}]}>Seus baralhos</Text>
            <FlatList
                data={decksVisible}
                keyExtractor={(_, index) => String(index) }
                renderItem={ContentButton}
                numColumns={2}
                contentContainerStyle={{alignItems: 'center', width: dimensions.width - 32}}
                bounces={false}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={decksVisible.length % 2 === 0 ?  (
                    <RectButton style={styles.buttonCard} onPress={() => handleNavigateToAddDeck()}>
                        <Icon name="plus" size={50} color={Colors.white} />
                    </RectButton>
                ) : null}
            />
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
        marginRight: 12,
    },
    cardText: {
        ...fonts.flashCardTitle,
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