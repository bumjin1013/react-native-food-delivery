import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image } from 'react-native'
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import { addReview } from '../../../_actions/user_actions';

const History = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [starCount, setStarCount] = useState(0);
    const [image, setImage] = useState(null);
    const [contents, setContents] = useState('');
    const writer = useSelector(state => state.user.userData && state.user.userData.nickname);

    const pickImage = async () => {

        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                alert('카메라 접근 권한 설정이 필요합니다.');
              }
            }
          })();
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    
    const onStarRatingPress = (rating) => {
        setStarCount(rating);
    }

    const onSubmitReview = () => {

        if(image !== null){
        //이미지 업로드를 위해 폼데이터 형식으로 변경
        let formData = new FormData();
        const file = {
            uri: image,
            name: 'photo.jpg',
            type: 'multipart/form-data' 
        }
        formData.append("file", file)
        //서버로 업로드
        axios.post('http://192.168.0.8:5000/api/stores/image', formData, file)
            .then(response => {
                if (response.data.success) {

                    let body ={
                        id: props.history.storeId,
                        image: response.data.filePath,
                        writer: writer,
                        star: starCount,
                        contents: contents,
                        orderId: props.history.orderId
                    }
            
                    //저장한 정보들을 addreview 라우터로 전송
                    axios.post('http://192.168.0.8:5000/api/stores/review', body) && dispatch(addReview(body)) 
                    .then(response => {
                        if(response.payload.success) {
                            setModalVisible(false);
                            showMessage({
                                message: "리뷰를 등록하였습니다.",
                                type: "info",
                                icon: "success",
                                backgroundColor: '#96e4fa'
                              });
                              
                        } else {
                            setModalVisible(false);
                            showMessage({
                                message: "리뷰등록에 실패하였습니다.",
                                type: "danger",
                                icon: "danger",
                                backgroundColor: '#96e4fa'
                              });
                        }
                    })
                    
                } else {
                    setModalVisible(false);
                    showMessage({
                        message: "리뷰 등록에 실패하였습니다.",
                        type: "danger",
                        icon: "danger",
                        backgroundColor: '#96e4fa'
                      });
                }
            })
        //사진이 없는경우
        } else {
            let body ={
                id: props.history.storeId,
                writer: writer,
                star: starCount,
                contents: contents,
                orderId: props.history.orderId
            }
    
            //저장한 정보들을 addreview 라우터로 전송
            axios.post('http://192.168.0.8:5000/api/stores/review', body) && axios.post('http://192.168.0.8:5000/api/users/review', body)
            .then(response => {
                if(response.data.success) {
                    setModalVisible(false);
                    showMessage({
                        message: "리뷰를 등록하였습니다.",
                        type: "info",
                        icon: "success",
                        backgroundColor: '#96e4fa'
                      });
                } else {
                    setModalVisible(false);
                    showMessage({
                        message: "리뷰등록에 실패하였습니다.",
                        type: "danger",
                        icon: "danger",
                        backgroundColor: '#96e4fa'
                      });
                }
            })
        }
    }

    //요일 계산 함수
    const renderDay = () => {
        switch(moment(props.history.orderTime).day()) {
            case 0:
                return ('일요일');
                break;
            case 1:
                return ('월요일');
                break;
            case 2:
                return ('화요일');
                break;
            case 3:
                return ('수요일');
                break;
            case 4:
                return ('목요일');
                break;
            case 5:
                return ('금요일');
                break;
            case 6:
                return ('토요일');
                break;
        }
    }

    return (
        <View style={styles.history}>
                <View style={styles.historyHeader}>
                    <View style={styles.date}>  
                        <Text style={styles.state}>{moment(props.history.orderTime).format('MM/DD')} {renderDay()}</Text>
                        <Text style={styles.state}> · {props.history.state}</Text>
                    </View>
                    <View style={styles.detail}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetailHistory', { history: props.history })} style={styles.detailBtn}>
                            <Text style={{ fontSize: 12 }}>주문상세</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => panelRef.current.togglePanel()} style={styles.etcBtn}>
                            <Feather name="more-vertical" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.historyContents}>
                    <Image style={styles.storeImage} source={{uri: `http://192.168.0.8:5000/${props.history.menu[0].storeImage[0]}`}}/> 
                    <View>
                        <TouchableOpacity style={styles.storeName} onPress={() => navigation.navigate('DetailStore', {storeId: props.history.menu[0].storeId})}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>{props.history.storeName}</Text>
                            <AntDesign name="right" size={15} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.menu}>{props.history.menu.length > 1 ? props.history.menu[0].name + '외 ' + (props.history.menu.length - 1) + '개' : props.history.menu[0].name}</Text>
                    </View>
                    
                </View>

                {/* 리뷰 작성 모달 창*/}
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.closeBtn}>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <AntDesign name="close" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.reviewContents}>
                                <Text style={styles.modalText}>음식은 어떠셨나요?</Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold'}}>{props.history.storeName}</Text>
                                <Text style={{ paddingTop: 5}}>{props.history.menu.length > 1 ? props.history.menu[0].name + '외 ' + (props.history.menu.length - 1) + '개' : props.history.menu[0].name}</Text>
                                <View style={{ marginTop: 10}}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={starCount}
                                        selectedStar={(rating) => onStarRatingPress(rating)}
                                        starSize={25}
                                        fullStarColor={'gold'}
                                        emptyStarColor={'#F0F0F0'}
                                    />
                                </View>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss} > 
                                    <TextInput style={styles.textInput} multiline={true} placeholder='리뷰를 작성해주세요' onChangeText={(value) => {setContents(value)}}/>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity style={styles.addPhoto} onPress={pickImage}> 
                                    <AntDesign name="plus" size={24} color="gray" />
                                </TouchableOpacity>
                                {image ? 
                                    <View>
                                        <Image source={{uri: image}} style={styles.image}/>
                                        <TouchableOpacity style={styles.deleteImage} onPress={() => {setImage(null)}}>
                                            <AntDesign name="close" size={24} color="#E0E0E0" />
                                        </TouchableOpacity>
                                        
                                    </View> : 
                                    null
                                }
                            </View>
                            <View style={styles.modalBtn}>
                                <TouchableOpacity style={styles.cancel} onPress={() => {setModalVisible(false)}}>
                                    <Text style={styles.cancelText}>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.submit} onPress={onSubmitReview}>
                                    <Text style={styles.submitText}>확인</Text>
                                </TouchableOpacity>
                            </View>
                     </View>
                    </KeyboardAvoidingView>
                </Modal>
         
               
                {/* 리뷰 권한이 있는 경우 리뷰 작성 버튼 */}
                {props.history.reviewAuth 
                    ? 
                    <TouchableOpacity onPress={() =>  setModalVisible(true)} style={styles.createReviewBtn}>
                        <Text style={{ fontSize: 15, color: '#FFFFFF' }} >리뷰 작성하기</Text>
                    </TouchableOpacity>
                    :
                    null}
            </View>
    )
}

