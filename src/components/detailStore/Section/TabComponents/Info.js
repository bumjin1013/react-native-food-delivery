import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Info = (props) => {

    const navigation = useNavigation();
    const renderDeliveryArea = props.store.deliveryArea&&props.store.deliveryArea.map((item, index) => {
        
        return (
            <Text style={{fontSize: 16, marginRight: 10}}>
                {item.gu} {item.ro}
            </Text>
        )
    })

    return(
        <ScrollView>
            <View style={styles.descriptionContainer}>
                <Text style={styles.title}>가게소개</Text>
                <Text style={{fontSize: 16}}>{props.store.description}</Text>
            </View> 
            <View style={styles.InfoContainer}>
                <Text style={styles.title}>영업정보</Text>
                <View style={styles.Container}>
                    <View style={styles.leftContainer}>
                        <Text style={{fontSize: 16}}>상호명</Text>
                        <Text style={{fontSize: 16, marginTop: 12}}>주소</Text>
                        <Text style={{fontSize: 16, marginTop: 12}}>전화번호</Text>
                        <Text style={{fontSize: 16, marginTop: 12}}>배달지역</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={{fontSize: 16}}>{props.store.title}</Text>
                        <Text style={{fontSize: 16, marginTop: 10}}>{props.store.address}</Text>
                        <Text style={{fontSize: 16, marginTop: 10}}>02-123-4567</Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            {renderDeliveryArea}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Info

const styles = StyleSheet.create({
    descriptionContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1, 
        borderBottomColor: '#E0E0E0',
        
    },
    InfoContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1, 
        borderBottomColor: '#E0E0E0'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    leftContainer: {
        flex: 3
    },
    rightContainer: {
        flex: 7
    },
    Container: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
})
