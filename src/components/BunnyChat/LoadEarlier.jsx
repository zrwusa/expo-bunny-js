import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { withBunnyKit } from '../../hooks/bunny-kit';
const makeStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    const { theme: { colors } } = themeLabor;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            marginTop: wp(5),
            marginBottom: wp(10),
        },
        wrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background,
            borderRadius: wp(15),
            height: wp(30),
            paddingLeft: wp(10),
            paddingRight: wp(10),
        },
        text: {
            backgroundColor: colors.transparent,
            color: colors.text3,
            fontSize: wp(12),
        },
        activityIndicator: {
            marginTop: Platform.select({
                ios: wp(-14),
                android: wp(-16),
                default: wp(-15),
            }),
        },
    });
};
class LoadEarlier extends React.Component {
    renderLoading() {
        const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        if (this.props.isLoadingEarlier === false) {
            return (<Text style={[styles.text, this.props.loadEarlierTextStyle]}>
                    {this.props.loadEarlierLabel}
                </Text>);
        }
        return (<View>
                <Text style={[styles.text, this.props.loadEarlierTextStyle, { opacity: 0 }]}>
                    {this.props.loadEarlierLabel}
                </Text>
                <ActivityIndicator color={this.props.activityIndicatorColor} size={this.props.activityIndicatorSize} style={[styles.activityIndicator, this.props.activityIndicatorStyle]}/>
            </View>);
    }
    render() {
        const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (<TouchableOpacity style={[styles.container, this.props.loadEarlierContainerStyle]} onPress={() => {
                if (this.props.onLoadEarlier) {
                    this.props.onLoadEarlier();
                }
            }} disabled={this.props.isLoadingEarlier === true} 
        // @ts-ignore
        accessibilityTraits="button">
                <View style={[styles.wrapper, this.props.loadEarlierWrapperStyle]}>
                    {this.renderLoading()}
                </View>
            </TouchableOpacity>);
    }
}
LoadEarlier.defaultProps = {
    onLoadEarlier: () => {
    },
    isLoadingEarlier: false,
    loadEarlierLabel: 'Load earlier messages',
    loadEarlierContainerStyle: {},
    loadEarlierWrapperStyle: {},
    loadEarlierTextStyle: {},
    activityIndicatorStyle: {},
    activityIndicatorColor: 'white',
    activityIndicatorSize: 'small',
};
export default withBunnyKit(LoadEarlier);
