import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Dates(props) {
    <View>
        <View style={styles.datenumbersborder}>
                    <Text style={styles.datenumbers}>{props.date}</Text>
                    <Text>{props.day}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    datenumbersborder: {
        width: 30,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        marginRight: 'auto',
        marginLeft: 'auto'
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
}) 