import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const TabScreen = (props) => {

    const navigation = useNavigation();

    const userAddress = useSelector(state => state.user.userData && state.user.userData.isAuth ? state.user.userData.address.address : null);
    const [storeList, setStoreList] = useState();

    useEffect(() => {
        axios.get(`http://192.168.0.9:5000/api/stores/list?address=${userAddress}`)
            .then(response => {
                setStoreList(response.data.store);
            })
            .catch((err) => alert(err));
    }, []);

    
    const renderStore = (category) => {
        const filterStore = storeList && storeList.map(store => {
            if(store.category === category) {
                return (
                    <TouchableOpacity style={styles.store} key={store._id} onPress={() => navigation.navigate('DetailStore', {storeId: store._id})}>
                        <Image style={styles.image} source={{uri: `http://192.168.0.9:5000/${store.image[0]}`}}/>
                        <Text>{store.title}</Text>
                    </TouchableOpacity>
                )
            } else {
                return (
                    null
                )
            }  
        })
        return (
            filterStore
        )
    }

    const Korean = () => {
        return(
            <ScrollView>
                {renderStore('korean')}
            </ScrollView>
        )
    }

    const Western = () => {
        return(
            <ScrollView>
                {renderStore('western')}
            </ScrollView>
        )
    }
    const Chineese = () => {
        return(
            <ScrollView>
                {renderStore('chineese')}
            </ScrollView>
        )
    }
    const Japaneese = () => {
        return(
            <ScrollView>
                {renderStore('japaneese')}
            </ScrollView>
        )
    }
    const Chicken = () => {
        return(
            <ScrollView>
                {renderStore('chicken')}
            </ScrollView>
        )
    }
    const Pizza = () => {
        return(
            <ScrollView>
                {renderStore('pizza')}
            </ScrollView>
        )
    }
    const Burger = () => {
        return(
            <ScrollView>
                {renderStore('burger')}
            </ScrollView>
        )
    }
    const Bunsick = () => {
        return(
            <ScrollView>
                {renderStore('bunsick')}
            </ScrollView>
        )
    }
    const Cafe = () => {
        return(
            <ScrollView>
                {renderStore('cafe')}
            </ScrollView>
        )
    }
    const Midnight = () => {
        return(
            <ScrollView>
                {renderStore('midnight')}
            </ScrollView>
        )
    }

    return (
        <Tab.Navigator 
            initialRouteName= {props.initialRouteName}
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarItemStyle: { width: 80 },
                tabBarStyle: { backgroundColor: '#FFFFFF' },
                
            }}
            style={styles.tabBar}>
            
            <Tab.Screen
            name="Korean"
            component={Korean}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return <Text style={styles.tabBarText}>한식</Text>;
                },
            }}
            />
            <Tab.Screen
            name="Western"
            component={Western}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return  <Text style={styles.tabBarText}>양식</Text>;
                },
            }}
            />
             <Tab.Screen
            name="Chineese"
            component={Chineese}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return  <Text style={styles.tabBarText}>중식</Text>;
                },
            }}
            />
             <Tab.Screen
            name="Japaneese"
            component={Japaneese}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return  <Text style={styles.tabBarText}>일식</Text>;
                },
            }}
            />
             <Tab.Screen
            name="Chicken"
            component={Chicken}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return <Text style={styles.tabBarText}>치킨</Text>;
                },
            }}
            />
             <Tab.Screen
            name="Pizza"
            component={Pizza}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return <Text style={styles.tabBarText}>피자</Text>;
                },
            }}
            />
             <Tab.Screen
            name="Burger"
            component={Burger}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return <Text style={styles.tabBarText}>버거</Text>;
                },
            }}
            />
             <Tab.Screen
            name="Bunsick"
            component={Bunsick}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return <Text style={styles.tabBarText}>분식</Text>;
                },
            }}
            />
             <Tab.Screen
            name="Cafe"
            component={Cafe}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return <Text style={styles.tabBarText}>카페</Text>;
                },
            }}
            />
            <Tab.Screen
            name="Midnight"
            component={Midnight}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ forcused, color }) => {
                return <Text style={styles.tabBarText}>야식</Text>;
                },
            }}
            />

        </Tab.Navigator>
    )
}

export default TabScreen

const styles = StyleSheet.create({
    tabBarText: {
        fontSize: 16,
        width: '100%'
    },
    store: {
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        flexDirection: 'row',
        borderColor: '#E0E0E0',
        backgroundColor: 'white'
    },
    image: {
        width: 80,
        height: 80,
        borderWidth: 0.2,
        borderRadius: 15,
        margin: 15,
        borderColor: '#C0C0C0'
    
    }
})
