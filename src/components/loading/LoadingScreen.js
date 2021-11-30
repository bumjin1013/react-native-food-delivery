import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginUserToken } from '../../_actions/user_actions';

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        getData();
    }, [])

    const dispatch = useDispatch();

    const storeData = async (user) => {
        try {
            let jsonUser = JSON.stringify(user);
            await AsyncStorage.setItem(
                '@jsonUser', jsonUser
            );
        } catch (error) {
          // Error saving data
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@jsonUser');
            let body = JSON.parse(jsonValue);
            console.log(body);
            if(jsonValue != null){
                dispatch(loginUserToken(body))
                    .then(response =>{
                        if(response.payload.loginSuccess == true) {
                            console.log(response.payload);
                            let user = {
                                email: JSON.parse(jsonValue).email,
                                token: response.payload.token
                            }
                            storeData(user);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Landing' }]
                            })
                            
                        } else {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }]
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Landing' }]
                })
            }
        } catch(e) {
            // error reading value
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>오늘 뭐먹지?</Text>
            <Image source={require('./image/LoadingImage.jpeg')} style={styles.image}/>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#96e4fa',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 50,
        color: 'white',
        marginBottom: 50
    },
    image: {
        width: '100%',
        height: '30%'
    }
})
