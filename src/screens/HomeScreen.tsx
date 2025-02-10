import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

type Note = {
    id: string;
    notes: string;
    createdAt: string;
};

const HomeScreen = ({ route, navigation }: Props) => {
    const [notes, setNotes] = useState<Note[]>([]);

    // fetching notes from AsyncStorage
    const fetchNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('notes');
            if (storedNotes) {
                setNotes(JSON.parse(storedNotes));
            } else {
                setNotes([]);
            }
        } catch (error) {
            // error fetching notes
        }
    };

    // fetch notes on mount
    useFocusEffect(
        React.useCallback(() => {
            fetchNotes();
        }, [])
    );

    const deleteNote = async (id: string) => {
        try {
            const updatedNotes = notes.filter(note => note.id !== id);
            setNotes(updatedNotes);
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        } catch (error) {
            // delete error handler
        }
    };

    const confirmDelete = (id: string) => {
        Alert.alert(
            'Delete a Note',
            'Are you sure you want to delete this note?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteNote(id) }
            ],
            { cancelable: true }
        );
    };

    return (
        // View for entire space there is
        <View style={styles.outerContainer}>
            {
                notes.length === 0 ? (
                    <View>
                        <Text style={styles.noNotesText}>
                            Sadly there aren't any notes
                        </Text>
                        <Text style={styles.subText}>
                            you can add notes from 'Add Notes'
                        </Text>
                    </View>
                ) : (
                    <FlatList 
                        contentContainerStyle={styles.noteContainer}
                        showsVerticalScrollIndicator={false}
                        data={notes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onLongPress={() => confirmDelete(item.id)}
                                style={styles.noteCard}
                            >
                                <Text style={styles.noteText}>{item.notes}</Text>
                                <Text style={styles.createdAt}>created at: {item.createdAt}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )
            }
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    btnContainer: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 7,
        padding: 10,
        marginTop: 20,
    },
    btnText: {
        fontSize: 16,
        fontWeight: '600',
    },
    noNotesText: {
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center',
    },
    subText: {
        marginTop: 5,
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'center',
    },
    noteContainer: {
        width: '100%',
        marginTop: 40,
    },
    noteCard: {
        width: '80%',
        marginHorizontal: 30,
        marginVertical: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 7,
        padding: 10,
    },
    noteText: {
        fontWeight: '500',
        fontSize: 14,
    },
    createdAt: {
        fontWeight: '700',
        fontSize: 15,
    },
});