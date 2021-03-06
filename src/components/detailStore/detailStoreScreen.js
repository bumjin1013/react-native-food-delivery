import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Button } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import { Feather } from '@expo/vector-icons';
import TabScreen from './Section/TabScreen';
import { addHeartUser, deleteHeartUser } from '../../_actions/user_actions';
import { addHeartStore, deleteHeartStore } from '../../_actions/store_actions';

const DetailStoreScreen = ({ navigation, route }) => {

    const [store, setStore] = useState('');
    const [star, setStar] = useState();
    const user = useSelector(state => state.user.userData && state.user.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://192.168.0.8:5000/api/stores/stores_by_id?id=${route.params.storeId}`)
            .then(response => {
                if(response.data.success) {
                    setStore(response.data.store[0])
                    setStar(response.data.star);
                }
            })
            .catch((err) => alert(err));
    }, [])

    
    const renderStore = () => {

        const body = {
            userId: user._id,
            storeId: store._id
        }
        
        //찜 추가
        const addHeart = () => {
            console.log('addHeart')
            dispatch(addHeartUser(body))
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                });

            dispatch(addHeartStore(body))
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        //찜 해제
        const deleteHeart = () => {
            console.log('deleteHeart')
            dispatch(deleteHeartUser(body))
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
            dispatch(deleteHeartStore(body))
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        return (
            <View style={styles.scroll}>
                <View style={styles.storeHeader}>
                    <Text style={styles.title}>{store.title}</Text>
                    <View style={styles.star}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={star}
                            selectedStar={(rating) => onStarRatingPress(rating)}
                            starSize={20}
                            fullStarColor={'gold'}
                            emptyStarColor={'#E0E0E0'}
                        />           
                        <Text style={styles.starText}>{star}</Text>
                    </View>
                    <View style={styles.review}>
                        <Text style={styles.reviewText}>최근리뷰 {store.review.length}개</Text>
                        <View style={styles.columnDivier}/>
                        <Text style={styles.reviewText}>최근 사장님 댓글</Text>
                    </View>
                    <View style={styles.storeHeaderBtn}>
                        <TouchableOpacity style={styles.btn} onPress={() => {Linking.openURL(`tel:01012341234`)}} >
                            <Feather name="phone-call" size={15} color="black" />
                            <Text style={styles.btnText}>전화</Text>
                        </TouchableOpacity>
                        <View style={styles.columnDivier}/>
                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={user.heart.some(item => item.storeId == store._id) ? deleteHeart : addHeart } 
                        >
                            <AntDesign 
                                name={user.heart.some(item => item.storeId == store._id) ? "heart" : "hearto"} 
                                size={15} 
                                color={user.heart.some(item => item.storeId == store._id) ? "red" : "black"} />
                            <Text style={styles.btnText}>찜</Text>
                        </TouchableOpacity>
                        <View style={styles.columnDivier}/>
                        <TouchableOpacity style={styles.btn}>
                            <AntDesign name="sharealt" size={15} color="black" />
                            <Text style={styles.btnText}>공유</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TabScreen style={styles.tab} store={store && store} star={star && star}/>
                <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('Cart')}>
                    <AntDesign name="shoppingcart" size={30} color="white" />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign  name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{store.title}</Text>
                <View style={{ flex: 1 }}/>
            </View>
            <View style={styles.detail}>
                {store ? renderStore() : null}
            </View>
            
        </View>
    )
}

export default DetailStoreScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1
    },
    backBtn: {
        flex: 1,
        marginTop: 30,
        padding: 15
    },
    headerText: {
        flex: 8,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 35,
        textAlign: 'center',
        marginLeft: -30
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    detail: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    storeHeader: {
        paddingTop: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 0,
        margin: 15,
        borderRadius: 10,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5
    },
    image: {
        width: 80,
        height: 80,
        borderWidth: 0,
        borderRadius: 15,
        margin: 15
    
    },
    title: {
        fontSize: 25
    },
    star: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    starText: {
        fontSize: 15,
        marginLeft: 5
    },
    storeHeaderBtn: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    review: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    reviewText: {
        color: '#A0A0A0'
    },
    columnDivier: {
        marginLeft: 5,
        marginRight: 5,
        height: 13,
        borderLeftWidth: 1,
        borderColor: '#A0A0A0',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    btnText: {
        marginLeft: 5,
        fontSize: 15
    },
    tab: {
        width: '100%',
        height: '100%',
    },
    cart: {
        marginBottom: 30,
        marginRight: 30,
        backgroundColor: '#96e4fa',
        width: 60,
        height: 60,
        borderWidth: 0,
        position:'absolute',
        bottom:0,
        right: -20,
        alignSelf:'flex-end',
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
