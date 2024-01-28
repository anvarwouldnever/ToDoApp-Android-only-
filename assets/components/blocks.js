import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Button, CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Block(props) {

    const [strikeout, setStrikeout] = React.useState(true); 

    useEffect(() => {
        const loadStrikeout = async () => {

                const savedStrikeout = await AsyncStorage.getItem(`strikeout_${props.id}`);
                if (savedStrikeout !== null) {
                    setStrikeout(JSON.parse(savedStrikeout));
                }

        };
        loadStrikeout();

    }, [props.id]);

    useEffect(() => {
        const saveStrikeout = async () => {

                await AsyncStorage.setItem(`strikeout_${props.id}`, JSON.stringify(strikeout));

        };
        saveStrikeout();

    }, [strikeout, props.id]);

    const toggleStrikeout = () => {
        setStrikeout((prevStrikeout) => !prevStrikeout);
    };
    
    return (
        <View style={styles.block}>
            <View style={styles.checkmarkview}>
                <TouchableHighlight style={styles.checkmarkbutton} onPress={() => toggleStrikeout()}>
                    <Text style={strikeout? {backgroundColor: 'white'} : {backgroundColor: 'rgb(223, 189, 67)'}}>{strikeout? '' : "✔️"}</Text>
                </TouchableHighlight>
            </View>
            <View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
            <View style={styles.timeandtext}>
            <View style={styles.time}>
                <Text style={{fontSize: 13, color: 'black', fontFamily: ''}}>{props.time}</Text>
            </View>
            <Text style={strikeout? styles.text : styles.text2}>{props.text}</Text>
            </View>
            </View>
            <View style={styles.deletebutton}>
                <TouchableHighlight onPress={props.remover}>
                    <Text style={{fontSize: 13, color: 'rgb(223, 189, 67)', fontFamily: '', marginBottom: 0, borderBottomWidth: 1, borderBottomColor: 'rgb(223, 189, 67)'}}>Delete</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    block: {
        borderColor: 'grey',
        borderWidth: 1,
        width: '100%',
        height: 72,
        borderRadius: 20,
        marginTop: 20,
        flexDirection: 'row',
        padding: 10,
    },
    checkmarkview: {
        height: '100%',
        width: '10%',
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center'
    },
    checkmarkbutton: {
        borderColor: 'rgb(223, 189, 67)',
        borderWidth: 1,
        width: 20,
        height: 20,
        borderRadius: 3
    },
    time: {
        position: 'relative',
        width: 'auto',
        height: 16,
        alignItems: 'baseline',
        borderColor: 'rgb(223, 189, 67)',
    },
    text: {
        height: 20,
        width: 'flex',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'flex-end',
        fontFamily: '',
        fontWeight: '300',
        fontSize: 15,
    },
    text2: {
        height: 20,
        width: 'flex',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'flex-end',
        fontFamily: '',
        fontWeight: '300',
        fontSize: 15,
        textDecorationLine: 'line-through',
    },
    timeandtext: {
        height: '100%',
        justifyContent: 'space-between',
    },
    deletebutton: {
        width: 'auto',
        height: 17,
        marginLeft: 'auto',
        alignSelf: 'flex-end',
    },
})