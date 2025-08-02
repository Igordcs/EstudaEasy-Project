import React, {createContext, Dispatch, SetStateAction} from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../auth/authContext';

export interface  DeckType {
    title: string,
    cards: CardType[],
}
export interface CardType {
    question: string,
    answer: string,
}

export interface Colection {
    title: string,
    decks: DeckType[],
}

interface DeckProps {
    colections: Colection[],
    decks: DeckType[],
    cards: CardType[],
    decksVisible: DeckType[],
    ColectionIndex: number,
    deckIndex: number,
    setColections: React.Dispatch<React.SetStateAction<Colection[]>>,
    setDecks: React.Dispatch<React.SetStateAction<DeckType[]>>,
    setColectionIndex: React.Dispatch<React.SetStateAction<number>>,
    setDeckIndex: React.Dispatch<React.SetStateAction<number>>,
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
    addDeck(deckTitle: string, ColectionIndex?: number): void,
    addCard(title: string, answer: string): void,
    addCollection(coletionTitle: string): void,
    loadStoragedValues(): Promise<void>,
    removeCollection(index: number): Promise<void>,
    removeDeck(index: number): Promise<void>,
    removeCard(index: number): Promise<void>,
    resetStates(): void,
}

export const DeckContext = createContext<DeckProps>({} as DeckProps);

export const DeckProvider: React.FC = ({children}) => {
    const {user} = React.useContext(AuthContext);
    const [colections, setColections] = React.useState<Array<Colection>>([]);
    const [decks, setDecks] = React.useState<Array<DeckType>>([]);
    const [cards, setCards] = React.useState<Array<CardType>>([]);
    const [ColectionIndex, setColectionIndex] = React.useState(-1);
    const [deckIndex, setDeckIndex] = React.useState(-1);
    const [decksVisible, setDecksVisible] = React.useState<Array<DeckType>>([])

    React.useEffect(() => {
        if(ColectionIndex !== -1 ) {
            const cardsCollection = colections[ColectionIndex].decks;
            setDecksVisible(cardsCollection);
        }
    }, [ColectionIndex])

    async function loadStoragedValues() {
        const storagedValues = await AsyncStorage.getItem(`@EstudaEasyColections-${user?.nome}`);
        
        if(storagedValues) {
            setColections(JSON.parse(storagedValues));
        }
    }

    function resetStates() {
        setCards([])
        setDecks([])
    } 

    async function addCard(title: string, answer: string) {

        const storagedValues = await AsyncStorage.getItem(`@EstudaEasyColections-${user?.nome}`);

        if(storagedValues) {
            if(deckIndex !== -1){
                const allColle = JSON.parse(storagedValues);
                const newCard = {question: title, answer};
                allColle[ColectionIndex].decks[deckIndex].cards = [...allColle[ColectionIndex].decks[deckIndex].cards, newCard];
                await AsyncStorage.setItem(`@EstudaEasyColections-${user?.nome}`, JSON.stringify(allColle));
                setColections(allColle);
                setDecksVisible(allColle[ColectionIndex].decks);
                setCards([]);
                return;
            }   
        }

        const newCardsArray = cards;
        const newCard = {question: title, answer};
        setCards([...newCardsArray, newCard]);
    }

    async function addDeck (deckTitle: string) {
        if(cards.length < 1)
            return Alert.alert('Você deve adicionar pelo menos um flashcard');

        const storagedValues = await AsyncStorage.getItem(`@EstudaEasyColections-${user?.nome}`);

        if(storagedValues){
            if(ColectionIndex !== -1) {
                const allColle = JSON.parse(storagedValues);
                const deck = {title: deckTitle, cards};
                allColle[ColectionIndex].decks = [...allColle[ColectionIndex].decks, deck];
                await AsyncStorage.setItem(`@EstudaEasyColections-${user?.nome}`, JSON.stringify(allColle));
                setColections(allColle);
                setDecksVisible(allColle[ColectionIndex].decks);
                setCards([]);
                return;
            }
        }
        
        const array = decks;
        const deck = {title: deckTitle, cards};
        setDecks([...array, deck]);
        setCards([]);
    }

    async function addCollection(coletionTitle: string) {
        if(decks.length < 1)
            return Alert.alert('Crie pelo menos um deck');

        const storagedValues = await AsyncStorage.getItem(`@EstudaEasyColections-${user?.nome}`);

        if(storagedValues) {
            const oldColections: Colection[]  = JSON.parse(storagedValues);
            const colection = {title: coletionTitle, decks}
            const newArray = [...oldColections, colection]

            await AsyncStorage.setItem(`@EstudaEasyColections-${user?.nome}`, JSON.stringify(newArray));
            setColections(newArray);
            setDecks([]);
            return;
        }

        const colection = {title: coletionTitle, decks}
        const newArray = [colection]

        await AsyncStorage.setItem(`@EstudaEasyColections-${user?.nome}`, JSON.stringify(newArray));
        setColections(newArray);
        setDecks([]);
    }

    async function removeCollection(index: number) {
        const storagedValues = await AsyncStorage.getItem(`@EstudaEasyColections-${user?.nome}`);

        if(storagedValues) {
            const oldColections: Colection[]  = JSON.parse(storagedValues);
            oldColections.splice(index, 1);
            await AsyncStorage.setItem(`@EstudaEasyColections-${user?.nome}`, JSON.stringify(oldColections));
            setColections(oldColections);
        }
    }

    async function removeDeck(index: number) {
        const storagedValues = await AsyncStorage.getItem(`@EstudaEasyColections-${user?.nome}`);

        if(storagedValues) {
            if(ColectionIndex !== -1) {
                const oldColections: Colection[]  = JSON.parse(storagedValues);
                oldColections[ColectionIndex].decks.splice(index, 1);
                await AsyncStorage.setItem(`@EstudaEasyColections-${user?.nome}`, JSON.stringify(oldColections));
                setColections(oldColections);
                setDecksVisible(oldColections[ColectionIndex].decks);
                setCards([]);
            }
            const deck = decks;
            deck.splice(index, 1);
            setDecks([...decks]);
        }
    }

    async function removeCard(index: number) {
        if(ColectionIndex !== -1) {
            if(deckIndex !== -1) {
                const storagedValues = await AsyncStorage.getItem(`@EstudaEasyColections-${user?.nome}`);

                if(storagedValues) {
                    const oldColections: Colection[]  = JSON.parse(storagedValues);
                    oldColections[ColectionIndex].decks[deckIndex].cards.splice(index, 1);
                    await AsyncStorage.setItem(`@EstudaEasyColections-${user?.nome}`, JSON.stringify(oldColections));
                    setColections(oldColections);
                    setDecksVisible(oldColections[ColectionIndex].decks);
                    setCards([]);
                    return;
                }
            }
        }
        const card = cards;
        card.splice(index, 1);
        setCards([...card]);
    }

    return (
        <DeckContext.Provider
            value={{
                colections,
                decks,
                cards,
                ColectionIndex,
                decksVisible,
                deckIndex,
                setDecks,
                setColections,
                setCards,
                addDeck,
                addCard,
                addCollection,
                setColectionIndex,
                setDeckIndex,
                loadStoragedValues,
                removeCollection,
                removeCard,
                removeDeck,
                resetStates
            }}>
            {children}
        </DeckContext.Provider>
    );
};
