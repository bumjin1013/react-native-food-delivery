import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Category from './Category/Category';

function LandingScreen({ navigation }) {

    const user = useSelector(state => state.user.userData && state.user.userData);

    if(user.isAuth){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.address}> {user.address.address} </Text>
                </View>
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
        backgroundColor: '#99ccff'
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
    }
})
