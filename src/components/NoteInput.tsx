import React, { FC, useState } from "react";
import { View, TextInput, StyleSheet } from 'react-native';

interface Props {
    placeholder: string;
    placeHolderTextColor: string;
    multiline: boolean;
    value: string;
    onChangeText: (text: string) => void;
};

const NoteInput: React.FC<Props> = ({ 
    placeholder, 
    placeHolderTextColor,
    multiline,
    value,
    onChangeText,
 }) => {

    return (
        <View style={styles.outerContainer}>
            <TextInput 
                style={styles.inputContainer}
                placeholder={placeholder}
                placeholderTextColor={placeHolderTextColor}
                multiline={multiline}
                value={value}
                onChangeText={(text) => onChangeText(text)}
            />
        </View>
    );
}

export default NoteInput;

const styles = StyleSheet.create({
    outerContainer: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        height: '100%',
        marginBottom: 50,
        marginHorizontal: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});