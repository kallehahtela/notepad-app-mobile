import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen = ({ route, navigation }: Props) => {
    const [notes, setNotes] = useState(false);

    return (
        // View for entire space there is
        <View style={styles.outerContainer}>
            {
                !notes ? (
                    <View>
                        <Text style={styles.noNotesText}>
                            Sadly there aren't any notes
                        </Text>
                        <Text style={styles.subText}>
                            you can add notes from 'Add Notes'
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text>
                            Notes will display here
                        </Text>
                    </View>
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
    }
});