import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

function MainScreen( { navigation }) {
    return (
        <View style={styles.container}>
            <Text>hey</Text>
            <StatusBar style="auto" />
            <Button onPress={() => { navigation.navigate('Login') }} title="로그인"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
});

export default MainScreen
