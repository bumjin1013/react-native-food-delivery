import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise'; 
import ReduxThunk from 'redux-thunk';
import Reducer from './src/_reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from './src/hoc/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/login/LoginScreen';
import RegisterScreen from './src/components/register/RegisterScreen';
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
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


const Stack = createStackNavigator();


export default function App() {
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
        <Stack.Screen name="Login" component={Auth(LoginScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={Auth(RegisterScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="Landing" component={Auth(LandingScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="MyPage" component={Auth(MyPageScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="MyInfo" component={Auth(MyInfoScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="History" component={Auth(HistoryScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="Heart" component={Auth(HeartScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="DetailHistory" component={Auth(DetailHistoryScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="Review" component={Auth(ReviewScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="StoreList" component={Auth(StoreListScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="DetailStore" component={Auth(DetailStoreScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="MenuInfo" component={Auth(MenuInfoScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="Cart" component={Auth(CartScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="Order" component={Auth(OrderScreen, null)} options={{ headerShown: false}}/>
        <Stack.Screen name="Payment" component={Auth(Payment, null)} options={{ headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}
