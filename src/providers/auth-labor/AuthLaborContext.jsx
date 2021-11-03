import React from 'react';
import {apiAuth} from '../../helpers/auth-api';
import BunnyConstants, {EBLMsg} from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import {
    ANDROID_CLIENT_ID,
    ANDROID_CLIENT_ID_FOR_EXPO,
    FACEBOOK_APP_ID,
    IOS_CLIENT_ID,
    IOS_CLIENT_ID_FOR_EXPO
} from '@env';
import _, {identity, pickBy} from 'lodash';
import {blError, blSuccess} from '../../helpers';
import {EventRegister} from 'react-native-event-listeners';
import {firebase} from '../../firebase/firebase';
import * as Facebook from 'expo-facebook';
// import * as AppAuth from "expo-app-auth";
// // When configured correctly, URLSchemes should contain your REVERSED_CLIENT_ID
// const {URLSchemes} = AppAuth;
// console.log('---URLSchemes', URLSchemes)
const config = {
    loginAPIMethod: 'PUT',
    loginAPIPath: '/auth/login',
    signUpAPIMethod: 'POST',
    signUpAPIPath: '/auth/register',
    refreshAPIMethod: 'PUT',
    refreshAPIPath: '/auth/refresh',
    accessTokenValuePath: 'accessToken',
    accessTokenExpValuePath: 'accessTokenExp',
    refreshTokenValuePath: 'refreshToken',
    refreshTokenExpValuePath: 'refreshTokenExp',
    userValuePath: 'user',
    accessTokenPersistenceKey: BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY,
    accessTokenExpPersistenceKey: BunnyConstants.ACCESS_TOKEN_EXP_PERSISTENCE_KEY,
    refreshTokenPersistenceKey: BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY,
    refreshTokenExpPersistenceKey: BunnyConstants.REFRESH_TOKEN_EXP_PERSISTENCE_KEY,
    userPersistenceKey: BunnyConstants.USER_PERSISTENCE_KEY,
    storageType: 'LOCAL_STORAGE',
};
const {
    accessTokenPersistenceKey,
    accessTokenExpValuePath,
    accessTokenExpPersistenceKey,
    refreshTokenPersistenceKey,
    refreshTokenExpValuePath,
    refreshTokenExpPersistenceKey,
    userPersistenceKey,
    loginAPIPath,
    signUpAPIPath,
    accessTokenValuePath,
    refreshAPIMethod,
    loginAPIMethod,
    signUpAPIMethod,
    refreshAPIPath,
    refreshTokenValuePath,
    userValuePath
} = config;
const persistenceAuth = async ({accessToken, refreshToken, user, accessTokenExp, refreshTokenExp}) => {
    accessToken && await AsyncStorage.setItem(accessTokenPersistenceKey, accessToken);
    accessTokenExp && await AsyncStorage.setItem(accessTokenExpPersistenceKey, accessTokenExp);
    refreshTokenExp && await AsyncStorage.setItem(refreshTokenExpPersistenceKey, refreshTokenExp);
    refreshToken && await AsyncStorage.setItem(refreshTokenPersistenceKey, refreshToken);
    user && await AsyncStorage.setItem(userPersistenceKey, JSON.stringify(user));
};
const triggerLogin = async (result) => {
    const {success, data} = result;
    if (success) {
        await persistenceAuth(data);
    }
    EventRegister.emit('login', result);
    await checkIsLogin();
};
const loginOrSignUp = async (res) => {
    let result;
    if (!res) {
        result = blError(EBLMsg.NO_AUTH_API_RESPONDED);
        await triggerLogin(result);
        return result;
    }
    const {data} = res;
    if (!data) {
        result = blError(EBLMsg.NO_DATA_RESPONDED);
        await triggerLogin(result);
        return result;
    }
    const accessToken = _.get(data, accessTokenValuePath);
    const refreshToken = _.get(data, refreshTokenValuePath);
    const accessTokenExp = _.get(data, accessTokenExpValuePath);
    const refreshTokenExp = _.get(data, refreshTokenExpValuePath);
    const user = _.get(data, userValuePath);
    if (!(accessToken && refreshToken)) {
        result = blError(EBLMsg.NO_ACCESS_TOKEN_OR_REFRESH_TOKEN_RESPONDED);
        await triggerLogin(result);
        return result;
    }
    if (!user) {
        result = blError(EBLMsg.NO_USER_INFO_RESPONDED);
        await triggerLogin(result);
        return result;
    }
    result = blSuccess({accessToken, accessTokenExp, refreshToken, refreshTokenExp, user: {bunnyUser: user}});
    await triggerLogin(result);
    return result;
};
const bunnyLogin = async (params) => {
    const res = await apiAuth.request({
        method: loginAPIMethod,
        url: loginAPIPath,
        data: params
    });
    return await loginOrSignUp(res);
};
const bunnySignUp = async (params) => {
    const res = await apiAuth.request({method: signUpAPIMethod, url: signUpAPIPath, data: params});
    return await loginOrSignUp(res);
};
const bunnyRefreshAuth = async () => {
    const refreshToken = await AsyncStorage.getItem(refreshTokenPersistenceKey);
    apiAuth.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
    const res = await apiAuth.request({method: refreshAPIMethod, url: refreshAPIPath});
    let result;
    if (!res) {
        result = blError(EBLMsg.NO_AUTH_API_RESPONDED);
        EventRegister.emit('bunnyRefreshAuth', result);
        return result;
    }
    const {data} = res;
    if (!data) {
        result = blError(EBLMsg.NO_DATA_RESPONDED);
        EventRegister.emit('bunnyRefreshAuth', result);
        return result;
    }
    const accessToken = _.get(data, accessTokenValuePath);
    const accessTokenExp = _.get(data, accessTokenExpValuePath);
    if (!accessToken) {
        result = blError(EBLMsg.NO_ACCESS_TOKEN_RESPONDED);
        EventRegister.emit('bunnyRefreshAuth', result);
        return result;
    }
    await persistenceAuth({accessToken, accessTokenExp});
    result = blSuccess(accessToken);
    EventRegister.emit('bunnyRefreshAuth', result);
    return result;
};
const logOut = async (triggerType) => {
    const {success, message} = await removePersistenceAuth();
    let result;
    if (success) {
        result = blSuccess(true);
        EventRegister.emit('LogOut', result);
        await checkIsLogin();
        if (triggerType) {
            await authTrigger(triggerType);
        }
        return result;
    } else {
        result = blError(message);
        EventRegister.emit('LogOut', result);
        await checkIsLogin();
        return result;
    }
};
const dummyLogin = async () => {
    const accessToken = 'access_token_dummy';
    const refreshToken = 'refresh_token_dummy';
    const user = {
        email: 'dummy@dummy.com',
        nickname: 'dummy nickname'
    };
    const accessTokenExp = '3043008000000';
    const refreshTokenExp = '3043008000000';
    const result = blSuccess({
        accessToken,
        accessTokenExp,
        refreshToken,
        refreshTokenExp,
        user
    });
    await triggerLogin(result);
    return result;
};
const googleLogin = async (isFirebase, isStoreUser = true) => {
    const googleResponse = await Google.logInAsync({
        iosClientId: `${IOS_CLIENT_ID_FOR_EXPO}`,
        androidClientId: `${ANDROID_CLIENT_ID_FOR_EXPO}`,
        iosStandaloneAppClientId: `${IOS_CLIENT_ID}`,
        androidStandaloneAppClientId: `${ANDROID_CLIENT_ID}`,
    });
    let result;
    if (!googleResponse) {
        result = blError(EBLMsg.NO_GOOGLE_LOGIN_RESULT);
    }
    switch (googleResponse.type) {
        case 'cancel':
            result = blError(EBLMsg.GOOGLE_LOGIN_CANCELED);
            break;
        case 'success':
            const {idToken, accessToken, refreshToken, user} = googleResponse;
            if (!accessToken || !refreshToken) {
                result = blError(EBLMsg.GOOGLE_ACCESS_TOKEN_OR_REFRESH_TOKEN_NOT_EXISTS);
            }
            if (isFirebase) {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                const userCredential = await firebase.auth().signInWithCredential(credential);
                result = await firebaseLoginResult(userCredential, isStoreUser);
            } else {
                result = blSuccess({
                    accessToken,
                    refreshToken,
                    user: {googleUser: user},
                });
            }
            break;
        default:
            result = blError(EBLMsg.GOOGLE_LOGIN_RESULT_TYPE_INVALID);
            break;
    }
    await triggerLogin(result);
    return result;
};
const firebaseLoginResult = async (userCredential, isStoreUser = true) => {
    if (!userCredential || !userCredential.user) {
        return blError(EBLMsg.FIREBASE_INVALID_USER_CREDENTIAL);
    }
    let idToken, user;
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        idToken = await currentUser.getIdToken();
        // todo in web platform firebase return value confused, mess fields need toJSON
        user = currentUser.toJSON();
        let storedUser;
        if (isStoreUser) {
            storedUser = await storeUserInfo(userCredential);
        }
        return blSuccess({
            accessToken: idToken,
            refreshToken: user.refreshToken,
            // accessTokenExp: user.expirationTime.toString(),
            user: {firebaseUser: user, storedUser},
        });
    } else {
        return blError(EBLMsg.FIREBASE_INVALID_CURRENT_USER);
    }
};
const facebookLogin = async (isFirebase, isStoreUser = true) => {
    let result;
    await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
    });
    const facebookResponse = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
    });
    const {type} = facebookResponse;
    switch (type) {
        case 'cancel':
            result = blError(EBLMsg.FACEBOOK_LOGIN_CANCELED);
            break;
        case 'success':
            // @ts-ignore
            const {token} = facebookResponse;
            if (isFirebase) {
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                const userCredential = await firebase.auth().signInWithCredential(credential);
                result = await firebaseLoginResult(userCredential, isStoreUser);
            } else {
                // todo accessToken refreshToken not correct
                // Get the user's name using Facebook's Graph API
                const facebookGetMeResponse = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                const user = await facebookGetMeResponse.json();
                result = blSuccess({
                    accessToken: token,
                    user: {facebookUser: user},
                });
            }
            break;
        default:
            result = blError(EBLMsg.FACEBOOK_LOGIN_RESULT_TYPE_INVALID);
            break;
    }
    await triggerLogin(result);
    return result;
};
// firebase.auth().onAuthStateChanged((authUser) => {
//     console.log(authUser)
// });
// firebase.auth().onIdTokenChanged(token => {})
const firebaseEmailLogin = async (email, password, isStoreUser = true) => {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const result = await firebaseLoginResult(userCredential, isStoreUser);
    await triggerLogin(result);
    return result;
};
const storeUserInfo = async (userCredential) => {
    const user = userCredential.user?.toJSON();
    if (user) {
        const {displayName, email, phoneNumber, photoURL, providerId, uid} = user;
        const extractedUser = {
            displayName,
            email,
            phoneNumber,
            photoURL,
            providerId,
            uid
        };
        const cleanedExtractedUser = pickBy(extractedUser, identity);
        const usersRef = firebase.firestore().collection('users');
        await usersRef.doc(uid).set(cleanedExtractedUser, {merge: true});
        const userInfoSnapshot = await usersRef.doc(uid).get({source: 'server'});
        return userInfoSnapshot.data();
    } else {
        return;
    }
};
const firebaseEmailSignUp = async (email, password, isStoreUser = true) => {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const result = await firebaseLoginResult(userCredential, isStoreUser);
    await triggerLogin(result);
    return result;
};
const firebaseSendOTP = async (phoneInfoOptions, applicationVerifier) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(phoneInfoOptions,
        // @ts-ignore
        applicationVerifier);
    return blSuccess({verificationId});
};
const firebaseConfirmOTP = async (verificationId, verificationCode, isStoreUser = true) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    const userCredential = await firebase.auth().signInWithCredential(credential);
    const result = await firebaseLoginResult(userCredential, isStoreUser);
    await triggerLogin(result);
    return result;
};
const firebaseResetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
    return blSuccess(true);
};
const removePersistenceAuth = async (authParam) => {
    if (authParam && authParam.length > 0) {
        authParam.includes('accessToken') && await AsyncStorage.removeItem(accessTokenPersistenceKey);
        authParam.includes('accessTokenExp') && await AsyncStorage.removeItem(accessTokenExpPersistenceKey);
        authParam.includes('refreshToken') && await AsyncStorage.removeItem(refreshTokenPersistenceKey);
        authParam.includes('refreshTokenExp') && await AsyncStorage.removeItem(refreshTokenExpPersistenceKey);
        authParam.includes('user') && await AsyncStorage.removeItem(userPersistenceKey);
        return blSuccess(true);
    }
    await AsyncStorage.removeItem(accessTokenPersistenceKey);
    await AsyncStorage.removeItem(accessTokenExpPersistenceKey);
    await AsyncStorage.removeItem(refreshTokenExpPersistenceKey);
    await AsyncStorage.removeItem(refreshTokenPersistenceKey);
    await AsyncStorage.removeItem(userPersistenceKey);
    return blSuccess(true);
};
const getPersistenceAuth = async () => {
    const accessToken = await AsyncStorage.getItem(accessTokenPersistenceKey);
    const refreshToken = await AsyncStorage.getItem(refreshTokenPersistenceKey);
    const user = await AsyncStorage.getItem(userPersistenceKey);
    const accessTokenExp = await AsyncStorage.getItem(accessTokenExpPersistenceKey);
    const refreshTokenExp = await AsyncStorage.getItem(refreshTokenExpPersistenceKey);
    return {
        accessToken,
        accessTokenExp,
        refreshToken,
        refreshTokenExp,
        user: user ? JSON.parse(user) : undefined
    };
};
const authTrigger = (triggerType) => {
    EventRegister.emit('authTrigger', triggerType);
};
const checkTokenExp = () => {
    const itvID = setInterval(async () => {
        const refreshTokenExp = await AsyncStorage.getItem(refreshTokenExpPersistenceKey);
        const now = new Date();
        let exp = new Date(0);
        if (refreshTokenExp) {
            exp.setUTCSeconds(parseInt(refreshTokenExp));
            if (now > exp) {
                await logOut('AUTO');
                // clearInterval(itvID)
            }
        }
    }, 1000);
};
const checkIsLogin = async () => {
    const {accessToken} = await getPersistenceAuth();
    let isLogin = !!accessToken;
    EventRegister.emit('checkIsLogin', blSuccess(isLogin));
    return isLogin;
};
export const authLaborContext = {
    authFunctions: {
        bunnyLogin,
        googleLogin,
        facebookLogin,
        firebaseSendOTP,
        firebaseConfirmOTP,
        firebaseEmailLogin,
        firebaseEmailSignUp,
        firebaseResetPassword,
        dummyLogin,
        logOut,
        bunnySignUp,
        bunnyRefreshAuth,
        getPersistenceAuth,
        authTrigger
    },
    authResult: {
        isLogin: false,
        accessToken: '',
        refreshToken: '',
        user: {},
        triggerUUID: '',
        triggerType: undefined,
        triggerReference: ''
    }
};
export const AuthLaborContext = React.createContext(authLaborContext);
