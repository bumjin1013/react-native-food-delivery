import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight} from 'react-native';
import axios from 'axios';
import { SimpleLineIcons } from '@expo/vector-icons';

function RegisterScreen() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const onChangeId = (id) => {
        setId(id);
    }
    const onChangePassword = (password) => {
        setPassword(password);
    }
    const onChangePasswordConfirm = (passwordConfirm) => {
        setPasswordConfirm(passwordConfirm)
    }
    const onPressConfirm = () => {
        if(password !== passwordConfirm){
            Alert.alert('비밀번호가 일치하지 않습니다.');
        }

        Alert.alert('비밀번호가 일치합니다.');
    }
  
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                    <View style={styles.login}>
                        <Text style={styles.loginText}>회원가입</Text>
                        <TextInput style={styles.id} placeholder="이메일" onChangeText={onChangeId}/>
                        <TextInput style={styles.password} placeholder="비밀번호" secureTextEntry='true' onChangeText={onChangePassword}/>
                        <TextInput style={styles.passwordConfirm} placeholder="비밀번호 확인" secureTextEntry='true' onChangeText={onChangePasswordConfirm}/>
                        <Button title="확인" onPress={onPressConfirm}/>
                    </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#99ccff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#99ccff',
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
    id: {
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
        fontSize: 18
    },
    button: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    signUpBtn: {
        marginTop: 5
    },
    loginBtn:{
        marginRight: 10,
        marginTop: 4
    },
    passwordConfirm: {
        borderColor: 'gray', 
        borderWidth: 1,
        width: '90%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
        fontSize: 18
    }

});

export default RegisterScreen
