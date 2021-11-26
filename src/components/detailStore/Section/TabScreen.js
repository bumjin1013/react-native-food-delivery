import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StarRating from 'react-native-star-rating';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const TabScreen = (props) => {
    const navigation = useNavigation();

    const Menu = () => {

        const renderMenu = props.store && props.store.menu.map((menu) => {
            
            return (
                <TouchableOpacity key={menu._id} style={styles.menu} onPress={() => navigation.navigate('MenuInfo', {menu: menu, storeId: props.store._id, title: props.store.title, storeImage: props.store.image})}>
                    <View style={styles.menuText}>
                        <Text style={styles.menuName}>{menu.name}</Text>
                        <Text style={styles.menuPrice}>{menu.price}원</Text>
                    </View>
                    <Image style={styles.image} source={{uri: `http://192.168.0.9:5000/${menu.image[0]}`}}></Image>
                </TouchableOpacity>
                
            )
        })

        return(
           <ScrollView style={styles.tabContents}>
               {renderMenu}
           </ScrollView>
        )
    }

    const Info = () => {

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

    const Review = () => {

        const renderReview = props.store && props.store.review.slice(0).reverse().map((review) => {

            return (
                <View key={review._id} style={styles.review}>
                    <View style={styles.reviewTitle}>
                        <AntDesign name="user" size={30} color="black" style={styles.userIcon}/>
                        <View>
                            <Text style={styles.writer}>{review.writer}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={review.star}
                                    selectedStar={(rating) => onStarRatingPress(rating)}
                                    starSize={18}
                                    fullStarColor={'gold'}
                                    emptyStarColor={'#E0E0E0'}
                                />      
                                <Text style={{marginLeft: 5}}>{moment(review.createdAt).format('YY년MM월DD일 HH시mm분')}</Text>    
                            </View>
                        </View>
                    </View>
                    {review.image ? 
                    <View style={{alignItems: 'center'}}>  
                        <Image style={styles.reviewImage} source={{uri: `http://192.168.0.9:5000/${review.image[0]}`}}/>    
                    </View> : null}
                    <View style={styles.contents}>
                        <Text style={styles.reviewText}>{review.contents}</Text>
                    </View>
                </View>
            )
        })

        return(
            <ScrollView>
                <View style={styles.detail}>
                    <View style={styles.star}>
                        <Text style={styles.starText}>{props.star && props.star}</Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={props.star && props.star}
                            selectedStar={(rating) => onStarRatingPress(rating)}
                            starSize={23}
                            fullStarColor={'gold'}
                            emptyStarColor={'#E0E0E0'}
                        />
                          
                    </View>
                    <View style={styles.starDetail}>

                    </View>
                </View>
                {renderReview}
            </ScrollView>
        )
    }

    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarScrollEnabled: false,
                tabBarStyle: { backgroundColor: '#FFFFFF' },
                tabBarPressOpacity: true
            }}
            style={styles.tabBar}
        >
             <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ forcused, color }) => {
                    return <Text style={styles.tabBarText}>메뉴</Text>;
                    },
                }}
            />
            <Tab.Screen
                name="Info"
                component={Info}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ forcused, color }) => {
                    return  <Text style={styles.tabBarText}>정보</Text>;
                    },
                }}
            />
            <Tab.Screen
                name="Review"
                component={Review}
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
    detail: {
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        borderTopWidth: 0.2,
        borderBottomWidth: 5,
        borderColor: '#C0C0C0',
        flex: 1,
        flexDirection: 'row'
    },
    star: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    starDetail: {
        flex: 6
    },
    starText: {
        fontSize: 38
    },
    review: {
        width: '100%',
        backgroundColor: 'white',
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        borderColor: '#C0C0C0',
        flex: 0,
    },
    reviewTitle: {
        margin: 15,
        flexDirection: 'row'
    },
    userIcon: {
        borderWidth: 0.2,
        marginRight: 10, 
        fontSize: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
        width: 30,
        height: 30,
    },
    writer: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    reviewImage: {
        width: '90%',
        height: 250,
        borderRadius: 15,
        marginBottom: 15
    },
    contents: {
        margin: 15
    },
    reviewText: {
        fontSize: 15
    },
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
    }
})
