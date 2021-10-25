import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getHistory } from '../../_actions/user_actions';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { grey } from 'chalk';

const HistoryScreen = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const history = useSelector(state => state.user.userData && state.user.userData.history);

    const renderHistory = history && history.slice(0).reverse().map((item, index) => {

        return (
            <View style={styles.history} key={index}>
                <View style={styles.historyHeader}>
                    <Text style={{ marginLeft: -10 }}>주문일시: {moment(item.orderTime).format('YY년MM월DD일 HH시mm분')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailHistory', { history: item})} style={styles.detailBtn}>
                        <Text style={{ fontSize: 12 }}>주문상세</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.etcBtn}>
                        <Feather name="more-vertical" size={18} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.historyContents}>
                    <Text>{item.storeName}</Text>
                    <Text>{item.menu.length > 1 ? item.menu[0].name + '외 ' + (item.menu.length - 1) + '개' : item.menu[0].name}</Text>
                </View>
                
            </View>
        )
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>주문내역</Text>
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
        justifyContent: 'center'
    },
    header: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 12
    },
    scroll: {
        
    },
    historyContainer: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 4,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    history: {
        width: '100%',
        height: 150,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        borderBottomWidth: 4,
    },
    historyHeader: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10
    },
    time:{

    },
    detailBtn: {
        width: '20%',
        height: 20,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -30
    },
    etcBtn: {
        marginRight: -10
    },
    historyContents: {
        flex: 4
    }
})
