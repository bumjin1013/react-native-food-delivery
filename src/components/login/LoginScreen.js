import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { loginUser } from '../../_actions/user_actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

function LoginScreen({ navigation, route }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const onChangeEmail = (email) => {
        setEmail(email);
    }
    const onChangePassword = (password) => {
        setPassword(password);
    }

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
    const onPressLogin = () => {
       
        let body = {
            email: email,
            password: password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    let user = {
                        email: email,
                        token: response.payload.token
                    }
                    storeData(user);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Landing' }]
                    })
                } else {
                    showMessage({
                        message: "로그인 정보가 일치하지 않습니다.",
                        type: "danger",
                        icon: "danger",
                        backgroundColor: '#96e4fa'
                      });
                }
            })
            .catch(err => {
                showMessage({
                    message: "로그인에 실패하였습니다.",
                    type: "danger",
                    icon: "danger",
                    backgroundColor: '#96e4fa'
                  });
            })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <FlashMessage position="top" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                    <View style={styles.login}>
                        <Text style={styles.loginText}>로그인</Text>
                        <TextInput style={styles.email} placeholder="아이디" onChangeText={onChangeEmail}/>
                        <TextInput style={styles.password} placeholder="비밀번호" secureTextEntry={true} onChangeText={onChangePassword}/>
                        <TouchableOpacity style={styles.loginBtn} onPress={onPressLogin}>
                            <Text style={styles.loginBtnText}>로그인</Text>
                        </TouchableOpacity>
                        <View style={styles.button}>
                            <Button title='회원가입' style={styles.signUpBtn} onPress={() => navigation.navigate('FirstRegister')}/>
                        </View>
                    </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#96e4fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login: {
        backgroundColor: 'white',
        width: '90%',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5
        
    },
    loginText: {
        fontSize: 38,
        paddingBottom: 10,
    },
    email: {
        borderColor: 'gray', 
        borderWidth: 1,
        width: '90%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
        fontSize: 18
    },
    password: {
        borderColor: 'gray', 
        borderWidth: 1,
        width: '90%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
        fontSize: 18,
        marginTop: 0
    },
    button: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: -10
    },
    signUpBtn: {
        marginTop: 5
    },
    loginBtn:{
        backgroundColor: '#2D7EF7',
        width: '90%',
        paddingTop: 13,
        paddingBottom: 13,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 3
    },
    loginBtnText: {
       fontSize: 18,
       color: 'white',
       
    }
});

export default LoginScreen
