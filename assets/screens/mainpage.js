import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableHighlight, TextInput, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Block from "../components/blocks";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';

export default function Main() {
    const [day, setDay] = React.useState();
    const days = (["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]);
    const [date, setDate] = React.useState();
    const [task, setTask] = React.useState();
    const [blocks, setBlocks] = React.useState([]);

    console.log(day)

    const addBlock = () => {
        Keyboard.dismiss();
        const getdate = new Date();
        const hours = getdate.getUTCHours();
        const minutes = getdate.getUTCMinutes();
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const currenttime = (`${formattedHours}:${formattedMinutes}`);
        const newBlock = {task, currenttime, id: Date.now()};
        setBlocks([...blocks, newBlock]);
        setTask(null);
    };

    const removeBlock = (index) => {
        const array = [...blocks];
        array.splice(index, 1)
        setBlocks(array)
    }

    useEffect(() => {

        const loadBlocks = async () => {
            try {
                const savedBlocks = await AsyncStorage.getItem('blocks');
                if (savedBlocks) {
                    setBlocks(JSON.parse(savedBlocks));
                }
            } catch (error) {
                console.log('error')
            }
        };

        const getdate = new Date();
        const currentdate = getdate.getDate();
        const currentday = getdate.getDay();
        setDate(currentdate);
        setDay(currentday - 1);
        

        loadBlocks();
    }, [])

    useEffect(() => {
        const saveBlocks = async () => {
            try {
                await AsyncStorage.setItem('blocks', JSON.stringify(blocks));
            } catch (error) {
                console.log('error')
            }
        };

        saveBlocks();
    }, [blocks]);

    return (
        <View style={styles.main}>
        <ScrollView>
            <View style={styles.datesanddayslist}>
                <View style={styles.datenumbersborder}>
                    <Text style={styles.datenumbers}>{date - 3}</Text>
                    <Text>{day - 3 < 0 ? days[day - 3 + 7] : days[day - 3]}</Text>
                </View>
                <View style={styles.datenumbersborder}>
                    <Text style={styles.datenumbers}>{date - 2}</Text>
                    <Text>{day - 2 <= 0 ? days[day - 2 + 7] : days[day - 2]}</Text>
                </View>
                <View style={styles.datenumbersborder}>
                    <Text style={styles.datenumbers}>{date - 1}</Text>
                    <Text>{day - 1 <= 0 ? days[day - 1 + 7] : days[day - 1]}</Text>
                </View>
                <View style={styles.datenumbersborder}>
                    <Text style={styles.datenumbers2}>{date}</Text>
                    <Text style={{color: 'rgb(223, 189, 67)'}}>{day <= 0 ? days[6] : days[day]}</Text>
                </View>
                <View style={styles.datenumbersborder}>
                    <Text style={styles.datenumbers}>{date + 1}</Text>
                    <Text>{days[(day + 1) % 7]}</Text>
                </View>
                <View style={styles.datenumbersborder}>
                    <Text style={styles.datenumbers}>{date + 2}</Text>
                    <Text>{days[(day + 2) % 7]}</Text>
                </View>
                <View style={styles.datenumbersborder}>
                    <Text style={styles.datenumbers}>{date + 3}</Text>
                    <Text>{days[(day + 3) % 7]}</Text>
                </View>
            </View>
            <View style={styles.todaystasks}>
                <Text style={styles.todaystaskstext}>Today's tasks</Text>
            </View>
            <View style={styles.blocks}>
                {
                    blocks.map((item, index) => {
                        return <Block key={index} id={item.id} text={item.task} remover={() => removeBlock(index)} time={item.currenttime}/>
                    })
                }
            </View>
        </ScrollView>
            <KeyboardAvoidingView style={styles.plusbuttonview} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TextInput style={styles.taskinput} placeholder="Write a task" value={task} onChangeText={input => setTask(input)}/>
                <TouchableHighlight style={styles.plusbutton} onPress={addBlock}>
                    <Text>+</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    blocks: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        flex: 1,
        position: 'relative',
        padding: 15,
        marginBottom: 'auto',
    },
    plusbutton: {
        width: 50,
        height: 50,
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 30
    },
    datenumbers: {
        color: 'white',
        backgroundColor: 'black',
        width: 25,
        height: 25,
        borderRadius: 100,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    datenumbers2: {
        color: 'white',
        backgroundColor: 'rgb(223, 189, 67)',
        width: 40,
        height: 40,
        borderRadius: 100,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 5,
        marginTop: -7
    },
    datenumbersborder: {
        width: 30,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    datesanddayslist: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'relative',
    },
    plusbuttonview: {
        width: '100%',
        position: 'relative',
        bottom: 0,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        left: 0,
        right: 0,
    },
    todaystasks: {
        position: 'relative',
        width: 131,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todaystaskstext: {
        fontFamily: '',
        fontSize: 20,
        fontWeight: 'bold',
    },
    taskinput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 30,
        width: 200,
        textAlign: 'center'
    }
})