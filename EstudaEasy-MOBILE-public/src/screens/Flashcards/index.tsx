import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../colors';
import ContentCard from '../../Components/ContentCard';
import Head from '../../Components/Head';
import { Colection, DeckContext } from '../../contexts/Deck/DeckContext';
import { fonts } from '../../fonts';

const dimensions = Dimensions.get('window')

export const FlashcardHome = () => {
    const {colections, setColectionIndex, setDeckIndex, loadStoragedValues, removeCollection} = React.useContext(DeckContext);
    const Navigation = useNavigation();

    const HandleNavigate = (index: number) => {
        setColectionIndex(index)
        Navigation.navigate('SeeDeck');
    }

    const handleNavigateToAddCollection = () => {
        setColectionIndex(-1);
        setDeckIndex(-1);
        Navigation.navigate('AddFlashCardHome');
    }

    useFocusEffect(() => {
        loadStoragedValues()
    })

    const ContentButton = ({item, index}: {item: Colection, index: number}) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => HandleNavigate(index)}>
                <TouchableOpacity style={styles.remove} onPress={() => removeCollection(index)}>
                    <Icon name="trash-2" size={24} color={Colors.white}  />
                </TouchableOpacity>
                <Text style={styles.cardText}>{item.title}</Text>
                <Text style={[styles.cardText, {color: '#f3f3f3da'}]}>{item.decks.length}{' '}{item.decks.length > 1 ? 'decks' : 'deck' }</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.background}>
            <Head title="Flashcards" description="Para memorizar o conteúdo, adicione novos cartões de acordo com o conteúdo estudado." />
            
            <FlatList
                data={colections}
                keyExtractor={(_, index) => String(index) }
                renderItem={ContentButton}
                numColumns={2}
                bounces={false}
                ListFooterComponent={
                    <RectButton style={styles.button} onPress={handleNavigateToAddCollection}>
                        <Text style={styles.buttonText}>Criar coleção</Text>
                    </RectButton>
                }
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 16,

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
    card: {
        width: dimensions.width/2.5,
        height: (dimensions.width/2.5) * 1.2,
        borderRadius: 16,
        justifyContent: 'flex-end',
    
        backgroundColor: '#617EC9',
        marginHorizontal: 6,
        marginVertical: 10,
        paddingBottom: 8,
      },
    
    cardText: {
        color: Colors.white,
        ...fonts.cardTitle,
        
        marginLeft: 10,
        marginVertical: 2,
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
        borderTopRightRadius: 16,
        borderBottomRightRadius: 0,
    }
})