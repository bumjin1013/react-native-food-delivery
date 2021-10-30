import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, ScrollView } from 'react-native'

const Category = ({ LandingScreen }) => {
    return (
        <View style={styles.iconContainer}>
            <View style={styles.firstLine}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('StoreList')}>
                    <Image source={require('./Icon/korean.png')} style={styles.icon} />
                    <Text style={styles.iconText}>한식</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('./Icon/western.png')} style={styles.icon}/> 
                    <Text style={styles.iconText}>양식</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('./Icon/chineese.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>중식</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('./Icon/japaneese.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>일식</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.secondLine}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('./Icon/chicken.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>치킨</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('./Icon/pizza.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>피자</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('./Icon/burger.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>햄버거</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('./Icon/bunsick.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>분식</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.thirdLine}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('./Icon/dessert.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>카페</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('./Icon/midnight.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>야식</Text>
                </TouchableOpacity>
                
                <Image style={styles.icon}/>
                <Image style={styles.icon}/>
            </View>
           
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    iconContainer: {
        flex: 1,
    },
    firstLine: {
        flex:1,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    secondLine: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    thirdLine: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    iconContainer:{
        alignItems: 'center',
    },
    icon: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        margin: 10,
    },
    iconText: {
        marginTop: -8,
        fontSize: 14
    }
})
