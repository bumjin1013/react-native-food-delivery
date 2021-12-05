import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Modal, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Category from './Section/Category/Category';
import Postcode from '@actbase/react-daum-postcode';
import { updateAddress } from '../../_actions/user_actions';
function LandingScreen({ navigation }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData && state.user.userData);
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState([false, '주소를 입력해주세요']);
    const [detailAddress, setDetailAddress] = useState('');

    const changeAddress = () => {
        if(address[0]){
            setModalVisible(false);
            setAddress([false, '주소를 입력해주세요'])
            let body = {
                address: address[1],
                detail: detailAddress
            }
            dispatch(updateAddress(body))
                .then(response => {
                    if(response.payload.success){
                        
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            Alert.alert('상세주소를 입력해주세요.');
        }
    }

    if(user.isAuth){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <View style={styles.header} >
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection: 'row', marginTop: 35,}}>
                        <Text style={styles.address}> {user.address.address} </Text>
                        <AntDesign name="down" size={16} color="black" />
                    </TouchableOpacity>
                </View>
                <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.button}>  
                                <TouchableOpacity onPress={() => { setModalVisible(false), setAddress([false, '주소를 입력해주세요'])}}>
                                    <AntDesign name="close" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={changeAddress}>
                                    <AntDesign name="check" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.textInputContainer}>
                                <TextInput style={styles.addressTextInput} placeholder={address[1]} placeholderTextColor={address[0] ? 'black' : '#B0B0B0'} editable={false} />
                                <TextInput style={styles.addressTextInput} placeholder="상세주소를 입력해주세요" placeholderTextColor='#B0B0B0' onChangeText={(value) => setDetailAddress(value)}/>
                            </View>
                            {!address[0] ?
                            <View style={styles.postcodeView}>
                                <Postcode
                                    style={{ width: '90%', height: '70%' }}
                                    jsOptions={{ animation: true, hideMapBtn: true }}
                                    onSelected={data => {
                                    setAddress([true, data.address]);
                                    }}
                                />
                            </View>     
                            :
                            null} 
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
                <View style={styles.tab}>
                    <TouchableOpacity>
                        <Text style={styles.tabBtn}>배달</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.tabBtn}>포장</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.banner}>
                    <Text> 배너 </Text>
                </View>
                <View style={styles.category}>
                    <ScrollView>
                        <Category />
                    </ScrollView>
                </View>

                <View style={styles.bottomTab}>
                    <TouchableOpacity>
                        <AntDesign name="search1" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('History')}>
                        <AntDesign name="bars" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
                        <AntDesign name="user" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            null
        )
    }
}

export default LandingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    address: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    tab: {
        flex: 0.7,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    banner: {
        flex: 1.6,
        width: '100%',
        backgroundColor: 'gray'
    },
    category: {
        flex: 5.7,
        backgroundColor: 'white'
    },
    bottomTab: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        paddingBottom: 10,
    },
    tabBtn: {
        borderWidth: 1,
        borderRadius: 15,
        width: '100%',
        borderColor: '#C0C0C0',
        padding: 13,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '92%',
        height: 'auto',
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
    button: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    postcodeView: {
        alignItems: 'center',
        marginTop: 30
    },
    addressTextInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        width: '100%',
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        padding: 10
    },
    textInputContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
