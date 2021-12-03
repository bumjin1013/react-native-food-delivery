import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Menu from './TabComponents/Menu';
import Info from './TabComponents/Info';
import Review from './TabComponents/Review';
const Tab = createMaterialTopTabNavigator();

const TabScreen = (props) => {

    const MenuComponent = () => (
        <Menu store={props.store}/>
    )
    const InfoComponent = () => (
        <Info store={props.store}/>
    )
    const ReviewComponent = () => (
        <Review store={props.store} star={props.star}/>
    )
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarScrollEnabled: false,
                tabBarStyle: { backgroundColor: '#FFFFFF' },
                tabBarPressOpacity: true,
            }}
            style={styles.tabBar}
        >
             <Tab.Screen
                name="Menu"
                component={MenuComponent}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ forcused, color }) => {
                    return <Text style={styles.tabBarText}>메뉴</Text>;
                    },
                }}
            />
            <Tab.Screen
                name="Info"
                component={InfoComponent}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ forcused, color }) => {
                    return  <Text style={styles.tabBarText}>정보</Text>;
                    },
                }}
            />
            <Tab.Screen
                name="Review"
                component={ReviewComponent}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ forcused, color }) => {
                    return  <Text style={styles.tabBarText}>리뷰</Text>;
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default TabScreen

const styles = StyleSheet.create({
    tabBarText: {
        fontSize: 16
    },
    
})
