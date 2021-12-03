import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Modal} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import { AntDesign } from '@expo/vector-icons';
import { registerUser } from '../../_actions/user_actions';
import moment from 'moment';

const SecondRegisterScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState([false, '주소를 입력해주세요']);
    const [detailAddress, setDetailAddress] = useState('');

    const onPressRegister = () => {
        if(address[0] == true) {
            let body = {
                email: route.params.email,
                password: route.params.password,
                nickname: route.params.nickname,
                image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                address: {
                  address: address[1],
                  detail: detailAddress
                }
            }
            console.log(body);

            dispatch(registerUser(body))
                .then(response => {
                    if(response.payload.success){
                        Alert.alert('회원가입에 성공하였습니다.')
                        navigation.navigate('Login');
                    } else {
                        console.log(response.payload.err.errmsg);
                    }
                })
                .catch(response => {
                    console.log(response);
                })
        } else {
            Alert.alert('주소를 입력해주세요!');
        }
        
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                    <View style={styles.login}>
                        <Text style={styles.registerText}>회원가입</Text>
                        <View style={styles.addressView}>
                            <TextInput style={styles.addressTextInput} placeholder={address[1]} placeholderTextColor={address[0] ? 'black' : '#B0B0B0'} editable={false}/>
                            <TouchableOpacity style={styles.dupBtn} onPress={() => setModalVisible(true)}>
                                <Text style={styles.dupText}>검색</Text> 
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.textInput} placeholder='상세주소' onChangeText={(value) => setDetailAddress(value)}/>
                        <TouchableOpacity onPress={onPressRegister} style={styles.registerBtn}>
                            <Text style={styles.btnText}>회원가입</Text>
                        </TouchableOpacity>
                        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.closeBtn}>  
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <AntDesign name="close" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.postcodeView}>
                                        <Postcode
                                            style={{ width: '90%', height: '90%' }}
                                            jsOptions={{ animation: true, hideMapBtn: true }}
                                            onSelected={data => {
                                            setAddress([true, data.address]);
                                            setModalVisible(false);
                                            }}
                                        />
                                    </View>
                                    
                                </View>
                            </KeyboardAvoidingView>
                        </Modal>
                    </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SecondRegisterScreen

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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '92%',
        height: '80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeBtn: {
        justifyContent: 'flex-end'
    },
    postcodeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerText: {
        fontSize: 30,
        paddingBottom: 10,
    },
    addressTextInput:{
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
        borderWidth: 1,
        borderLeftWidth: 0
    },
    dupText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addressView: {
        flexDirection: 'row'
    },
    textInput: {
        marginTop: 0,
        borderColor: '#A0A0A0', 
        borderWidth: 1,
        width: '90%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 18
    },
    registerBtn: {
        backgroundColor: '#96e4fa',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderWidth: 0,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: '#C0C0C0',
        shadowOffset: { 
             width: 1, 
             height: 1, 
        }, 
        shadowOpacity: 1, 
        shadowRadius: 1,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
