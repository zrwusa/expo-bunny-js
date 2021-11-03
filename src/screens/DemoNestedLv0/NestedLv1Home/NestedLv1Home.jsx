import * as React from 'react';
import {ButtonTO, InButtonText, View} from '../../../components/UI';
import {shortenTFunctionKey} from '../../../providers/i18n-labor';
import {getContainerStyles} from '../../../containers';
import {getSharedStyles} from '../../../helpers';
import {useBunnyKit} from '../../../hooks/bunny-kit';

function NestedLv1HomeScreen({route, navigation}) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.NestedLv1Home');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return (<View style={[containerStyles.Screen, sharedStyles.centralized]}>
        <ButtonTO onPress={() => navigation.navigate('NestedLv1Settings', {item: '001'})}>
            <InButtonText>{st(`goToNestedLv1Settings`)}</InButtonText>
        </ButtonTO>
    </View>);
}

export default NestedLv1HomeScreen;
