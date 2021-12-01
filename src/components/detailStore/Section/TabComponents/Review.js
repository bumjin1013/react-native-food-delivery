import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import StarRating from 'react-native-star-rating';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';

const Review = (props) => {
    console.log('re-render');
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
                    <Image style={styles.reviewImage} source={{uri: `http://192.168.0.8:5000/${review.image[0]}`}}/>    
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

export default Review

const styles = StyleSheet.create({
    detail: {
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
    },
    star: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starDetail: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    starText: {
        fontSize: 38
    },
    review: {
        width: '100%',
        backgroundColor: 'white',
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
    chart: {
        borderRadius: 20,
        width: 130,
        height: 200,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    }
    
})
