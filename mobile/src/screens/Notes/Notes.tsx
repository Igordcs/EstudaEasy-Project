import React  from 'react';
import {Text, StyleSheet, ScrollView, Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Head from '../../Components/Head';
import noFoundImg from '../../assets/noFound.png';
import { fonts } from '../../fonts';
import { Colors } from '../../colors';
import { TaskButton } from '../../Components/TaskButton';
import { TaskContext } from '../../contexts/Tasks/taskContext';

const Notes = () => {
  const {tasks, completeTask, loadStoragedValues} = React.useContext(TaskContext)
  const Navigation = useNavigation();

  function handleNavigate() {
    return Navigation.navigate('addNotes');
  }

  useFocusEffect(() => {
    loadStoragedValues();
  })

  return (
    <ScrollView style={styles.background}>

      <Head title="Tarefas" description="Organize seu estudo em pequenas tarefas que sejam de fácil realização." />


      {tasks.length < 1 && (
        <Image source={noFoundImg} resizeMode="contain" style={{alignSelf: 'center', marginTop: 28, marginBottom: 48}} />
      )}
      {tasks.map((task, index) => (
        <TaskButton key={index} id={index} title={task.title} duration={task.duration} shortBreak={task.shortBreak} completed={task.completed}  />
      ))}

      <RectButton style={styles.addButton} onPress={handleNavigate}>
        <Text style={{...fonts.textBolded, color: Colors.white, fontSize: 18}}>Adicionar tarefa</Text>
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

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6486DE',
    marginBottom: 8,
    marginTop: 16,
  },

  cardNote: {
    marginTop: 48,
    width: 200,
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButton: {
    width: '100%',
    height: 48,
    backgroundColor: Colors.title,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  }
});

export default Notes;
