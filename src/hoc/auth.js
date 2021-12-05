/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';


export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const navigation = useNavigation();

        let user = useSelector(state => state.user && state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(auth()).then(response => {
                //Not Loggined in Status 
                if (!response.payload.isAuth) {
                    if (option) {
                        navigation.reset('Login')
                    }
                    //Loggined in Status 
                } else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !response.payload.isAdmin) {
                        navigation.reset('Login')
                    }
                    //Logged in Status, but Try to go into log in page 
                    else {
                        if (option === false) {
                            navigation.reset('Landing')
                        }
                    }
                }
            })

        }, [])
        
        return (
            <SpecificComponent {...props} user={user&&user} />
        )
    }
    return AuthenticationCheck
}


