import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "./StackNavigator";
import AddignScreen from "../screens/AddingScreen";

const Tab = createBottomTabNavigator<RootStackParamList>();

const MyTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="HomeScreen"
                component={HomeScreen}
            />
            <Tab.Screen 
                name="AddingScreen"
                component={AddignScreen}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;