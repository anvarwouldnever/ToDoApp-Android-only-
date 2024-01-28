import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from './assets/screens/auth';
import mainpage from './assets/screens/mainpage';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName=" ">
      <Stack.Screen name=" " component={mainpage} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}


