import { IcoMoon, Text, TextButton, View } from '../UI';
import * as React from 'react';
import { Col, Row } from '../../containers';
import { Divider } from '../Divider';
import { Keyboard, Platform } from 'react-native';
import { collectBizLogicResult, collectSysError } from '../../store/actions';
import { shortenTFunctionKey } from '../../providers/i18n-labor';
import { makeStyles } from './styles';
import { useAuthLabor } from '../../providers/auth-labor';
import { useDispatch } from 'react-redux';
import { navToReference } from '../../helpers';
import { useBunnyKit } from '../../hooks/bunny-kit';
export const LoginVector = ({ route, navigation }) => {
    const { sizeLabor, themeLabor, t, wp } = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.Auth');
    const styles = makeStyles(sizeLabor, themeLabor);
    const { authFunctions } = useAuthLabor();
    const dispatch = useDispatch();
    return <View>
        <Row style={styles.orRow}>
            <Col>
                <Divider />
            </Col>
            <Col style={styles.orCol}>
                <Text>Or</Text>
            </Col>
            <Col>
                <Divider />
            </Col>
        </Row>

        <Row style={styles.vectorRow}>
            <Col size={6}>
                <TextButton style={styles.vectorButton} onPress={async () => {
            Keyboard.dismiss();
            try {
                await authFunctions.dummyLogin();
                navToReference(route, navigation);
            }
            catch (e) {
                dispatch(collectSysError(e));
            }
        }}>
                    <IcoMoon name="drink" size={wp(24)} style={styles.icon}/>
                    <Text>{st(`dummyLogin`)}</Text>
                </TextButton>
            </Col>
            {Platform.OS !== 'web'
            ? <>
                        <Col size={6}>
                            <TextButton style={styles.vectorButton} onPress={async () => {
                    Keyboard.dismiss();
                    try {
                        const result = await authFunctions.facebookLogin(true, true);
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
                }}>
                                <IcoMoon name="facebook" style={styles.icon}/>
                                <Text>{st(`facebookLogin`)}</Text>
                            </TextButton>
                        </Col>
                        <Col size={6}>
                            <TextButton style={styles.vectorButton} onPress={async () => {
                    Keyboard.dismiss();
                    try {
                        const result = await authFunctions.googleLogin(true, true);
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
                }}>
                                <IcoMoon name="google" style={styles.icon}/>
                                <Text>{st(`googleLogin`)}</Text>
                            </TextButton>
                        </Col>
                    </>
            : <></>}
        </Row>
    </View>;
};
