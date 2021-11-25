import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { changeQuantity } from '../../../_actions/user_actions';

const Quantity = (props) => {

    const [quantity, setQuantity] = useState(props.quantity);
    const dispatch = useDispatch();
    const plusBtn = () => {
        
        setQuantity(quantity + 1);
        let body = {
            quantity: true,
            menuId: props.menuId
        }

        dispatch(changeQuantity(body))
        .then(response=>{
            
          })  
          .catch(err=>{
            console.log(err)
          });
    }

    const minusBtn = () => {

        setQuantity(quantity - 1);
        let body = {
            quantity: false,
            menuId: props.menuId
        }

        dispatch(changeQuantity(body))
        .then(response=>{
            
          })  
          .catch(err=>{
            console.log(err)
          });
    }

    return (
        <View style={styles.quantity}>
            <Text style={styles.priceText}>{props.price * quantity}원</Text>
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
    )
}

export default Quantity

const styles = StyleSheet.create({
    priceText: {
        fontSize: 18,
    },
    quantity: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: 15
    },
    setQuantity: {
        width: '30%',
        height: 35,
        alignItems: 'center', 
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#B0B0B0'
    }
})
