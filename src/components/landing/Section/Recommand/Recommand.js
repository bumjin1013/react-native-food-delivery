import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Recommand = () => {
    return (
        <View style={styles.recommandContainer}>
            <Text>내 주변 가게</Text>
        </View>
    )
}

export default Recommand

const styles = StyleSheet.create({
    recommandContainer: {
        margin: 15,
        marginTop: 20
    }
})
