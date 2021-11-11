import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';

const DetailStoreScreen = ({ navigation, route }) => {

    const [store, setStore] = useState('');

    useEffect(() => {
        axios.get(`http://192.168.0.9:5000/api/stores/stores_by_id?id=${route.params.storeId}`)
            .then(response => {
                if(response.data.success) {
                    setStore(response.data.store[0])
                }
            })
            .catch((err) => alert(err));
    }, [])

    console.log(store && store.title);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign  name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{store.title}</Text>
                <View style={{ flex: 1 }}/>
            </View>
            <View style={styles.detail}>
                <ScrollView style={styles.scroll}>
                  <View style={styles.storeHeader}>

                  </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default DetailStoreScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    backBtn: {
        flex: 1,
        marginTop: 30,
        padding: 15
    },
    headerText: {
        flex: 8,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 35,
        textAlign: 'center',
        marginLeft: -30
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    detail: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 5,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    storeHeader: {
        alignItems: 'center',
        backgroundColor: 'red',
        marginLeft: 15, 
        width: '90%',
        height: 200
    }
})
