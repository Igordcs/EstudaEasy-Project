import React from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Colors } from '../../colors';
import Head from '../../Components/Head';
import { AuthContext } from '../../contexts/auth/authContext';
import { fonts } from '../../fonts';

export const Profile = () => {
  const {signOut} = React.useContext(AuthContext);


  return (
    <View style={styles.background}>
      <StatusBar backgroundColor={Colors.blueBackground} barStyle='dark-content' />

      <Head title="Perfil" description="Faça as alterações necessárias para que seu perfil fique bem melhor :) " />

      <RectButton style={styles.logout} onPress={signOut}>
        <Text style={{...fonts.text, color: '#fff'}}>{'Fazer logout'}</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 16,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.title,
  },
  textInput: {
    width: '100%',
    height: 48,
    borderStyle: 'solid',
    borderColor: Colors.title,
    borderBottomWidth: 1,
    color: Colors.title,
    marginBottom: 12,
  },
  logout: {
    backgroundColor: '#f8171765',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
})