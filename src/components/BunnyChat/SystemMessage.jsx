import React, {Component} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import {withBunnyKit} from '../../hooks';

const getStyles = (sizeLabor, themeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginTop: wp(5),
            marginBottom: wp(10),
        },
        text: {
            backgroundColor: colors.transparent,
            color: colors.text3,
            fontSize: wp(12),
            fontWeight: '300',
        },
    });
};

class SystemMessage extends Component {
    render() {
        const {currentMessage, systemMessageContainerStyle, systemMessageWrapperStyle, systemTextStyle,} = this.props;
        if (currentMessage) {
            const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
            const styles = getStyles(sizeLabor, themeLabor);
            return (<View style={[styles.container, systemMessageContainerStyle]}>
                <View style={systemMessageWrapperStyle}>
                    <Text style={[styles.text, systemTextStyle]}>{currentMessage.text}</Text>
                </View>
            </View>);
        }
        return null;
    }
}

SystemMessage.defaultProps = {
    currentMessage: undefined,
    systemMessageContainerStyle: {},
    systemMessageWrapperStyle: {},
    systemTextStyle: {},
};
export default withBunnyKit(SystemMessage);
