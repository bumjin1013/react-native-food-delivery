import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Divider from '../../utils/Divider';


const DetailHistoryScreen = ({ navigation, route }) => {

    const [history, setHistory] = useState(route.params.history && route.params.history)

    const renderMenu = history.menu && history.menu.map((menu, index) => {
        return (
            <View style={styles.menu} key={index}>
                <Text>{menu.name + ' ' + menu.quantity + '개'}</Text>
                <Text>{menu.price  * menu.quantity + '원'}</Text>
            </View>
        )
    })

    const renderDetail = () => {
        return (
            <View>
                <View style={styles.top}>
                    <View style={styles.topContents}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>{history.storeName}</Text>
                        <Text>{history.menu.length > 1 ? history.menu[0].name + '외 ' + (history.menu.length - 1) + '개' : history.menu[0].name + ' 1개'}</Text>
                        <Text style={{ marginTop: 5 }}>주문일시 : {moment(history.orderTime).format('YYYY년MM월DD일 HH시mm분')}</Text>
                        <Text style={{ marginTop: 5 }}>주문번호 : {history.orderId}</Text>

                    </View>
                    <View style={styles.topBtn}>
                        <TouchableOpacity style={styles.chat}>
                            <Ionicons style={{ marginRight: 5 }} name="chatbubble-ellipses-outline" size={20} color="black" />
                            <Text>채팅상담</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.store}>
                            <MaterialCommunityIcons style={{ marginRight: 5 }} name="storefront-outline" size={20} color="black" />
                            <Text>가게보기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.middle}>
                    {renderMenu}
                    <Divider/>
                    <View style={styles.totalPrice}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18}}>총 결제금액</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18}}>{history.price}원</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottomContents}>
                        <Text style={{ fontSize: 15 }}>배달주소</Text>
                        <Text style={styles.bottomText}>{history.address}ㅁㄴㅇ</Text>
                    </View>
                    <Divider/>
                    <View style={styles.bottomContents}>
                        <Text style={{ fontSize: 15 }}>전화번호</Text>
                        <Text style={styles.bottomText}>{history.phoneNumber}dfdf</Text>
                    </View>
                    <Divider/>
                    <View style={styles.bottomContents}>
                        <Text style={{ fontSize: 15 }}>가게 사장님께</Text>
                        <Text style={styles.bottomText}>{history.toOwner}dfdf</Text>
                    </View>
                    <Divider/>
                    <View style={styles.bottomContents}>
                        <Text style={{ fontSize: 15 }}>라이더님께</Text>
                        <Text style={styles.bottomText}>{history.toRider}dfdf</Text>
                    </View>
                    <TouchableOpacity style={styles.deleteBtn}>
                        <Text style={{ color: 'red', fontSize: 17}}>주문내역 삭제</Text>
                    </TouchableOpacity>
                </View>          
            </View>
            
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>주문상세</Text>
            </View>
            <View style={styles.detailContainer}>
                <ScrollView style={styles.scroll}>
                    <Text>{renderDetail()}</Text>
                </ScrollView>
                
            </View>
        </View>
    )
}

export default DetailHistoryScreen

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
    detailContainer: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 5,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'

    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    top: {
        marginRight: -20,
        paddingBottom: 13,
        borderBottomWidth: 5,
        borderBottomColor: '#E0E0E0'
    },
    middle: {
        marginRight: -20,
        borderBottomWidth: 5,
        borderBottomColor: '#E0E0E0'
    },
    bottom: {
        marginRight: -20,
    },
    topContents:{
        marginTop: 20,
        marginRight: 15,
        marginLeft: 15
    },
    topBtn:{
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        width: '100%',
    },
    chat:{
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#C0C0C0',
        width: '44%',
        marginRight: 5,
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },
    store:{
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#C0C0C0',
        width: '44%',
        marginLeft: 5,
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8 
    },
    menu:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 15,
        marginLeft: 15,
        paddingTop: 15
    },
    divier: {
        borderBottomColor: '#C0C0C0',
        borderBottomWidth: 1,
        width: '92%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        paddingTop: 10,
        paddingTop: 15
    },
    totalPrice: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    bottomContents: {
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
    },
    bottomText: {
        marginTop: 5,

    },
    deleteBtn: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 15,
        marginBottom: 15,
        marginRight: 15,
        marginLeft: 15,
        borderColor: '#A0A0A0',
       

    }
})
