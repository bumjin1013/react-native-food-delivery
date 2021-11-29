import React from 'react'
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Board from './Section/Board';
const MyPageScreen = ({ navigation }) => {
     
    const user = useSelector(state => state.user.userData)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign  name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>마이페이지</Text>
                <View style={{ flex: 1 }}/>
            </View>
            <View style={styles.scrollContainer}>
            <ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('MyInfo')} style={styles.nickname} >
                <AntDesign name="user" size={24} color="black" style={{marginRight: 15, fontSize: 30}}/>
                <Text style={styles.nicknameText}>안녕하세요, {user.nickname}님 </Text>
                <AntDesign name="right" size={15} color="black" />
            </TouchableOpacity>
            <View style={styles.component}>
                <TouchableOpacity onPress={() => navigation.navigate('Heart')} style={styles.heart}>
                    <AntDesign name="hearto" size={24} color="red" />
                    <Text style={styles.componentText}>찜</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.history}>
                    <AntDesign  name="bars" size={24} color="black" />
                    <Text style={styles.componentText}>주문내역</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Review')} style={styles.review}>
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                    <Text style={styles.componentText}>리뷰관리</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.board}>
                <Board />
            </View>
            </ScrollView>
            </View>
            
            
            
            
        </View>
    )
}

export default MyPageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
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
    nickname: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white'
    },
    nicknameText:{
        fontSize: 20
    },
    component: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: 'white'
    },
    heart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    history: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#F0F0F0'
    },
    review :{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    componentText:{
        marginTop: 5
    },
    board:{
        flex: 6.5,
        marginTop: 10
    },
    scrollContainer: {
        flex: 9
    }
})