export default History

const styles = StyleSheet.create({
    history: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        marginTop: 10,
        borderBottomColor: '#E0E0E0',
    },
    historyHeader: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15
    },
    detailBtn: {
        width: '40%',
        height: 25,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    etcBtn: {
        marginRight: 15
    },
    historyContents: {
        flex: 4,
        margin: 15,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    date: {
        flex: 1, 
        marginLeft: 15,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    detail: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    storeName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    createReviewBtn: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 15,
        marginRight: 15,
        marginLeft: 15,
        borderColor: '#66B2FF',
        backgroundColor: '#66B2FF'
    },
    modal: {
        backgroundColor: 'white',
        width: '70%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    closeModal: {
        backgroundColor: 'blue',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: '92%',
        height: 480,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: -10,
        marginBottom: 10,
        fontSize: 20,
        textAlign: "center"
    },
    closeBtn: {
        
    },
    reviewContents: {
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: '#F0F0F0',
        width: '100%',
        height: 150,
        borderRadius: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 15,
    },
    modalBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 15
    },
    cancel: {
        borderWidth: 1,
        width: '48%',
        padding: 20,
        borderColor: '#C0C0C0',
        borderRadius: 15,
        color: 'red',
        alignItems: 'center',
    },
    submit: {
        borderWidth: 0,
        width: '48%',
        padding: 20,
        backgroundColor: '#66B2FF',
        borderRadius: 15,
        color: 'white',
        overflow: 'hidden',
        alignItems: 'center',
    },
    storeImage: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 20
    },
    menu: {
        fontSize: 15,
        marginLeft: 10,
        marginTop: 5
    },
    state: {
        color: '#A0A0A0',
        fontSize: 15
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginLeft: 10
    },
    addPhoto: {
        backgroundColor: '#F0F0F0',
        borderWidth: 0,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    imageContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    cancelText: {
        fontSize: 16,
        color: '#A0A0A0'
    },
    submitText: {
        fontSize: 16,
        color: 'white'
    },
    deleteImage: {
        position: 'absolute',
        right: 0
    }
})
