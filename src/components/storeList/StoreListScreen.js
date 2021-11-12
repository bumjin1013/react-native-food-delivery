import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import TabScreen from './Section/TabScreen';


const StoreListScreen = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>상점</Text>
                <View style={{ flex: 1 }}/>
            </View>
            <View style={styles.tab}>
               <TabScreen />
            </View>
        </View>
    )
}

export default StoreListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    headerText: {
        flex: 8,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 35,
        textAlign: 'center',
        marginLeft: -30,
    
    },
    backBtn: {
        flex: 1,
        marginTop: 30,
        padding: 15
    },
    tab: {
        flex: 9,
        backgroundColor: 'black',
        width: '100%'
    },
    storeContainer: {
        flex: 8.3
    }
})
