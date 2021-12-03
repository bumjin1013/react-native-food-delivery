import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import axios from 'axios';

function FirstRegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    
    const checkEmailForm = () => {
        let regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

        if(regExp.test(email)) {                            
            return true;         
        }                            
        else {                       
            return false;         
        }                            
    }
    
    const checkDuplicate = () => {
        //이메일 유효성 검사 체크 후 유효한 이메일 이면 중복검사
        if(checkEmailForm()){
            let body = {
                email: email
            }
            axios.get('http://192.168.0.8:5000/api/users/duplicate', body)
                .then(response => {
                    if(response.data.success && response.data.result.length == 0){
                        Alert.alert(
                            "사용가능한 이메일입니다","이메일을 사용하시겠습니까?",
                            [
                                { text: "취소", style: "cancel"},
                                { text: "확인", onPress: () => setCheckEmail(true) }
                            ])
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            Alert.alert('유효한 이메일을 입력해주세요.');
        }
        
    }

    const changeEmail = () => {
        setCheckEmail(false);
    } 

    const onPressNext = () => {
        if(!checkEmail){
            Alert.alert('이메일을 다시 확인해주세요.');
        }
        else if(password != passwordConfirm){
            Alert.alert('비밀번호가 일치하지 않습니다.');
        } else if(checkEmail && (password == passwordConfirm) && (nickname.length > 0) && (phone.length > 0)){
            navigation.navigate('SecondRegister', {email: email, password: password, nickname: nickname, phone: phone})
        } else {
            Alert.alert('모든 정보를 입력해주세요.');
        }
    }
  
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                    <View style={styles.login}>
                        <Text style={styles.registerText}>회원가입</Text>
                        <View style={styles.emailContainer}>
                            <TextInput style={styles.EmailTextInput} placeholder="이메일" keyboardType="email-address" onChangeText={(value) => {setEmail(value)}} editable={!checkEmail}/>
                                {!checkEmail 
                                    ? 
                                    <TouchableOpacity style={styles.dupBtn} onPress={checkDuplicate}>
                                        <Text style={styles.dupText}>중복확인</Text> 
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.dupBtn} onPress={changeEmail}>
                                        <Text style={styles.dupText}>수정</Text> 
                                    </TouchableOpacity>
                                }
                        </View>
                        <TextInput style={styles.textInput} placeholder="비밀번호" secureTextEntry={true} onChangeText={(value) => {setPassword(value)}} />
                        <TextInput style={styles.textInput} placeholder="비밀번호 확인" secureTextEntry={true} onChangeText={(value) => {setPasswordConfirm(value)}}/>
                        <TextInput style={styles.textInput} placeholder="닉네임" onChangeText={(value) => {setNickname(value)}}/>
                        <TextInput style={styles.textInput} placeholder="전화번호" keyboardType="phone-pad" onChangeText={(value) => {setPhone(value)}}/>
                        <Button title="다음" onPress={onPressNext}/>
                    </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default FirstRegisterScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#96e4fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    registerText: {
        fontSize: 30,
        paddingBottom: 10,
    },
    textInput: {
        borderColor: '#A0A0A0', 
        borderWidth: 1,
        width: '90%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 18
    },
    EmailTextInput:{
        borderColor: '#A0A0A0', 
        borderWidth: 1,
        width: '70%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginVertical: 10,
        fontSize: 18
    },
    dupBtn: {
        borderColor: '#A0A0A0', 
        width: '20%',
        paddingHorizontal: 20,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#96e4fa',
    },
    dupText: {
        color: 'white',
        fontWeight: 'bold'
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
    emailContainer: {
        flexDirection: 'row'
    }
});
