import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "./StackNavigator";
import AddignScreen from "../screens/AddingScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<RootStackParamList>();

const MyTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: (tabInfo) => {
                        return (
                            <Ionicons 
                                name="home-outline"
                                size={26}
                                color={tabInfo.focused ? '#f72525' : '#000000'}
                            />
                        )
                    },
                    title: 'Home',
                    tabBarActiveTintColor: '#f72525',
                    tabBarInactiveTintColor: '#000000',
                }}
            />
            <Tab.Screen 
                name="AddingScreen"
                component={AddignScreen}
                options={{
                    tabBarIcon: (tabInfo) => {
                        return (
                            <Ionicons 
                                name="add-circle-outline"
                                size={26}
                                color={tabInfo.focused ? '#f72525' : '#000000'}
                            />
                        )
                    },
                    title: 'Add Notes',
                    tabBarActiveTintColor: '#f72525',
                    tabBarInactiveTintColor: '#000000',
                }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;