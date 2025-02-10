import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import SelfButton from "../components/SelfButton";
import NoteInput from "../components/NoteInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, 'AddingScreen'>;
type NewNoteRouteProp = RouteProp<RootStackParamList, 'AddingScreen'>;

const AddignScreen = ({ route, navigation }: Props) => {
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
            await AsyncStorage.setItem('notes', JSON.stringify('notes'));
        } catch (error) {
            // notes saving error
        }
    };

    // arrow function for handling the AsyncStorage data implementation
    const handleAddNotes = async () => {
        if (!notes.trim()) {
            Alert.alert('You need to add text in the notes in order to add them!')
            return;
        }

        const newNote = {
            id: Date.now().toString(),
            notes,
            createdAt: new Date().toString(),
        };

        try {
            const previousNotes = await AsyncStorage.getItem('notes');
            const notes = previousNotes ?  JSON.parse(previousNotes) : [];
            notes.push(newNote);
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

export default AddignScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});