// todo description this provider
import * as React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BunnyConstants from '../../constants/constants';
import * as localization from 'expo-localization';
import {I18nLaborContext} from './I18nLaborContext';
import i18next from './i18next';
import {Preparing} from '../../components';
import {useTranslation} from 'react-i18next';
import {shortenTFunctionKey} from './shorten-t-function-key';

function I18nLaborProvider(props) {
    const [isReady, setIsReady] = useState(false);
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, `sys`);
    const {children, i18n} = props;
    const i18nValue = i18n || i18next;
    useEffect(() => {
        const bootstrapAsync = async () => {
            const language = await AsyncStorage.getItem(BunnyConstants.LANGUAGE_TYPE_PERSISTENCE_KEY);
            const lang = language || localization.locale.substring(0, 2);
            lang && await i18nValue.changeLanguage(lang);
        };
        bootstrapAsync().then(() => {
            setIsReady(true);
        });
    }, []);
    return (isReady
        ? <I18nLaborContext.Provider value={i18next}>
            {children}
        </I18nLaborContext.Provider>
        : <Preparing text={st(`I18nProviderLoading`)}/>);
}

export {I18nLaborProvider};
