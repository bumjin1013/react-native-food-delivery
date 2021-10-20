import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { loginUser } from '../../_actions/user_actions';

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
    const onPressLogin = () => {
       
        let body = {
            email: email,
            password: password
        }

        dispatch(loginUser(body))
          
    }
    
    const onPressSignUp = () => {
        navigation.navigate('Register');
    }

    
        

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                    <View style={styles.login}>
                        <Text style={styles.loginText}>로그인</Text>
                        <TextInput style={styles.email} placeholder="아이디" onChangeText={onChangeEmail}/>
                        <TextInput style={styles.password} placeholder="비밀번호" secureTextEntry={true} onChangeText={onChangePassword}/>
                        <View style={styles.button}>
                            <Button title='회원가입' style={styles.signUpBtn} onPress={onPressSignUp}/>
                            <TouchableHighlight activeOpacity={0.5} underlayColor="#DDDDDD" onPress={onPressLogin}>
                                <SimpleLineIcons name="login" size={'28'} color="black" style={styles.loginBtn}/>
                            </TouchableHighlight>
                        </View>
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
    }

});

export default LoginScreen
