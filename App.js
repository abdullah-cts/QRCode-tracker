import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; 
import BorrowScreen from './screens/BorrowScreen';
import ReturnScreen from './screens/ReturnScreen';
import WhereToReturnScreen from './screens/WhereToReturnScreen';
import ErrorScreen from './screens/ErrorScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Borrow" component={BorrowScreen} />
        <Stack.Screen name="Return" component={ReturnScreen} />
        <Stack.Screen name="WhereToReturn" component={WhereToReturnScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
