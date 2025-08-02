import React, { useState } from 'react';
import { Image, ImageURISource, StyleSheet, Text, View } from 'react-native';
import { RectButton, TouchableHighlight } from 'react-native-gesture-handler';

interface Props {
  name: string,
  url: ImageURISource,
  onPress: Function,
}

const SelectionButton = (props: Props) => {

  const [active, setActive] = useState(false);


  function ONPRESS () {
    props.onPress();
    setActive(!active)
  }

  return (
    <TouchableHighlight 
      style={[{backgroundColor: active ? "#ABE9FC": "#DDE7FF"}, styles.selectionButton]}
      underlayColor="#A7E7FB"
      onPress={ONPRESS}
    >
      <View>
        <Text style={styles.cardText}>{props.name}</Text>
        <Image style={{width: 60, height: 60, alignSelf: 'flex-end', marginTop: 8}} source={props.url} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  cardText: {
    color: '#617DC6',
    fontSize: 14,
    fontWeight: '700',
    
    marginLeft: 6,
  },

  selectionButton: {
    width: 100, 
    height: 100, 
    margin: 6, 
    borderRadius: 12, 
    justifyContent: 'space-around',
  },
});

export default SelectionButton