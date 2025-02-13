import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";

// Navigation & AsyncStorage
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";

// Custom Components
import SelfButton from "../components/SelfButton";
import NoteInput from "../components/NoteInput";

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'AddingScreen'>;

const AddingScreen = ({ route, navigation }: ScreenProps) => {
    const [notes, setNotes] = useState('');

    const saveNotesData = async (notes: string) => {
        try {
            const previousNotes = await AsyncStorage.getItem('notes');
            const notes = previousNotes ? JSON.parse(previousNotes) : [];

            const newNote = {
                id: Date.now(),
                notes,
                createdAt: new Date().toString(),
            };

            notes.push(newNote);
            await AsyncStorage.setItem('notes', JSON.stringify(notes));
        } catch (error) {
            Alert.alert(
                'Saving Error',
                'issues occured during the data saving'
            );
        }
    };

    // Function to Handle 'Add Note' Button Press
    const handleAddNotes = async () => {
        // Check if the user entered text
        if (!notes.trim()) {
            Alert.alert('You need to add text in the notes in order to add them!')
            return;
        }

        // Create a New Note Object
        const newNote = {
            // Generates a unique ID
            id: Date.now().toString(),
            // Stores the user's note and timestamp
            notes,
            createdAt: new Date().toString(),
        };

        // Retrieve Previous Notes & Save
        try {
            // Get stored notes from AsyncStorage.
            const previousNotes = await AsyncStorage.getItem('notes');
            const notes = previousNotes ?  JSON.parse(previousNotes) : [];
            // Add the new note to the array.
            notes.push(newNote);
            // Save it back to AsyncStorage.
            await AsyncStorage.setItem('notes', JSON.stringify(notes));

            navigation.navigate('HomeScreen', { newNote });
        } catch (error) {
            // error saving note
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
        >
            <View style={styles.outerContainer}>
                {/* Custom TextInput with props */}
                <NoteInput 
                    placeholder="Enter your desired notes here..."
                    placeHolderTextColor="#000"
                    multiline={true}
                    value={notes}
                    onChangeText={setNotes}
                />

                {/* Custom button with types */}
                <SelfButton 
                    title="Add a Note"
                    onPress={handleAddNotes}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default AddingScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});