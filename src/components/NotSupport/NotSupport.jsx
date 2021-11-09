import React from 'react';
import { makeStyles } from './styles';
import { Text, View } from 'react-native';
import { useBunnyKit } from '../../hooks/bunny-kit';
export const NotSupport = (props) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { text } = props;
    const styles = makeStyles(sizeLabor, themeLabor);
    return (<View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>);
};
