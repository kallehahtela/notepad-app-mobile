import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    Keyboard, 
    TouchableOpacity,
    Alert 
} from 'react-native';

// Navigation & AsyncStorage
import { RootStackParamList } from '../navigation/StackNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Icons & Custom Components
import { SimpleLineIcons } from '@expo/vector-icons';
import SelfButton from '../components/SelfButton';
import NoteInput from '../components/NoteInput';

// Defining Types
type EditScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditScreen'>;
type EditNoteRouteProp = RouteProp<RootStackParamList, 'EditScreen'>;

// Defining the Note Structure
type Note = {
    id: string; // Unique identifier
    notes: string; // The text content of the note
    createdAt: string; // The timestamp when the note was last modified
};

const EditScreen = () => {
    // Allows us navigate
    const navigation = useNavigation<EditScreenNavigationProp>();
    // Retrieves the note ID from parameters
    const route = useRoute<EditNoteRouteProp>();
    // Holds the current note's text
    const [notes, setNotes] = useState('');

    // Fethcing the Note from AsyncStorage
    // useEffect() runs once when the screen loads
    useEffect(() => {
        const loadNote = async () => {
            try {
                // Loads notes from AsyncStorage
                const storedNotes = await AsyncStorage.getItem('notes');
                if (storedNotes) {
                    const notesArray: Note[] = JSON.parse(storedNotes);
                    // Finds the correct note using the id from the route parameters
                    const noteToEdit = notesArray.find(note => note.id === route.params.id);
                    if (noteToEdit) {
                        // Sets the note text to setNotes(noteToEdit.notes)
                        setNotes(noteToEdit.notes);
                    }
                }
            } catch (error) {
                // If there’s an error, shows an alert
                Alert.alert(
                    'Error!', 
                    'Failed to load note.'
                );
            }
        };

        loadNote();
    }, []);

    // Updating the Note
    const handleUpdateNote = async () => {
        try {
            // Retrieves all notes from AsyncStorage
            const storedNotes = await AsyncStorage.getItem('notes');
            if (storedNotes) {
                let notesArray: Note[] = JSON.parse(storedNotes);
                // Finds the note to edit using the ID
                const noteIndex = notesArray.findIndex(note => note.id === route.params.id);
                
                if (noteIndex !== -1) {
                    // Updates the note’s text and timestamp
                    notesArray[noteIndex].notes = notes;
                    notesArray[noteIndex].createdAt = new Date().toString();
                    // Saves the updated notes back to AsyncStorage
                    await AsyncStorage.setItem('notes', JSON.stringify(notesArray));
                }

                // Navigates back to HomeScreen with the updated note
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Tabs', params: { updatedNote: notesArray[noteIndex] } }],
                });
            }
        } catch (error) {
            Alert.alert('Error!', 'Could not update note.');
        }
    };

    // Deleting a Note
    const handleDeleteNote = async () => {
        // Shows a confirmation pop-up
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            [
                // If "Cancel" is pressed, it does nothing
                {
                    text: "Cancel",
                    style: "cancel"
                },
                // If "Delete" is pressed:
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            // Retrieves all notes from AsyncStorage.
                            const storedNotes = await AsyncStorage.getItem('notes');
                            if (storedNotes) {
                                let notesArray: Note[] = JSON.parse(storedNotes);
                                // Removes the selected note
                                const filteredNotes = notesArray.filter(note => 
                                    note.id !== route.params.id
                                );
                                // Saves the updated notes list
                                await AsyncStorage.setItem('notes', 
                                    JSON.stringify(filteredNotes)
                                );
                                // Navigates back to HomeScreen
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Tabs' }]
                                });
                            }
                        } catch (error) {
                            Alert.alert(
                                'Error!', 
                                'Could not delete note.'
                            );
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.outerContainer}>
                {/* Options button for handling delete */}
                <View style={styles.optionContainer}>
                    <TouchableOpacity 
                        style={styles.btnContainer}
                        onPress={handleDeleteNote}
                    >
                        <SimpleLineIcons 
                            name='trash'
                            size={20}
                            color={'red'}
                        />
                    </TouchableOpacity>
                </View>

                <NoteInput 
                    placeholder='Edit your note...'
                    placeHolderTextColor='#000'
                    multiline={true}
                    value={notes}
                    onChangeText={setNotes}                    
                />

                <SelfButton 
                    title='Save Changes'
                    onPress={handleUpdateNote}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default EditScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    optionContainer: {
        position: 'absolute',
        right: 20,
        top: 10,
    },
    btnContainer: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
