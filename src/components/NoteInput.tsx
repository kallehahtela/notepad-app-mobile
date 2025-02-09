import React, { FC, useState } from "react";
import { View, TextInput, StyleSheet } from 'react-native';

interface Props {
    placeholder: string;
    placeHolderTextColor: string;
    multiline: boolean;
    numberOfLines: number;
};

const NoteInput: React.FC<Props> = ({ 
    placeholder, 
    placeHolderTextColor,
    multiline,
    numberOfLines,
 }) => {

    const [text, setText] = useState('');

    const onChangeText = () => {
        setText(text);
    };

    return (
        <View style={styles.outerContainer}>
            <TextInput 
                style={styles.inputContainer}
                placeholder={placeholder}
                placeholderTextColor={placeHolderTextColor}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onChangeText={newText => setText(newText)}
                defaultValue={text}
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