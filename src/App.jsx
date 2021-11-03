import React, {useMemo} from 'react';
import {Platform, StatusBar, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {AppearanceProvider} from 'react-native-appearance';
import BunnyConstants from './constants/constants';
import {restoreIsReady, restoreNavInitialState, sysError} from './store/actions';
import {ThemeLaborContext, ThemeLaborProvider} from './providers';
import {Preparing} from './components';
import {useTranslation} from 'react-i18next';
import {RequestProvider} from './providers';
import {loadAsync} from 'expo-font';
import icoMoonFont from './assets/fonts/icomoon/fonts/icomoon.ttf';
import {SizeLaborProvider} from './providers';
import NavigatorTree from './navigation/NavigatorTree';
import {AuthLaborProvider} from './providers';
import {I18nLaborProvider} from './providers';
import RequestLoading from './components/RequestLoading';
import BLToast from './components/BLToast';
import Sys from './components/Sys';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
    const dispatch = useDispatch();
    const {isReady, navInitialState} = useSelector((rootState) => rootState.sysState);
    const {t} = useTranslation();
    const navInitialStateMemorized = useMemo(() => {
        return navInitialState;
    }, [navInitialState]);
    React.useEffect(() => {
        let mockPreparingTimer = BunnyConstants.fooTimeout;
        const bootstrapAsync = async () => {
            dispatch(restoreIsReady({isReady: false}));
            try {
                await loadAsync({IcoMoon: icoMoonFont});
            } catch (err) {
                dispatch(sysError(err.toString()));
            } finally {
                try {
                    if (Platform.OS !== 'web') {
                        const savedState = await AsyncStorage.getItem(BunnyConstants.NAV_STATE_PERSISTENCE_KEY);
                        const state = savedState ? JSON.parse(savedState) : undefined;
                        if (state !== undefined) {
                            dispatch(restoreNavInitialState({navInitialState: state}));
                        }
                    }
                } catch (err) {
                    dispatch(sysError(err.toString()));
                } finally {
                    dispatch(restoreIsReady({isReady: true}));
                }
            }
        };
        bootstrapAsync()
            .catch((err) => dispatch(sysError(err.toString())));
        return () => clearTimeout(mockPreparingTimer);
    }, []);
    return isReady
        ? (
            // Context or HOC(with*) or Hooks(use*)
            // Providers are Prepared for using the Context method to pass likely global props, the follow-up recommends HOCs, most recommend Hooks(explicitly dependencies vs HOCs) in the latest React version
            <AppearanceProvider>
                <I18nLaborProvider>
                    <SizeLaborProvider>
                        <RequestProvider>
                            <AuthLaborProvider>
                                <SafeAreaProvider>
                                    <ThemeLaborProvider>
                                        <ThemeLaborContext.Consumer>{({theme}) => {
                                            return <>
                                                <StatusBar
                                                    backgroundColor={Platform.OS === 'android' ? theme.colors.background : ''}
                                                    barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
                                                <NavigatorTree theme={theme}
                                                               fallback={<Text>{t(`sys.navigationFallback`)}</Text>}
                                                               initialState={navInitialStateMemorized}
                                                               onStateChange={(state) => AsyncStorage.setItem(BunnyConstants.NAV_STATE_PERSISTENCE_KEY, JSON.stringify(state))}/>
                                                <Sys/>
                                                <RequestLoading/>
                                                <BLToast/>
                                            </>;
                                        }}
                                        </ThemeLaborContext.Consumer>
                                    </ThemeLaborProvider>
                                </SafeAreaProvider>
                            </AuthLaborProvider>
                        </RequestProvider>
                    </SizeLaborProvider>
                </I18nLaborProvider>
            </AppearanceProvider>)
        : (<Preparing/>);
}

export default App;
