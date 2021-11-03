import * as React from 'react';
import { Text } from '../../../components/UI';
import { shortenTFunctionKey } from '../../../providers/i18n-labor';
import { Card, getContainerStyles } from '../../../containers';
import { SafeAreaView } from 'react-native';
import { getStyles } from './styles';
import { useBunnyKit } from '../../../hooks/bunny-kit';
export function SocialMediaSettingsScreen({ route, navigation }) {
    const { sizeLabor, themeLabor, t } = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.SocialMediaSettings');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    return (<SafeAreaView style={containerStyles.Screen}>
            <Card title={st(`title`)}>
                <Text>{route.params.item}</Text>
            </Card>
        </SafeAreaView>);
}
