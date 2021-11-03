import {Text, View} from '../../components/UI';
import * as React from 'react';
import {useSizeLabor, useThemeLabor} from '../../providers';
import {getContainerStyles} from '../styles';

export function InputCard({title, children}) {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    return <View style={containerStyles.InputCard}>
        <Text style={containerStyles.InputCardTitle}>{title}</Text>
        {children}
    </View>;
}
