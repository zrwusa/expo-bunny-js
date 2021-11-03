import * as React from 'react';
import {ButtonTO, InButtonText, View} from '../../../../components/UI';
import {shortenTFunctionKey} from '../../../../providers/i18n-labor';
import {getContainerStyles} from '../../../../containers';
import {getSharedStyles} from '../../../../helpers';
import {useBunnyKit} from '../../../../hooks';

function NestedLv2HomeScreen({route, navigation}) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.NestedLv2Home');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return (<View style={[containerStyles.Screen, sharedStyles.centralized]}>
        <ButtonTO onPress={() => navigation.navigate('NestedLv2Settings', {itemlv2: '001'})}>
            <InButtonText>{st(`goToNestedLv2Settings`)}</InButtonText>
        </ButtonTO>
    </View>);
}

export default NestedLv2HomeScreen;
