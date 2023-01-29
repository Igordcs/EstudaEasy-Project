import React from 'react';
import { View, Text} from 'react-native';

export const FlashCardButton = () => {
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