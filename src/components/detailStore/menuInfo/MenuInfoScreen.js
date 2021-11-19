import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Divider from '../../utils/Divider';
import { AntDesign } from '@expo/vector-icons';
import { addToCart } from '../../../_actions/user_actions';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MenuInfoScreen = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const [menu, setMenu] = useState(route.params.menu);
    const storeId = route.params.storeId;
    const storeName = route.params.title;
    const [quantity, setQuantity] = useState(1);

    const plusBtn = () => {
        setQuantity(quantity + 1);
    }

    const minusBtn = () => {
        
        setQuantity(quantity - 1);
    }

    const addCart = () => {

        let body = {
            menuId: menu._id,
            name: menu.name,
            price: menu.price,
            image: menu.image,
            storeId: storeId,
            storeName: storeName
        }

        dispatch(addToCart(body));

        showMessage({
            message: "장바구니에 추가하였습니다.",
            type: "info",
            icon: "success",
            backgroundColor: '#99ccff'
          });
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.scroll}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Image style={styles.image} source={{uri: `http://192.168.0.9:5000/${menu.image[0]}`}}/>
                <View style={styles.menuBox}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{menu.name}</Text>
                </View>
                <View style={styles.chooseBox}>
                    <View style={styles.price}>
                        <Text style={styles.priceText}>가격</Text>
                        <View style={styles.namePrice}>
                            <Text style={styles.text}>{menu.name}</Text>
                            <Text style={styles.text}>{menu.price}원</Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.quantity}>
                        <Text style={styles.priceText}>수량</Text>
                        <View style={styles.setQuantity}>
                        <TouchableOpacity onPress={minusBtn} disabled = { quantity == 1 ? true : false }>
                            <AntDesign name="minus" size={18} color={ quantity == 1 ? '#E0E0E0' : 'black' } />
                        </TouchableOpacity>
                        <Text>{quantity} 개</Text>
                        <TouchableOpacity onPress={plusBtn} disabled = { quantity == 10 ? true : false }>
                            <AntDesign name="plus" size={18} color="black" color={ quantity !== 10 ? 'black' : '#E0E0E0' }/>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            </View>
            
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.addCart} onPress={addCart}>
                    <Text style={styles.cartText}>장바구니 담기</Text>
                </TouchableOpacity>
            </View>
            <FlashMessage position="top" />
        </View>
    )
}

export default MenuInfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll:{
        flex: 8.7,
        backgroundColor: 'white'
    },
    scrollView: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image: {
        width: windowWidth,
        height: windowHeight / 2.5,
    },
    bottom: {
        flex: 1.3,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuBox: {
        width: '90%',
        height: windowHeight / 9,
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        top: windowHeight / 2.5 - 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addCart: {
        marginBottom: 15,
        borderWidth: 0,
        width: '90%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#99ccff'
    },
    cartText: {
        fontSize: 15,
        color: 'white', 
        fontWeight: 'bold'
    },
    chooseBox: {
        position: 'absolute',
        top: windowHeight / 3 + 130,
        width: '100%'
    },
    price: {
        width: '100%'
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    quantity: {
        marginTop: 35,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    namePrice: {
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'row',
        margin: 15
    },
    text: {
        fontSize: 15
    },
    setQuantity: {
        width: '30%',
        height: 35,
        marginRight: 15,
        alignItems: 'center', 
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#B0B0B0'
        
    }
    
})
