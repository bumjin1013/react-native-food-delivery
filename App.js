import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise'; 
import ReduxThunk from 'redux-thunk';
import Reducer from './src/_reducers'
import Auth from './src/hoc/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/login/LoginScreen';
import FirstRegisterScreen from './src/components/register/FirstRegisterScreen';
import SecondRegisterScreen from './src/components/register/SecondRegisterScreen';
import LandingScreen from './src/components/landing/LandingScreen';
import MyPageScreen from './src/components/myPage/MyPageScreen';
import HistoryScreen from './src/components/history/HistoryScreen';
import DetailHistoryScreen from './src/components/history/detailHistory/DetailHistoryScreen';
import ReviewScreen from './src/components/review/ReviewScreen';
import StoreListScreen from './src/components/storeList/StoreListScreen';
import DetailStoreScreen from './src/components/detailStore/DetailStoreScreen';
import MenuInfoScreen from './src/components/detailStore/menuInfo/MenuInfoScreen';
import CartScreen from './src/components/cart/CartScreen';
import OrderScreen from './src/components/order/OrderScreen';
import Payment from './src/components/payment/Payment';
import HeartScreen from './src/components/heart/HeartScreen';
import MyInfoScreen from './src/components/myInfo/MyInfoScreen';
import LoadingScreen from './src/components/loading/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }
  

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      storeData('@expo_Token', token);
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
 

  return (
    <Provider
    store={createStoreWithMiddleware(
        Reducer,
        compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )}
>
      <NavigationContainer>
      <Stack.Navigator initalRouteName="Main">
        <Stack.Screen name="Loading" component={Auth(LoadingScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="Login" component={Auth(LoginScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="FirstRegister" component={Auth(FirstRegisterScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="SecondRegister" component={Auth(SecondRegisterScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="Landing" component={Auth(LandingScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="MyPage" component={Auth(MyPageScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="MyInfo" component={Auth(MyInfoScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="History" component={Auth(HistoryScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="Heart" component={Auth(HeartScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="DetailHistory" component={Auth(DetailHistoryScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="Review" component={Auth(ReviewScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="StoreList" component={Auth(StoreListScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="DetailStore" component={Auth(DetailStoreScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="MenuInfo" component={Auth(MenuInfoScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="Cart" component={Auth(CartScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="Order" component={Auth(OrderScreen, true)} options={{ headerShown: false}}/>
        <Stack.Screen name="Payment" component={Auth(Payment, true)} options={{ headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  console.log('register()');
  let token;
  if (Constants.isDevice) {
    const existingStatus = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus.status;
    if (existingStatus.status !== 'granted') {
      console.log('existingStatus.status !== graned')
      const { status } = await Notifications.requestPermissionsAsync();
      console.log('status', status.status);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('finalStatus.status !== graned')
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
