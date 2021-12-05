import {
    LOGIN_USER,
    LOGIN_USER_TOKEN,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    UPDATE_ADDRESS,
    UPDATE_HISTORY_STATE,
    GET_HISTORY,
    CHANGE_QUANTITY,
    ADD_HEART_USER,
    DELETE_HEART_USER,
    ADD_REVIEW
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case LOGIN_USER_TOKEN:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state}
        case UPDATE_ADDRESS:
            return{
                ...state, 
                userData: {
                    ...state.userData,
                    address: action.payload.address
                }
            }
        case UPDATE_HISTORY_STATE:
            return{...state, userData: action.payload}
        case ADD_TO_CART:
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    cart: action.payload      
                }
            }
        case GET_CART_ITEMS:
            return { ...state, cartDetail: action.payload }
        case REMOVE_CART_ITEM:
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    cart: action.payload      
                }
            }
        case CHANGE_QUANTITY:
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    cart: action.payload      
                }
            }
        case GET_HISTORY:
            return{
                ...state, history: action.payload
            }
        case ADD_HEART_USER:
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    heart: action.payload.heart
            }
        }
        case DELETE_HEART_USER:
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    heart: action.payload.heart
            }
        }
        case ADD_REVIEW: 
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    history: action.payload.history
            }
        }
        default:
            return state;
    }
}