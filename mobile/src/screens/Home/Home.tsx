import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {
  BorderlessButton,
  FlatList,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import pomodoroIcon from '../../assets/icons/quizIcon.png';
import quizIcon from '../../assets/icons/exercisesIcon.png';
import notesIcon from '../../assets/icons/notesIcon.png';
import FlashcardIcon from '../../assets/icons/FlashcardIcon.png';
import ContentCard from '../../Components/ContentCard';
import ContentTab from '../../Components/ContentTab';
import {AuthContext} from '../../contexts/auth/authContext';
import { fonts } from '../../fonts';
import { HeaderCard } from '../../Components/HeaderCard';
import { HomeContext } from '../../contexts/Home/homeContext';
import { LevelButton } from '../../Components/LevelButton';
import { Colors } from '../../colors';
import { Advice } from '../../Components/Advice';

interface ContentType {
  id: number,
  content_name: string,
  content_type: string,
}

interface DataType {
  exatas: Array<ContentType>,
  humanas: Array<ContentType>
}

const WIDTH = Dimensions.get('window').width;

const Home = () => {
  const {signOut, user} = useContext(AuthContext);
  const {loadContents, loading, data} = useContext(HomeContext);
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const navigation = useNavigation();

  const [content, setContent] = useState('exatas');

  function handleNavigateTo(param: string) {
    setModalIsVisible(false)
    return navigation.navigate(param);
  }

  function handleNavigateToClasses(id: number){
    return navigation.navigate('ContentClasses', {id});
  }

  useEffect(() => {
    loadContents();
  }, [])

  function renderItem(item: ContentType) {
    return (
      <ContentCard
        title={item.content_name}
        onPress={() => handleNavigateToClasses(item.id)}
      />
    );
  }

  console.log(user)

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      {modalIsVisible && (
        <Advice visible={modalIsVisible} onReject={() => setModalIsVisible(false)} onConfirm={() => handleNavigateTo('Quiz')} />
      )}
      <FlatList
        data={null}
        renderItem={()=>null}
        style={styles.background}
        ListHeaderComponent={(
          <View>
            
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
              <View style={{marginTop: 16, width: Dimensions.get('window').width * 0.8, paddingLeft: 16}}>
                <Text style={styles.greetings}>
                  Aoba,
                    <Text style={[styles.greetings, {fontFamily: 'Ubuntu_700Bold'}]}>
                    {` ${user?.nome}!`}
                  </Text>
                </Text>
              </View>

              <BorderlessButton style={{width: 24, height: 24, alignSelf: 'flex-end', marginRight: 16}} onPress={() => handleNavigateTo('Profile')}>
                <Icon name="gear" color={Colors.boldBlue} size={24} />
              </BorderlessButton>
            </View>

            {user?.level && user?.experience && (
              <LevelButton level={user.level} exp={user.experience} />
            )}
            
            <View>
              <Text style={styles.sectionTitle}>Aprofundamento</Text>

              <ScrollView
                style={styles.header}
                contentContainerStyle={{paddingLeft: 10}}
                horizontal
                showsHorizontalScrollIndicator={false}>
                  <HeaderCard onPress={() => setModalIsVisible(true)} text="Quiz" uri={quizIcon} />
                  <HeaderCard onPress={() => handleNavigateTo('Notes')} text="Anotações" uri={notesIcon} />
                  <HeaderCard onPress={() => handleNavigateTo('Pomodoro')} text="Pomodoro" uri={pomodoroIcon} />
                  <HeaderCard onPress={() => handleNavigateTo('FlashCardHome')} text="Flashcards" uri={FlashcardIcon} />
              </ScrollView>
            </View>
        </View>
        )}
        ListFooterComponent={(
          <View>
          <View>
            <ContentTab content={content} setContent={setContent} />
          </View>
          <SafeAreaView style={styles.cardWrapper}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                numColumns={2}
                data={data && content === 'exatas' ? data.exatas : data.humanas}
                renderItem={({item}) => renderItem(item)}
                keyExtractor={(item) => item.id}
              />
            ) }
        </SafeAreaView>
        </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.blueBackground,
  },

  greetings: {
    color: '#6486DE',
    ...fonts.title,
    fontFamily: 'Ubuntu_400Regular'
  },

  description: {
    color: '#6486DE',
    ...fonts.onboardingDescription,
    marginVertical: 14,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: Colors.title,
    marginBottom: 8,
    paddingLeft: 16,
    marginTop: 18,
  },

  header: {
    flexDirection: 'row',
  },

  cardWrapper: {
    marginTop: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
