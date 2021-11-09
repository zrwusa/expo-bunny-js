import {InButtonText, LinearGradientButton, Text, TextButton, TextInputIcon, View} from '../UI';
import * as React from 'react';
import {useState} from 'react';
import {Col, InputCard, Row} from '../../containers';
import {collectBLResult, sysError} from '../../store/actions';
import {shortenTFunctionKey, useAuthLabor} from '../../providers';
import {getStyles} from './styles';
import {useDispatch} from 'react-redux';
import {LinearGradientIcon} from '../LinearGradientIcon';
import {blError} from '../../helpers';
import {useBunnyKit} from '../../hooks';

export const ForgotPassword = ({route, navigation, onSent, onCancel, email}) => {
    const {sizeLabor, themeLabor, t, wp} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const styles = getStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor();
    const dispatch = useDispatch();
    const [username, setUsername] = useState(email);
    const [isSent, setIsSent] = useState(false);
    const navToReference = () => {
        let referenceRoute;
        if (route.params && route.params.reference) {
            referenceRoute = JSON.parse(route.params.reference);
            navigation.navigate(referenceRoute);
        } else {
            navigation.navigate('Home');
        }
    };
    const navToLogin = () => {
        let referenceRoute;
        if (route.params && route.params.reference) {
            referenceRoute = JSON.parse(route.params.reference);
            navigation.navigate(referenceRoute);
        } else {
            navigation.navigate('Home');
        }
    };
    const forgotPassword = async () => {
        try {
            if (username) {
                const result = await authFunctions.firebaseResetPassword(username);
                if (result.success) {
                    setIsSent(true);
                } else {
                    dispatch(collectBLResult(result));
                }
            } else {
                dispatch(collectBLResult(blError('Please enter email')));
            }
        } catch (e) {
            dispatch(sysError(e));
        }
    };
    return <View style={styles.container}>
        <InputCard title={st(`email`)}>
            <TextInputIcon placeholder={t(`placeholders.email`)} textContentType="emailAddress" value={username}
                           onChangeText={(value) => {
                               setUsername(value);
                           }} autoCapitalize="none" renderIcon={() => {
                return <LinearGradientIcon name="mail" size={wp(20)}/>;
            }}/>
        </InputCard>
        <Row style={styles.row}>
            <Col size={6}>
                <LinearGradientButton onPress={forgotPassword}>
                    <InButtonText>{st(`resetPassword`)}</InButtonText>
                </LinearGradientButton>
            </Col>
            <Col size={1}/>
            <Col size={6}>
                <TextButton onPress={() => {
                    if (onCancel)
                        onCancel();
                }}>
                    <Text>{st(`goToLogin`)}</Text></TextButton>
            </Col>
        </Row>
        {isSent
            ? <>
                <Row style={styles.row}>
                    <Text>{st(`checkYourEmail`)}</Text>
                </Row>
                <Row style={styles.row}>
                    <LinearGradientButton onPress={() => {
                        if (onSent)
                            onSent();
                    }}><InButtonText>{st(`goToLogin`)}</InButtonText></LinearGradientButton>
                </Row>

            </>
            : null}
    </View>;
};
