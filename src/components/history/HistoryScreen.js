import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import History from './Section/History';

const HistoryScreen = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const history = useSelector(state => state.user.userData && state.user.userData.history);

    const renderHistory = history && history.slice(0).reverse().map((history, index) => {
        return (
            <History history={history} key={index}/>
        )
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign  name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>주문내역</Text>
                <View style={{ flex: 1 }}/>
            </View>
            <View style={styles.historyContainer}>
                <ScrollView style={styles.scroll}>
                    {history ? renderHistory : null}
                </ScrollView>
            </View>
        </View>
    )
}

export default HistoryScreen

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
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
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
    historyContainer: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    
})
