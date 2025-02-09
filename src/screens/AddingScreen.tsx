import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AddignScreen = () => {
    return (
        <View style={styles.outerContainer}>
            <Text>
                Here you can add your notes!
            </Text>
        </View>
    );
}

export default AddignScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});