import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getCartItems } from '../../_actions/user_actions';
import Quantity from './Section/Quantity';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { removeCartItem } from '../../_actions/user_actions';

const CartScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartItems());
    }, [cart])

    const cart = useSelector(state => state.user.userData && state.user.userData.cart);
    const [checked, setChecked] = useState(0);
    let totalPrice = 0;
    const radio_props = [
        {label: '배달', value: 0 },
        {label: '포장', value: 1 }
    ];

      
    const rednerMenu = cart&&cart.map((item) => {

        totalPrice += item.price * item.quantity;

        const deleteMenu = () => {

            let body = {
                menuId: item.id
            }
            dispatch(removeCartItem(body))
                .then()
                .catch()
        }

        return (
            <View style={styles.menu} key={item.id}>
                <View style={styles.menuHeader}>
                    <Text style={styles.menuName}>{item.name}</Text>
                    <TouchableOpacity onPress={deleteMenu}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View> 
                <Text style={styles.menuPrice}>- 가격 : {item.price}원</Text>
                <Quantity quantity={item.quantity} price={item.price} menuId={item.id}/>
            </View>
        )
    })

    if(cart.length > 0){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>장바구니</Text>
                <View style={{ flex: 1 }}/>
            </View>
            <View style={styles.scroll}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.store}>
                        <View style={styles.storeName}>
                            <Text style={styles.storeNameText}>{cart != undefined ? cart[0].storeName : null}</Text>
                        </View>
                        <View style={styles.radioBtn}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonColor={'#96e4fa'}
                                buttonSize={10}
                                buttonOuterSize={25}
                                onPress={(value) => setChecked(value)}
                                labelStyle={{fontSize: 15}}
                                buttonWrapStyle={{marginTop: 30}}
                            />
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        {cart ? rednerMenu : null}
                    </View>
                    <TouchableOpacity style={styles.addMore} onPress={() => navigation.goBack()}>
                        <AntDesign name="plus" size={16} color="#96e4fa"/>
                        <Text style={styles.addMoreText}>더 담으러 가기</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.orderContainer}>
                <TouchableOpacity style={styles.orderBtn} onPress={() => navigation.navigate('Order', {totalPrice: totalPrice})}>
                    <Badge value={cart ? cart.length : null} status="primary" size="large" style={styles.badge}/>
                    <Text style={styles.orderText}>{totalPrice}원 주문하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>장바구니</Text>
                    <View style={{ flex: 1 }}/>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('./Section/empty.jpg')} style={styles.image} resizeMethod='contain'/>
                </View>
            </View>
        )
    }
 
}

export default CartScreen

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
    store: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        marginTop: 10,
        borderBottomColor: '#E0E0E0'
    },
    storeName: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    storeNameText: {
        fontSize: 23,
        fontWeight: 'bold',
        margin: 10
    },
    menuContainer: {
        marginTop: 10
    },
    menu: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1
    },
    menuName: {
        fontSize: 18,
    },
    menuPrice: {
        color: '#A0A0A0',
        marginTop: 10
    },
    menuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addMore: {
        width: '100%',
        borderColor: '#E0E0E0',
        borderBottomWidth: 1,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    addMoreText: {
        fontSize: 15,
        color: '#96e4fa',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#E0E0E0'
    },
    radioBtn: {
        margin: 15
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
        backgroundColor: '#96e4fa',
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    orderText: {
        fontSize: 18,
        color: 'white', 
        fontWeight: 'bold',
        marginLeft: 10
    },
    badge: {
        backgroundColor: 'blue',
    },
    imageContainer: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image: {
        width: 400,
        height: 400
    }
})
