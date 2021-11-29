import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const HeartScreen = ({ navigation }) => {

    const heart = useSelector(state => state.user.userData && state.user.userData.heart);

    const renderStore = heart&&heart.map((store) => {
        
        return (
            <View key={store.storeId}>

            </View>
        )
    })
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign  name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>찜</Text>
                <View style={{ flex: 1 }}/>
            </View>
            <View style={styles.heartContainer}>
                <ScrollView style={styles.scroll}>
                    
                </ScrollView>
            </View>
        </View>
    )
}

export default HeartScreen

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
        backgroundColor: 'white'
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
    heartContainer: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
})
