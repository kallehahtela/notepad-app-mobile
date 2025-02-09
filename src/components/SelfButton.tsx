import React, { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface Props {
    title: string;
    onPress(): void;
};

const SelfButton: React.FC<Props> = ({ title, onPress }) => {
    return (
        <View style={styles.outerContainer}>
            <TouchableOpacity 
                style={styles.btnContainer}
                onPress={onPress}
            >
                <Text style={styles.btnText}>
                    {title}
                </Text>

                <Ionicons 
                    name="arrow-forward"
                    size={29}
                    color={'#fff'}
                />
            </TouchableOpacity>
        </View>
    );
}

export default SelfButton;

const styles = StyleSheet.create({
    outerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        width: '80%',
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f72525',
        borderRadius: 15,
        paddingHorizontal: 50,
        paddingVertical: 15,
    },
    btnText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 16,
    }
});