import * as React from 'react';
import { Text, View } from '../../components/UI';
import { makeContainerStyles, Row } from '../../containers';
import { AuthTopTabStack } from '../../navigation/stacks';
import { Image, SafeAreaView } from 'react-native';
import { makeStyles } from './styles';
import { LoginScreen } from './Login';
import { SignUpScreen } from './SignUp';
import { useTranslation } from 'react-i18next';
import { useBunnyKit } from '../../hooks/bunny-kit';
import { Checkbox } from 'react-native-paper';
export const AuthScreen = ({ route, navigation }) => {
    let isLoginScreen = true;
    if (route) {
        if (route.name && route.params && route.params.screen) {
            //todo tab change without change route.params
            isLoginScreen = (route.name === 'Auth' && route.params.screen === 'Login');
        }
    }
    const { sizeLabor, themeLabor, colors, wp, theme } = useBunnyKit();
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const styles = makeStyles(sizeLabor, themeLabor);
    const { t } = useTranslation();
    const [isBunnyAuth, setIsBunnyAuth] = React.useState(false);
    return (<SafeAreaView style={[containerStyles.Screen]}>
            <View style={[containerStyles.Screen]}>
                <View style={styles.header}>
                    <Image style={{ width: wp(300), height: wp(30) }} source={theme.dark
            ? require('../../assets/images/dadu-coach-dark.png')
            : require('../../assets/images/dadu-coach-light.png')}/>
                </View>
                <View style={[styles.content]}>
                    <AuthTopTabStack.Navigator style={{ borderRadius: wp(10) }} screenOptions={({ route }) => {
            return {
                title: t(`screens.${route.name}.title`),
            };
        }} tabBarOptions={{
            labelStyle: {
                fontSize: wp(15)
            },
            style: {
                backgroundColor: colors.background
            },
            activeTintColor: colors.secondary,
            inactiveTintColor: colors.text,
            indicatorStyle: {
                backgroundColor: colors.secondary,
                width: wp(80),
                marginLeft: wp(45),
            },
        }}>
                        <AuthTopTabStack.Screen name="Login">
                            {props => <LoginScreen {...props} isBunnyAuth={isBunnyAuth}/>}
                        </AuthTopTabStack.Screen>
                        <AuthTopTabStack.Screen name="SignUp">
                            {props => <SignUpScreen {...props} isBunnyAuth={isBunnyAuth}/>}
                        </AuthTopTabStack.Screen>
                    </AuthTopTabStack.Navigator>
                    <Row style={styles.authService}>
                        <Text>Bunny Auth</Text>
                        <Checkbox status={isBunnyAuth ? 'checked' : 'unchecked'} onPress={() => {
            setIsBunnyAuth(!isBunnyAuth);
        }}/>
                    </Row>
                </View>
                <View style={styles.footer}>
                </View>
            </View>
        </SafeAreaView>);
};
