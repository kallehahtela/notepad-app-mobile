import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddignScreen from '../screens/AddingScreen';
import MyTabs from './TabNavigator';
import EditScreen from '../screens/EditScreen';

export type RootStackParamList = {
    Tabs: undefined;
    HomeScreen: undefined;
    AddingScreen: undefined;
    EditScreen: { id: string };
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
            {/* EditScreen Stack Navigation */}
            <Stack.Screen 
                name='EditScreen'
                component={EditScreen}
                options={{
                    title: 'Edit a Note'
                }}
            />
        </Stack.Navigator>
    );
}

export default RootStack;