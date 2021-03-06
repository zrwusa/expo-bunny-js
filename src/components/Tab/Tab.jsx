import { Row } from '../../containers';
import { Text, View } from '../UI';
import * as React from 'react';
import { shortenTFunctionKey } from '../../providers/i18n-labor';
import { getSharedStyles } from '../../helpers';
import { makeStyles } from './styles';
import { useBunnyKit } from '../../hooks/bunny-kit';
export const Tab = ({ items, placeholder, value, onChange }) => {
    const { sizeLabor, themeLabor, t } = useBunnyKit();
    const st = shortenTFunctionKey(t, 'dictionary');
    const { sharedStyles } = getSharedStyles(sizeLabor, themeLabor);
    const {} = sharedStyles;
    const styles = makeStyles(sizeLabor, themeLabor);
    return <Row style={styles.tabs}>
        {items.map(item => {
            const activeIndicatorStyle = item === value ? styles.tabIndicatorActive : styles.tabIndicator;
            const activeTextStyle = item === value ? styles.tabTextActive : styles.tabText;
            return <View style={styles.tab} key={item}>
                    <Text style={[styles.tabText, activeTextStyle]} onPress={() => onChange(item)}>{st(item)}</Text>
                    <View style={[styles.tabIndicator, activeIndicatorStyle]}/>
                </View>;
        })}
    </Row>;
};
