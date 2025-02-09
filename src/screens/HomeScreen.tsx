import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen = ({ route, navigation }: Props) => {
    return (
        <View style={styles.outerContainer}>
            <Text>
                Welcome around here!
            </Text>

            <TouchableOpacity 
                style={styles.btnContainer}
                onPress={() => navigation.navigate('AddingScreen')}
            >
                <Text style={styles.btnText}>
                    Navigate to add notes
                </Text>
            </TouchableOpacity>
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
    }
});