import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Button } from 'react-native';
import firebase from 'firebase/app';
import '@firebase/auth';
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut 
} from '@firebase/auth';


export default function Auth({ navigation }) {

    function mainpage() {
        navigation.navigate('Main');
    }

    return (
      <View style={styles.container}>
        <View style={styles.childcon}>
          <TouchableHighlight style={styles.button}>
            <TextInput placeholder='username'></TextInput>
          </TouchableHighlight>
          <TouchableHighlight>
            <TextInput style={styles.button} placeholder='password' secureTextEntry={true}></TextInput>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.login} onPress={mainpage}>
          <Text>  Log In</Text>
        </TouchableHighlight>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'red',
      borderWidth: 2,
    },
    childcon: {
      width: 200,
      height: 100,
      borderColor: 'red',
      borderWidth: 2,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      borderColor: 'red',
      borderWidth: 2,
      width: 100,
      height: 20,
      borderRadius: 5,
      margin: 8
    },
    login: {
      borderColor: 'red',
      width: 60,
      height: 25,
      borderWidth: 2,
      marginTop: 15,
      borderRadius: 5
    }
  });
