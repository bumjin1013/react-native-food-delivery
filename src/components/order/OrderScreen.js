import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import IMP from 'iamport-react-native';
import Loading from './Loading';

const OrderScreen = ({ navigation, route }) => {

    const user = useSelector(state => state.user.userData && state.user.userData);
    const [toOwner, setToOwner] = useState('');
    const [toRider, setToRider] = useState('조심히 안전하게 와주세요 :)');
    const [directInput, setDirectInput] = useState('');
    const [visible, setVisible] = useState(false);

    const hideMenu = () => {
        
        setVisible(false);
    }

    const showMenu = () => setVisible(true);

    const payment = () => {

        //10000000 ~ 99999999 까지의 난수 생성
        let ranNum = Math.floor(Math.random() * 99999999 + 10000000);
        //Date.now에 난수를 더하여 중복 방지
        let orderId = Date.now() + '-' + ranNum;

        let body = {
            userId: user._id,
            address: user.address.address + user.address.detail, 
            phoneNumber: '010-1234-5678',
            toOwner: toOwner,
            toRider: toRider,
            menu: user.cart,
            price: route.params.totalPrice,
            storeId: user.cart[0].storeId,
            storeName: user.cart[0].storeName,
            orderTime: Date(),
            orderId: orderId,
        }

        let data = {
            pg: 'html5_inicis',
            pay_method: 'card',
            name: '결제',
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: route.params.totalPrice + 2000,
            buyer_name: user.name,
            buyer_tel: '01012345678',
            buyer_email: user.email,
            buyer_addr: user.address.address + user.address.detail,
            buyer_postcode: user._id,
            app_scheme: 'example',
            // [Deprecated v1.0.3]: m_redirect_url
          };
        
        navigation.navigate('Payment', {data: data, body: body, userId: user._id})
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>주문하기</Text>
                    <View style={{ flex: 1 }}/>
                </View>
                <View style={styles.scroll}>
                    <ScrollView>
                    <View style={styles.subContainer}>  
                        <Text style={styles.title}>배달정보</Text>
                        <Text style={styles.subTitle}>주소</Text>
                        <Text style={styles.contents}>{user.address.address} {user.address.detail}</Text>
                        <View style={styles.divider}/>
                        <Text style={styles.subTitle}>연락처</Text>
                        <Text style={styles.contents}>010-1234-5678</Text>
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={styles.title}>요청사항</Text>
                        <Text style={styles.subTitle}>가게 사장님께</Text>          
                        <TextInput 
                            style={styles.textInput}
                            placeholder="예) 견과류 빼주세요, 덜 맵게 해주세요"
                            maxLength={40}/>
                        <Text style={styles.subTitle}>라이더님께</Text>
                        <View style={styles.modal}>
                            <Menu
                                visible={visible}
                                anchor={
                                    <TouchableOpacity onPress={showMenu} style={styles.selector}>
                                        <Text style={styles.selectorText}>{toRider}</Text>
                                        <AntDesign name="down" size={15} color="black" style={styles.selectorIcon}/>
                                    </TouchableOpacity>
                                }
                                onRequestClose={hideMenu}
                                style={styles.menu}
                            >
                                <MenuItem onPress={() => {setToRider('조심히 안전하게 와주세요 :)'); hideMenu()} }>조심히 안전하게 와주세요 :)</MenuItem>
                                <MenuItem onPress={() => {setToRider('문앞에 두고 벨 눌러주세요'); hideMenu()}}> 문앞에 두고 벨 눌러주세요</MenuItem>
                                <MenuItem onPress={() => {setToRider('벨 누르지 말고 노크해주세요'); hideMenu()}}>벨 누르지 말고 노크해주세요</MenuItem>
                                <MenuItem onPress={() => {setToRider('도착하기 전에 전화해주세요'); hideMenu()}}>도착하기 전에 전화해주세요</MenuItem>
                                <MenuItem onPress={() => {setToRider('요청사항 없음'); hideMenu()}}>요청사항 없음</MenuItem>
                                <MenuItem onPress={() => {setToRider('직접입력'); hideMenu()}}>직접입력</MenuItem>
                            </Menu>
                        </View>   
                    
                        {toRider == '직접입력' 
                            ? 
                            <TextInput 
                                style={styles.textInput}
                                maxLength={40}
                                placeholder="요청사항을 입력해주세요"
                                onChangeText={(value) => setDirectInput(value)}/> 
                            :
                            null
                        }        
                    </View>
                    <View style={styles.subContainer}>  
                        <Text style={styles.title}>결제금액</Text>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>주문금액</Text>
                            <Text style={styles.priceText}>{route.params.totalPrice}원</Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>배달팁</Text>
                            <Text style={styles.priceText}>2000원</Text>
                        </View>
                        <View style={styles.divider}/>
                        <View style={styles.price}>
                            <Text style={styles.totalPriceText}>총 결제금액</Text>
                            <Text style={styles.totalPriceText}>{route.params.totalPrice + 2000}원</Text>
                        </View>
                    </View>
                    </ScrollView>
                </View>
                <View style={styles.orderContainer}>
                    <TouchableOpacity style={styles.orderBtn} onPress={payment}>
                        <Text style={styles.orderText}>{route.params.totalPrice}원 결제하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        flex: 7.7,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 35,
        textAlign: 'center',
        marginLeft: -30
    },
    scroll: {
        flex: 8,
        width: '100%',
    },
    orderContainer: {
        flex: 1.3,
        backgroundColor: 'white',
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    orderBtn: {
        backgroundColor: '#99ccff',
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center'
    },
    orderText: {
        fontSize: 18,
        color: 'white', 
        fontWeight: 'bold'
    },
    subContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        marginTop: 10,
        borderBottomColor: '#E0E0E0',
        padding: 15
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15
    },
    contents: {
        fontSize: 20,
        marginTop: 5
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        marginTop: 10,
        marginBottom: 10
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 10
    },
    textInput: {
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        height: 35,
        marginBottom: 10,
        paddingLeft: 10
    },
    modal: {
        marginBottom: 10,
    },
    selector: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        height: 35,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5
    },
    menu: {
        width: '92%',
        marginTop: 35,
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceText: {
        fontSize: 16,
        marginBottom: 5
    },
    totalPriceText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
