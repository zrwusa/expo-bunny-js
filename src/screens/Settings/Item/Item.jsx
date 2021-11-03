import * as React from 'react';
import {getStyles} from './styles';
import {Text, View} from '../../../components/UI';
import {useSizeLabor} from '../../../providers';
import {useThemeLabor} from '../../../providers';
import {Col} from '../../../containers';
import {getSharedStyles} from '../../../helpers';

export default function SettingsItem({label, renderPicker}) {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return (<View style={styles.item}>
        <Col size={2}>
            <Text style={sharedStyles.label}>{label}</Text>
        </Col>
        <Col size={1}>
            {renderPicker ? renderPicker() : null}
        </Col>

    </View>);
}
