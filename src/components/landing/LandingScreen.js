import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Modal, KeyboardAvoidingView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Category from './Section/Category/Category';
import Recommand from './Section/Recommand/Recommand';
import Postcode from '@actbase/react-daum-postcode';

function LandingScreen({ navigation }) {

    const user = useSelector(state => state.user.userData && state.user.userData);
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState([false, '주소를 입력해주세요']);
    const [detailAddress, setDetailAddress] = useState('');

    if(user.isAuth){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <View style={styles.header} >
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.address}> {user.address.address} </Text>
                    </TouchableOpacity>
                    
                </View>
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
        backgroundColor: '#96e4fa'
    },
    address: {
        fontSize: 15,
        marginTop: 35,
        fontWeight: 'bold',
        color: 'white'
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
})
