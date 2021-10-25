import React from 'react'
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const MyPageScreen = ({ navigation }) => {
     
    const user = useSelector(state => state.user.userData)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Page</Text>
            </View>
            <View style={styles.nickname}>
                <AntDesign name="user" size={24} color="black" style={{marginRight: 15, fontSize: 30}}/>
                <Text style={styles.nicknameText}>안녕하세요, {user.nickname}님</Text>
            </View>
            <View style={styles.component}>
                <TouchableOpacity style={styles.heart}>
                    <AntDesign name="hearto" size={24} color="red" />
                    <Text style={styles.componentText}>찜</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.history}>
                    <AntDesign  name="bars" size={24} color="black" />
                    <Text style={styles.componentText}>주문내역</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.review}>
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                    <Text style={styles.componentText}>리뷰관리</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.etc}>
                
            </View>
            
            
        </View>
    )
}

export default MyPageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 12
    },
    nickname: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 5,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
    },
    nicknameText:{
        fontSize: 20
    },
    component: {
        flex: 1.3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    heart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRightWidth: 0.5,
        borderColor: '#E0E0E0',
    },
    history: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderColor: '#E0E0E0',
    },
    review :{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderLeftWidth: 0.5,
        borderColor: '#E0E0E0',
    },
    componentText:{
        marginTop: 5
    },
    etc:{
        flex: 6.5
    }
})
