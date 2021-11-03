import * as React from 'react';
import { View } from '../../../components/UI';
import { shortenTFunctionKey } from '../../../providers/i18n-labor';
import { ScrollView } from 'react-native';
import { getContainerStyles } from '../../../containers';
import { getSharedStyles } from '../../../helpers';
import { useBunnyKit } from '../../../hooks/bunny-kit';
function ModalHomeScreen({ route, navigation }) {
    const { sizeLabor, themeLabor, t } = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.ModalHome');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const { sharedStyles } = getSharedStyles(sizeLabor, themeLabor);
    return (<ScrollView>
            <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            </View>
        </ScrollView>);
}
export default ModalHomeScreen;
