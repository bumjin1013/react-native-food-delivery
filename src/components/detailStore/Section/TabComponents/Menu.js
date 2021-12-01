import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Menu = (props) => {
    const navigation = useNavigation();
    const renderMenu = props.store && props.store.menu.map((menu) => {
        
        return (
            <TouchableOpacity key={menu._id} style={styles.menu} onPress={() => navigation.navigate('MenuInfo', {menu: menu, storeId: props.store._id, title: props.store.title, storeImage: props.store.image})}>
                <View style={styles.menuText}>
                    <Text style={styles.menuName}>{menu.name}</Text>
                    <Text style={styles.menuPrice}>{menu.price}원</Text>
                </View>
                <Image style={styles.image} source={{uri: `http://192.168.0.8:5000/${menu.image[0]}`}}></Image>
            </TouchableOpacity>
            
        )
    })

    return(
       <ScrollView style={styles.tabContents}>
           {renderMenu}
       </ScrollView>
    )
}

export default Menu

const styles = StyleSheet.create({
    menu: {
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderColor: '#C0C0C0',
        backgroundColor: 'white'
    },
    image: {
        width: '80%',
        height: '80%',
        justifyContent: 'center',
        flex: 3,
        marginTop: 15,
        marginRight: 15,
        marginBottom: 15,
        borderWidth: 0.1,
        borderRadius: 15
    },
    menuName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    menuText: {
        flex: 7,
        marginLeft: 15,
        
    },
    menuPrice: {

    },
})
