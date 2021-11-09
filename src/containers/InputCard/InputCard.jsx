import { Text, View } from '../../components/UI';
import * as React from 'react';
import { useSizeLabor } from '../../providers/size-labor';
import { useThemeLabor } from '../../providers/theme-labor';
import { makeContainerStyles } from '../styles';
export const InputCard = ({ title, children }) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    return <View style={containerStyles.InputCard}>
        <Text style={containerStyles.InputCardTitle}>{title}</Text>
        {children}
    </View>;
};
