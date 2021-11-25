import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { io } from 'socket.io-client';

const Socket = ({ navigation }) => {
    const connect = () => {
        console.log('pressed');
        const socket = io(`http://192.168.0.9:5000`);
    }
    return (
        <View style={{backgroundColor: 'white', paddingTop: 100}}>
            <TouchableOpacity onPress={connect}>
                <Text>소켓연결</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Socket

const styles = StyleSheet.create({})
