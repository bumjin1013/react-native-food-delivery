import React from 'react';
/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from './Loading';
import axios from 'axios';
import { io } from 'socket.io-client';

export function Payment({ navigation, route }) {

    let data = {
        orderId: route.params.body.orderId,
        storeId: route.params.body.storeId,
        userId: route.params.userId,
        token: route.params.token
    }

    console.log(route.params.body);

  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {

    if(response.imp_success == 'true'){
        axios.post('http://192.168.0.8:5000/api/users/order', route.params.body) && axios.post('http://192.168.0.8:5000/api/stores/order', route.params.body)
            .then(response => {
                if (response.data.success) {
                    //소켓 연결
                    const socket = io(`http://192.168.0.8:5000`); //connet client-to-server

                    //데이터 전송
                    socket.emit("JoinRoom", data);
                    socket.emit("Input Order", data);

                    alert('주문에 성공했습니다.');
                } else {
                    alert('결제에 실패하였습니다.');
                }
            })

        navigation.reset({
            index: 0,
            routes: [{ name: 'Landing' }]
        });

        
    } else {
        navigation.goBack();
        alert('결제에 실패하였습니다.');
    }
  }

  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  const paymentData = route.params.data;

  return (
    <IMP.Payment
      userCode='imp54545514' // 가맹점 식별코드
      loading={<Loading />} // 로딩 컴포넌트
      data={paymentData}           // 결제 데이터
      callback={callback}   // 결제 종료 후 콜백
    />
  );
}

export default Payment;
