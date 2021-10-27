import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ReviewScreen = () => {

    const history = useSelector(state => state.user.userData && state.user.userData.history);

    let review = 0;

    //history 데이터에서 review를 작성한 history의 개수를 세는 함수 
    const countReview = history && history.map((item, index) => {
        if(item.review.length !== 0) {
            review ++;
        }
    })


    const renderReview = history && history.map((item, index) => {

        //주문한 메뉴 랜더링
        const renderMenu = item.menu.map((menu) => {
            return(
                <Text style={styles.menuText}>{menu.name}</Text>
            )
        })

        //작성한 리뷰가 있는 경우에만
        if(item.review.length !== 0) {
            return (
                <View style={styles.review} key={index}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15}}>{item.storeName}</Text>
                        <AntDesign name="right" size={12} color="black" />
                    </TouchableOpacity>
                    <View style={{ marginTop: 15}}>
                        <Text>{item.review[0].contents}</Text>
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
                <Text style={styles.headerText}>리뷰관리</Text>
            </View>
            <View style={styles.reviewContainer}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.myReview}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>내가 쓴 총 리뷰 {review} 개</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View>
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
        justifyContent: 'center'
    },
    header: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 35
    },
    reviewContainer: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 5,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    myReview: {
        marginTop: 15,
        marginLeft: 15
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
    }
    
})
