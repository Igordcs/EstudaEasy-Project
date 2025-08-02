import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { Colors } from '../../colors';
import {createNote} from '../../api/Notes/notes';

import Head from '../../Components/Head';
import { useNavigation } from '@react-navigation/core';
import { fonts } from '../../fonts';
import { TimePicker } from '../../Components/TimePicker';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import { TaskContext } from '../../contexts/Tasks/taskContext';

const AddNotes = () => {
  const {createTask} = React.useContext(TaskContext)
  const [text, setText] = useState('');
  const [duration, setDuration] = useState(25);
  const [shortBreak, setBreak] = useState(10);
  const navigation = useNavigation();

  const handleAddNotes = async () => {
    if(text.length < 3)
      return Alert.alert('Dê um nome maior para sua tarefa!');
      
    createTask(text, duration, shortBreak)
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.background}>
      <Head title="Adicionar tarefa" />

      <View style={styles.inputWrapper}>
        <Text style={{...fonts.textBolded, color: Colors.title, marginBottom: 8}}>Nome da tarefa</Text>
        <TextInput 
          style={styles.input} 
          value={text} onChangeText={e => setText(e)} 
          placeholder="Ex: Estudar reações inorgânicas" 
          placeholderTextColor="#7F9EED" 
        />
      </View>

      <Text style={{...fonts.textBolded, color: Colors.title, marginBottom: 12}}>Ajustes da tarefa</Text>

      <View style={{backgroundColor: "#112672", padding: 16, borderRadius: 12}}>
        <Text style={{...fonts.textBolded, color: Colors.white, marginBottom: 12, textAlign: 'center'}}>Tempo de foco</Text>
        <TimePicker initial={25} onUpdate={setDuration} color={Colors.white} />
        <Text style={{...fonts.textBolded, color: Colors.white, marginBottom: 12, marginTop: 10, textAlign: 'center'}}>Tempo de pausa</Text>
        <TimePicker initial={10} onUpdate={setBreak} color={Colors.white}/>
      </View>

      <RectButton style={styles.addButton} onPress={handleAddNotes}>
        <Text style={{...fonts.textBolded, color: Colors.white, fontSize: 18}}>Adicionar Tarefa</Text>
      </RectButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    marginTop: 12,
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#E2E7FA',
    height: 48,
    borderRadius: 8,
    padding: 12,
    color: Colors.title,
  },
  addButton: {
    width: '100%',
    height: 48,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 48
  }
  
});

export default AddNotes;
