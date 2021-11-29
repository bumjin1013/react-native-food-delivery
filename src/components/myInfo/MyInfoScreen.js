import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const MyInfoScreen = ({ navigation }) => {

    const user = useSelector(state => state.user.userData && state.user.userData);
    const [nickname, setNickname] = useState(user && user.nickname);

    console.log(nickname);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign  name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>내 정보</Text>
                <View style={{ flex: 1 }}/>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.profile}>
                        <AntDesign name="user" size={24} color="black" style={{marginRight: 15, fontSize: 30}}/>
                        <TextInput 
                            defaultValue={nickname} 
                            textAlign='center' 
                            style={styles.nickname} 
                            onChangeText={setNickname}/>
                    </View>
                    <View style={styles.etc}>
                        <View style={styles.address}>
                            <Text>주소</Text>
                            <Text>{user.address.address + ' ' + user.address.detail}</Text>
                        </View>
                        <View style={styles.email}>
                            <Text>이메일</Text>
                            <Text>{user.email}</Text>
                        </View>
                       
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default MyInfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    backBtn: {
        flex: 1,
        marginTop: 30,
        padding: 15
    },
    headerText: {
        flex: 8,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 35,
        textAlign: 'center',
        marginLeft: -30
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    profile: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
    },
    nickname: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        height: 30, 
        width: 200,
        marginTop: 20,
    },
    address: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50
    },
    email: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50
    },
    etc: {
        backgroundColor: 'white',
        marginTop: 10
    }
})
