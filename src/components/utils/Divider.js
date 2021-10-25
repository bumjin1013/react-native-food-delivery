import React from 'react'
import { StyleSheet, View } from 'react-native'

const Divider = () => {
    return (
        <View style={styles.divier}/>
    )
}

export default Divider

const styles = StyleSheet.create({
    divier: {
        borderBottomColor: '#C0C0C0',
        borderBottomWidth: 1,
        width: '92%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        paddingTop: 10,
        paddingTop: 15
    },
})
