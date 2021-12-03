import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import * as Progress from 'react-native-progress';

const ReviewScreen = ({ navigation }) => {

    const history = useSelector(state => state.user.userData && state.user.userData.history);

    let review = 0;

    //history 데이터에서 review를 작성한 history의 개수를 세는 함수 
    const countReview = history && history.map((item) => {
        if(item.review.length !== 0) {
            review ++;
        }
    })


    const renderReview = history && history.map((item, index) => {

        //주문한 메뉴 랜더링
        const renderMenu = item.menu.map((menu, index) => {
            return(
                <Text style={styles.menuText} key={index}>{menu.name}</Text>
            )
        })

        console.log(typeof(item.review[0].image));

        //작성한 리뷰가 있는 경우에만
        if(item.review.length !== 0) {
            return (
                <View style={styles.review} key={index}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>{item.storeName}</Text>
                        <AntDesign name="right" size={12} color="black" />
                    </TouchableOpacity>
                    <View style={styles.star}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={item.review[0].star}
                            selectedStar={(rating) => onStarRatingPress(rating)}
                            starSize={20}
                            fullStarColor={'gold'}
                            emptyStarColor={'#E0E0E0'}
                        />
                    </View>
                    {/* 리뷰의 이미지가 존재하는경우 랜더링 하는데, string으로 저장된 경우와 array로 저장된 경우 나누어 랜더링 */}
                    {item.review[0].image ? 
                        <Image style={styles.image} 
                            source={typeof(item.review[0].image == 'string') ? 
                                {uri: `http://192.168.0.8:5000/${item.review[0].image}`} : 
                                {uri: `http://192.168.0.8:5000/${item.review[0].image[0]}`}}/> : 
                        <Progress.CircleSnail color={['red']} />
                    }              
                    <View style={{ marginTop: 15}}>
                        <Text style={{ fontSize: 17}}>{item.review[0].contents}</Text>
                    </View>
                    <View style={styles.menuBox}>  
                        {renderMenu}
                    </View>
                </View>
            )
        } else {
            null
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>리뷰관리</Text>
                <View style={{ flex: 1 }}/>
            </View>
            <View style={styles.reviewContainer}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.myReview}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>내가 쓴 총 리뷰 {review} 개</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={{ height: '100%'}}>
                        {renderReview}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default ReviewScreen

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
    reviewContainer: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    scroll: {
        width: '100%',
        height: '100%',
        flex: 9
    },
    myReview: {
        marginTop: 15,
        marginLeft: 15,
    },
    divider: {
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingTop: 15
    },
    review: {
        margin: 15
    },
    menuText: {
        backgroundColor: '#E0E0E0',
        alignSelf: 'flex-start',
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderWidth: 0,
        borderRadius: 11,
        overflow: 'hidden',
        marginRight: 5,
        height: 25,
    },
    menuBox: {
        marginTop: 15,
        flexDirection: 'row'
    },
    star:{ 
        alignItems: 'flex-start',
        marginTop: 5
    },
    image: {
        marginTop: 10,
        width: '100%',
        height: 250,
        borderRadius: 15
    }
    
})
