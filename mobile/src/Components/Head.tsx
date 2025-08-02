import React from 'react';
import {View, Text, Image, StyleSheet, Platform} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { fonts } from '../fonts';
import { Colors } from '../colors';

interface Props {
  title: String,
  description?: string,
}

const Head = (props: Props) => {

  const Navigation = useNavigation();

  function returnToBack(){
    return Navigation.goBack();
  }

  return(
    <View style={{marginTop: Platform.OS === 'ios' ? 48 :  12 , marginBottom: props.description ? 32 : 0}}>
        <BorderlessButton style={{marginBottom: 12, width: 48, height: 48}} onPress={returnToBack}>
          <Icon name="chevron-left" size={32} color="#6486DE"/>
        </BorderlessButton>
        <Text style={{...fonts.HeadTitle, color: Colors.title, marginBottom: 4}}>{props.title}</Text>
        <Text style={{...fonts.HeadDescription, color: Colors.title}}>{props.description}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 72, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: (Platform.OS === 'ios' ? 32 : 0),
  },

  title: {
    ...fonts.sectionTitle,
    color: '#6486DE',
  },

  logo: {
    width: 40, 
    height: 40,
  }
})

export default Head;