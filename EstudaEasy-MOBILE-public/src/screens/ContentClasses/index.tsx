import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator} from 'react-native';
import { getClasses } from '../../api/Content/content';
import { Colors } from '../../colors';
import Head from '../../Components/Head';
import { fonts } from '../../fonts';

const WIDTH = Dimensions.get('screen').width;

interface RouteProps {
    id: number,
}

interface ResumeType {
    id: number,
    name: string,
}

interface ClassesType {
    id: number,
    name: string,
    content_teach_id: number,
    ClassResumes: Array<ResumeType>
}

export const ContentClasses: React.FC = () => {
    const [classes, setClasses] = useState<ClassesType[]>([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const route = useRoute();
    const {id} = route.params as RouteProps;

    useEffect(() => {
        async function loadClasses(id: number) {
            setLoading(true)
            const data = await getClasses(id);
            setClasses(data);
            setLoading(false);
        }

        loadClasses(id);
    }, [])

    async function handleNavigateToResume(id: number, name: string){
        return navigation.navigate('Resume', {id, name});
    }

    const renderItem = (item: ClassesType) => {
        return (
            <View key={item.name}> 
            {loading && <ActivityIndicator size='large' color={Colors.title}  />}
            <Text style={styles.title}>{item.name}</Text>

            <FlatList
                data={item.ClassResumes}
                numColumns={2}
                stickyHeaderIndices={[0]}
                renderItem={({ item } ) => {
                    return (
                        <View>
                            <TouchableOpacity 
                                style={styles.card} 
                                onPress={() => handleNavigateToResume(item.id, item.name)}
                            >
                                <Text style={styles.cardTitle}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        
            </View>
        )
    }

    return(
        <FlatList 
            style={styles.background}
            ListHeaderComponent={(
                <Head title="Conteúdos" description="Cada resumo lido é recompensado em XP. Espero que tenha bons estudos!" />
            )}
            keyExtractor={(item, index) => item.name}
            data={classes}
            renderItem={({ item } ) => renderItem(item)}
        />
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        color: Colors.title,
        fontWeight: '700',
        marginVertical: 12,
    },
    card: {
        padding: 4,
        justifyContent: 'flex-end',
        width: WIDTH / 2.3,
        marginRight: 12,
        backgroundColor: Colors.cardTitle,
        height: 100,
        borderRadius: 6,
        marginBottom: 12,
    },
    cardTitle: {
        textAlign: 'center',
        ...fonts.resumeButtonText,
        color: Colors.white,
    },
});