import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function LandingScreen({ navigation }) {

    const user = useSelector(state => state.user.userData);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.address}> {user.address.address} </Text>
            </View>
            <View style={styles.tab}>
                <Text> 탭 </Text>
            </View>
            <View style={styles.banner}>
                <Text> 배너 </Text>
            </View>
            <View style={styles.category}>
                <Button title="치킨" />
                <Button title="한식"/>
            </View>
            <View style={styles.bottomTab}>
                <TouchableOpacity>
                    <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="hearto" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="bars" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
                    <AntDesign name="user" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LandingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    address: {
        marginTop: 12
    },
    tab: {
        flex: 0.7,
        backgroundColor: 'black',
        width: '100%'
    },
    banner: {
        flex: 1.6,
        width: '100%',
        backgroundColor: 'yellow'
    },
    category: {
        flex: 5.7
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
    }
})
