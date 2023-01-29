import React from 'react';
import { ImageURISource } from 'react-native';
import { StyleSheet, Text, Image} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface CardProps {
    onPress(): void;
    uri: ImageURISource,
    text: string,
}

export const HeaderCard = (props: CardProps) => {
    return (
        <RectButton
            style={styles.headerButton}
            onPress={props.onPress}
        >
            <Text style={styles.headerButtonText}>{props.text}</Text>
            <Image
                source={props.uri}
                style={{width: 72, height: 72, alignSelf: 'flex-end'}}
            />
      </RectButton>
    );
}

const styles = StyleSheet.create({
    headerButton: {
        width: 120,
        height: 140,
        borderRadius: 16,
        backgroundColor: '#E9EFFF',
        paddingRight: 8,
        paddingBottom: 8,
    
        marginRight: 10,
    
        justifyContent: 'flex-end',
      },
    
      headerButtonText: {
        color: '#8AA7EF',
        fontSize: 16,
        fontWeight: '700',
        position: 'absolute',
        top: 14,
    
        marginLeft: 10,
        marginVertical: 2,
      },
})