import React, {useContext, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { BorderlessButton, RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import AnimatedLottieView from 'lottie-react-native';

import {Colors} from '../../colors';
import { AuthContext } from '../../contexts/auth/authContext';
import animation from '../../assets/animation/submit.json';
import { fonts } from '../../fonts';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface PropsType {
  onClose(): void;
  screen: string,
}

const Register = (props: PropsType) => {
  const {
    screenState,
    userName,
    secondName,
    password,
    email,
    passwordConfirm,
    setPasswordConfirm,
    setScreenState,
    signIn, 
    register, 
    setUserName,
    setSecondName,
    setPassword,
    setEmail,

  } = useContext(AuthContext);
  const translateEff = useRef(new Animated.Value(HEIGHT/1.2)).current;

  const texts = [
    {
      title: 'Registrar-se',
      description: 'Preencha todas informações necessárias para o seu cadastro!'
    },
    {
      title: 'Conectar-se',
      description: 'Que bom que você está de volta!'
    }
  ]

  useEffect(() => {
    Animated.spring(translateEff, {
      toValue: 10,
      useNativeDriver: true,
    }).start()
  }, [])

  async function handleRegister(){
    const stats = await register();

    if(stats === 'CREATED') {
      setTimeout(() => {
        setScreenState('INITIAL')
        closeRegister();
      }, 500)
    }
  }

  function handleSecondName(e: string) {
    const name = userName;
    const newName = name + ' ' + e;
    setUserName(newName);
  }
  
  console.log(screenState)

  function closeRegister() {
    Animated.spring(translateEff, {
      toValue: HEIGHT/1.2,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      props.onClose()
    }, 300)
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'position' : 'padding' }
      keyboardVerticalOffset={Platform.OS === 'ios' ? -HEIGHT/4.25 : -100 }
      style={styles.Background}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundOnboarding}
      />
        {screenState === 'SUCESSO' && (
            <AnimatedLottieView
              style={{zIndex: 33}}
              source={animation}
              autoPlay
              loop={false}
            />
        )}
        <Animated.View style={[styles.registerWrapper, {transform: [{translateY: translateEff}]}]}>
          <ScrollView
            style={{height: HEIGHT}}
            showsVerticalScrollIndicator={false}
          >
            <BorderlessButton onPress={() => closeRegister()}>
              <Icon name="x" size={32} color={Colors.red} />
            </BorderlessButton>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>{props.screen === 'REGISTER' ? texts[0].title : texts[1].title }</Text>
              <Text style={fonts.description}>{props.screen === 'REGISTER' ? texts[0].description : texts[1].description }</Text>
            </View>
          <View>
            {props.screen === 'REGISTER' && (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputText}>Nome</Text>
                  <TextInput 
                    style={styles.textInput} 
                    placeholder="Nome" 
                    placeholderTextColor="#5a5555" 
                    value={userName}
                    onChangeText={e => setUserName(e)}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputText}>Sobrenome</Text>
                  <TextInput 
                    style={styles.textInput} 
                    placeholder="Sobrenome" 
                    value={secondName}
                    placeholderTextColor="#5a5555" 
                    onChangeText={e => setSecondName(e)}
                  />
                </View>
              </>
            )}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputText}>Email</Text>
              <TextInput 
                style={styles.textInput} 
                placeholder="exemplo@hotmail.com" 
                placeholderTextColor="#5a5555" 
                value={email}
                onChangeText={e => setEmail(e)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputText}>Senha</Text>
              <TextInput 
                style={styles.textInput} 
                placeholder="Sua senha" 
                placeholderTextColor="#5a5555"
                secureTextEntry 
                value={password}
                onChangeText={e => setPassword(e)}
              />
            </View>
            {props.screen === 'REGISTER' && (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>Confirme sua senha</Text>
                <TextInput 
                  style={styles.textInput} 
                  placeholder="Sua senha novamente"
                  secureTextEntry 
                  placeholderTextColor="#5a5555" 
                  value={passwordConfirm}
                  onChangeText={e => setPasswordConfirm(e)}
                />
              </View>
            )}
          </View>
          {screenState !== 'SUCESSO' && (
            <View style={styles.footer}>
              <RectButton 
                style={styles.finishButton}
                onPress={props.screen === 'REGISTER' ? handleRegister : signIn } 
              >
                {screenState === 'REGISTERING' ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Icon name="check" size={38} color="#fff" />
                ) }
              </RectButton>
          </View>
          )} 
          </ScrollView>
        </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Background: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.05)',
    flex: 1,
    width: WIDTH,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end'
  },
  registerWrapper: {
    height: Dimensions.get('window').height/1.2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  header: {
    marginTop: 16,
    marginBottom: 18
  },
  sectionTitle: {
    ...fonts.title
  },
  inputWrapper: {
    marginTop: 24,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '600'
  },
  textInput: {
    width: '100%',
    height: 48,
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomWidth: 1,
  },
  footer: {},
  finishButton: {
    backgroundColor: Colors.green,
    width: '100%',
    marginTop: 32,
    height: HEIGHT/15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})

export default Register;
