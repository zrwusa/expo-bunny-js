import { InButtonText, LinearGradientButton, TextInputIcon, View } from '../../components/UI';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { shortenTFunctionKey } from '../../providers/i18n-labor';
import { InputCard, makeContainerStyles, Row } from '../../containers';
import { useAuthLabor } from '../../providers/auth-labor';
import { LinearGradientIcon } from '../../components/LinearGradientIcon';
import { Keyboard } from 'react-native';
import { collectBizLogicResult, collectSysError } from '../../store/actions';
import { LoginVector } from '../../components/LoginVector';
import { getSharedStyles, navToReference } from '../../helpers';
import { makeStyles } from './styles';
import { useBunnyKit } from '../../hooks/bunny-kit';
export function SignUpScreen({ route, navigation, isBunnyAuth }) {
    const { sizeLabor, themeLabor, colors, wp, theme, t, ms } = useBunnyKit();
    const dispatch = useDispatch();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const { sharedStyles } = getSharedStyles(sizeLabor, themeLabor);
    const styles = makeStyles(sizeLabor, themeLabor);
    const { authFunctions } = useAuthLabor();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const firebaseEmailSignUp = async () => {
        Keyboard.dismiss();
        try {
            const result = await authFunctions.firebaseEmailSignUp(username, password, true);
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
    const bunnySignUp = async () => {
        Keyboard.dismiss();
        try {
            const result = await authFunctions.bunnySignUp({ username: username, password: password });
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
    const handleSignUp = async () => {
        isBunnyAuth ? await bunnySignUp() : await firebaseEmailSignUp();
    };
    return <View style={containerStyles.Screen}>
        <View style={styles.loginOrSignUpContainer}>
            <InputCard title={st(`email`)}>
                <TextInputIcon placeholder={t('placeholders.email')} textContentType="emailAddress" value={username} onChangeText={(value) => {
            setUsername(value);
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
            <>
                <Row style={{ marginTop: ms.sp.l }}>
                    <LinearGradientButton onPress={handleSignUp}><InButtonText>{st(`signUp`)}</InButtonText></LinearGradientButton>
                </Row>
                <LoginVector route={route} navigation={navigation}/>
            </>
        </View>

    </View>;
}
