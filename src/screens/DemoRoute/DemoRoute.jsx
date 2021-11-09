import * as React from 'react';
import { Text, View } from '../../components/UI';
import { makeStyles } from './styles';
import { shortenTFunctionKey } from '../../providers/i18n-labor';
import { makeContainerStyles } from '../../containers';
import { getSharedStyles } from '../../helpers';
import { useBunnyKit } from '../../hooks/bunny-kit';
function DemoRouteScreen(props) {
    const { sizeLabor, themeLabor, t } = useBunnyKit();
    const { id, isHuman, sort } = props.route.params;
    const st = shortenTFunctionKey(t, 'screens.DemoRoute');
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const { sharedStyles } = getSharedStyles(sizeLabor, themeLabor);
    const styles = makeStyles(sizeLabor, themeLabor);
    return (<View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <View style={styles.wrap}>
                <Text style={sharedStyles.paragraph}>
                    {st(`paramId`)}{id}{'\n'}
                    {st(`typeofId`)}{typeof id}{'\n'}
                    {st(`paramIsHuman`)}{isHuman.toString()}{'\n'}
                    {st(`typeofIsHuman`)}{typeof isHuman}{'\n'}
                    {st(`paramSort`)}{sort}{'\n'}
                    {st(`typeofSort`)}{typeof sort}{'\n'}
                </Text>
            </View>
        </View>);
}
export default DemoRouteScreen;
