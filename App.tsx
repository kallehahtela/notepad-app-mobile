import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <RootStack />
    </NavigationContainer>
  );
}