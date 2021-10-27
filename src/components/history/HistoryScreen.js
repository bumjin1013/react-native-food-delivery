import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getHistory } from '../../_actions/user_actions';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { AntDesign } from '@expo/vector-icons';

const HistoryScreen = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const history = useSelector(state => state.user.userData && state.user.userData.history);
    const panelRef = useRef(null);

    const renderHistory = history && history.slice(0).reverse().map((item, index) => {

        return (
            <View style={styles.history} key={index}>
                <View style={styles.historyHeader}>
                    <Text style={{ marginLeft: -5 }}>주문일시: {moment(item.orderTime).format('YY년MM월DD일 HH시mm분')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailHistory', { history: item })} style={styles.detailBtn}>
                        <Text style={{ fontSize: 12 }}>주문상세</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => panelRef.current.togglePanel()} style={styles.etcBtn}>
                        <Feather name="more-vertical" size={18} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.historyContents}>
                    <TouchableOpacity style={styles.storeName}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15}}>{item.storeName}</Text>
                        <AntDesign name="right" size={12} color="black" />
                    </TouchableOpacity>
                    <Text>{item.menu.length > 1 ? item.menu[0].name + '외 ' + (item.menu.length - 1) + '개' : item.menu[0].name}</Text>
                </View>
                {item.reviewAuth 
                    ? 
                    <TouchableOpacity style={styles.createReviewBtn}>
                        <Text style={{ fontSize: '15', color: 'white', }}>리뷰 작성하기</Text>
                    </TouchableOpacity>
                    :
                    null
                }
                
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
            <BottomSheet ref={ref => panelRef.current = ref} sliderMinHeight={0} isOpen={false}>
                <Text style={{paddingVertical: 20}}>
                    Some random content
                </Text>
            </BottomSheet>
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
        fontSize: 18,
        marginTop: 35
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
        height: 'auto',
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
        flex: 4,
        margin: 15,
        marginTop: 10
    },
    storeName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    createReviewBtn: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 15,
        marginRight: 15,
        marginLeft: 15,
        borderColor: '#66B2FF',
        backgroundColor: '#66B2FF'

    }
})
