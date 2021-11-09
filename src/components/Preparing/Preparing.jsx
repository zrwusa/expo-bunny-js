import React from 'react';
import { makeStyles } from './styles';
import { ActivityIndicator, Text, View } from 'react-native';
export const Preparing = (props) => {
    const { text = '' } = props;
    const styles = makeStyles();
    return (<View style={styles.container}>
            <ActivityIndicator size="large"/>
            {text
            ? <Text style={styles.text}>
                    {text}
                </Text>
            : null}
        </View>);
};
