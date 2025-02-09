import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddignScreen from '../screens/AddingScreen';
import MyTabs from './TabNavigator';

export type RootStackParamList = {
    Tabs: undefined;
    HomeScreen: undefined;
    AddingScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName='Tabs'
        >
            {/*  */}
            <Stack.Screen 
                name='Tabs'
                component={MyTabs}
                options={{
                    headerShown: false
                }}
            />

            {/* HomeScreen Stack Navigation */}
            <Stack.Screen 
                name='HomeScreen' 
                component={HomeScreen}
                options={{
                    title: 'Home'
                }}
            />
            
            {/* AddingScreen Stack Navigation */}
            <Stack.Screen 
                name='AddingScreen'
                component={AddignScreen}
                options={{
                    title: 'Add a Note'
                }}
            />
        </Stack.Navigator>
    );
}

export default RootStack;