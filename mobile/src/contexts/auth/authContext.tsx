import React, {createContext, Dispatch, SetStateAction} from 'react';
import {useState} from 'react';
import * as auth from '../../api/auth/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';
import {useEffect} from 'react';
import { Alert } from 'react-native';

interface User {
  id: number;
  nome: string;
  experience: number,
  level: number,
  email: string,
}

interface AuthProps {
  signed: boolean;
  user: User | null;
  firstLogin: boolean;
  screenState: string;
  userName: string,
  secondName: string,
  email: string,
  password: string,
  passwordConfirm: string,
  setPasswordConfirm: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>,
  setEmail: Dispatch<SetStateAction<string>>,
  setUserName: Dispatch<SetStateAction<string>>;
  setSecondName: Dispatch<SetStateAction<string>>;
  setScreenState: Dispatch<SetStateAction<string>>;
  signIn(): void;
  signOut(): void;
  register(): Promise<void | 'CREATED'>;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  updateUser(exp: number, level: number): Promise<void>;
  setUserFirstLogin(): Promise<void>;
}

interface Data {
  errors: Array<string>
  token: string;
  user: User | null;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [screenState, setScreenState] = useState('INITIAL');
  const [firstLogin, setFirstLogin] = useState(true);
  const [userName, setUserName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  async function signIn() {
    setScreenState('REGISTERING');
    const data: Data = await auth.signIn(email, password);

    if(data.errors){
      setScreenState('INITIAL');
      return Alert.alert(data.errors[0]);
    }

    setScreenState('SUCESSO');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');

    setTimeout(async () => {
      await AsyncStorage.multiSet([
        ['@EstudaEasy:Token', data.token],
        ['@EstudaEasy:User', JSON.stringify(data.user)],
      ]);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
  
      setUser(data.user);
      setScreenState('INITIAL')
    }, 1500)
  }

  async function updateUser(exp: number, level: number) {
    const storagedUser = await AsyncStorage.getItem('@EstudaEasy:User');

    if(storagedUser) {
      const newUser: User = JSON.parse(storagedUser);
      newUser.experience = Number(exp);
      newUser.level = Number(level);
      await AsyncStorage.setItem('@EstudaEasy:User', JSON.stringify(newUser));
      setUser(newUser);
      console.log('NEWUSER: ', newUser)
    }
    console.log('UPDATEUSER:', storagedUser);
  }

  function validateFields() {

    if(userName.length < 3 || userName.length > 255) {
      Alert.alert('Seu nome deve ter entre 3 e 255 letras.');
      return true
    }
    if(secondName.length < 3 || secondName.length > 255) {
      Alert.alert('Seu Sobrenome deve ter entre 3 e 255 letras.');
      return true
    }
    if(password.length < 8 ) {
      Alert.alert('Sua senha tem menos de 8 caracteres.');
      return true
    }
    if(password !== passwordConfirm) {
      Alert.alert('Suas senhas não são idênticas.')
      return true 
    }

    return false
  }

  async function register() {
    setScreenState('REGISTERING');

    const validation = validateFields();

    if(validation){
      setScreenState('INITIAL');
      return;
    }
    const fullname = `${userName} ${secondName}`

    const data = await auth.register(fullname, email, password);
    
    if(data.errors){
      setScreenState('INITIAL');
      return Alert.alert(data.errors[0]);
    }

    setScreenState('SUCESSO');
    return 'CREATED';
  }

  useEffect(() => {
    async function LoadStoragedValues() {
      const storagedUser = await AsyncStorage.getItem('@EstudaEasy:User');
      const storagedToken = await AsyncStorage.getItem('@EstudaEasy:Token');
      const first = await AsyncStorage.getItem('@EstudaEasy:FirstLogin');

      if (storagedUser && storagedToken && first) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setFirstLogin(Boolean(first))
        setUser(JSON.parse(storagedUser));
      }

    }
    LoadStoragedValues();
  }, []);

  async function setUserFirstLogin() {
    await AsyncStorage.setItem('@EstudaEasy:FirstLogin', String(false));
  }

  function signOut() {
    AsyncStorage.multiRemove(['@EstudaEasy:User', '@EstudaEasy:Token']).then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        userName,
        email,
        password,
        firstLogin,
        screenState,
        passwordConfirm,
        secondName,
        setUser,
        setPasswordConfirm,
        setScreenState,
        setEmail,
        setPassword,
        setUserName,
        signIn,
        signOut,
        register,
        updateUser,
        setSecondName,
        setUserFirstLogin
      }}>
      {children}
    </AuthContext.Provider>
  );
};
