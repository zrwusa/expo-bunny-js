import { InButtonText, LinearGradientButton, Text, TextInputIcon, View } from '../../components/UI';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { shortenTFunctionKey } from '../../providers/i18n-labor';
import { InputCard, makeContainerStyles, Row } from '../../containers';
import { useAuthLabor } from '../../providers/auth-labor';
import { LinearGradientIcon } from '../../components/LinearGradientIcon';
import { Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { collectBizLogicResult, collectSysError } from '../../store/actions';
import { makeStyles } from './styles';
import { LoginVector } from '../../components/LoginVector';
import { FirebasePhoneLogin } from '../../components/FirebasePhoneLogin';
import { Tab } from '../../components/Tab';
import { ForgotPassword } from '../../components/ForgotPassword';
import { navToReference } from '../../helpers';
import { useBunnyKit } from '../../hooks/bunny-kit';
export function LoginScreen({ route, navigation, isBunnyAuth }) {
    const { sizeLabor, themeLabor, wp, t, ms } = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const styles = makeStyles(sizeLabor, themeLabor);
    const { authFunctions } = useAuthLabor();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const firebaseLoginMethods = ['email', 'phone'];
    const [loginMethod, setLoginMethod] = useState('email');
    const [isForgot, setIsForgot] = useState(false);
    const firebaseEmailLogin = async () => {
        Keyboard.dismiss();
        // todo can not use await to catch error,wait for Firebase to resolve this bug
        try {
            const result = await authFunctions.firebaseEmailLogin(email, password, true);
            if (result.success) {
                navToReference(route, navigation);
            }
            else {
                dispatch(collectBizLogicResult(result));
            }
        }
        catch (e) {
            dispatch(collectSysError(e));
        }
    };
    const bunnyLogin = async () => {
        Keyboard.dismiss();
        try {
            const result = await authFunctions.bunnyLogin({ username: email, password });
            if (result.success) {
                navToReference(route, navigation);
            }
            else {
                dispatch(collectBizLogicResult(result));
            }
        }
        catch (e) {
            dispatch(collectSysError(e));
        }
    };
    const handleLogin = async () => {
        isBunnyAuth ? await bunnyLogin() : await firebaseEmailLogin();
    };
    return <View style={[containerStyles.Screen]}>
        <ScrollView style={styles.loginOrSignUpContainer}>
            <Tab items={firebaseLoginMethods} value={loginMethod} onChange={(item) => {
            setLoginMethod(item);
        }}/>
            {loginMethod === 'email' && !isForgot
            ?
                <View>
                    <InputCard title={st(`email`)}>
                        <TextInputIcon placeholder={t(`placeholders.email`)} textContentType="emailAddress" value={email} onChangeText={(value) => {
                        setEmail(value);
                    }} renderIcon={() => {
                        return <LinearGradientIcon name="mail" size={wp(20)}/>;
                    }}/>
                    </InputCard>
                    <InputCard title={st(`password`)}>
                        <TextInputIcon placeholder={t(`placeholders.password`)} textContentType="password" value={password} onChangeText={(value) => {
                        setPassword(value);
                    }} secureTextEntry renderIcon={() => {
                        return <LinearGradientIcon name="lock" size={wp(22)}/>;
                    }}/>
                    </InputCard>
                    <Row style={{ marginTop: ms.sp.l, justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                        setIsForgot(true);
                    }}><Text>Forgot password?</Text></TouchableOpacity>
                    </Row>
                    <Row style={{ marginTop: ms.sp.l }}>
                        <LinearGradientButton onPress={handleLogin}>
                            <InButtonText>{st(`login`)}</InButtonText>
                        </LinearGradientButton>
                    </Row>
                </View>
            : null}
            {loginMethod === 'phone'
            ? <FirebasePhoneLogin route={route} navigation={navigation}/>
            : null}
            {loginMethod === 'email' && isForgot
            ? <ForgotPassword route={route} navigation={navigation} onSent={() => {
                    setIsForgot(false);
                }} onCancel={() => {
                    setIsForgot(false);
                }} email={email}/>
            : null}
            <LoginVector route={route} navigation={navigation}/>
        </ScrollView>
    </View>;
}
