import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

function LandingScreen( { navigation } ) {

    const user = useSelector(state => state.user.userData);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text> 주소 </Text>
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
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 1.3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
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
        flex: 6.4
    }
})

export default LandingScreen
