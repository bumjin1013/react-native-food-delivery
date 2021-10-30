import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const StoreListScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.address}> {user.address.address} </Text>
            </View>
            <View style={styles.tab}>
                <Text> 탭 </Text>
            </View>
            <View>
                <Text>가게 리스트</Text>
            </View>
        </View>
    )
}

export default StoreListScreen

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
    tab: {
        flex: 0.7,
        backgroundColor: 'black',
        width: '100%'
    },
    storeContainer: {
        flex: 9
    }
})
