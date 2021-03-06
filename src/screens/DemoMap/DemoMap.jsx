import React, { Component, createRef } from 'react';
import { Animated } from 'react-native';
import { Image, Text, TouchableOpacity, View } from '../../components/UI';
import * as Location from 'expo-location';
import { collectSysError, getNearbyFilms, restoreRegion } from '../../store/actions';
import { connect } from 'react-redux';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import BunnyConstants from '../../constants/constants';
import makeStyles, { getCardSize } from './styles';
import { makeContainerStyles } from '../../containers';
import config from '../../config';
import { withBunnyKit } from '../../hooks/bunny-kit';
const { Marker } = MapView; // react-native-maps under typescript bug trick
const mapStateToProps = (rootState) => ({ ...rootState.demoMapState });
const mapDispatchToProps = (dispatch) => ({
    getNearbyFilms: async (reqParams) => dispatch(getNearbyFilms(reqParams)),
    restoreRegion: (region) => dispatch(restoreRegion(region)),
    collectSysError: (err) => dispatch(collectSysError(err))
});
class DemoMapScreen extends Component {
    constructor(props) {
        super(props);
        this.mapView = createRef();
        this.index = 0;
        this.regionTimeout = setTimeout(() => '', 1000);
        this.animation = new Animated.Value(0);
        this.getCurLocation = this.getCurLocation.bind(this);
        this.onMarkerPress = this.onMarkerPress.bind(this);
        // this.onMapviewMarkerPress = this.onMapviewMarkerPress.bind(this);
    }
    async getCurLocation() {
        try {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            this.props.restoreRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                ...BunnyConstants.latLngDeltaGrace
            });
        }
        catch (e) {
            this.props.collectSysError(e);
        }
    }
    async componentDidMount() {
        const { bunnyKit } = this.props;
        const { sizeLabor, themeLabor, wp } = bunnyKit;
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / getCardSize(sizeLabor, themeLabor).width + wp(0.3)); // animate 30% away from landing on the next item
            if (index >= this.props.demoNearbyFilms.length) {
                index = this.props.demoNearbyFilms.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.props.demoNearbyFilms[index];
                    this.mapView.current && this.mapView.current.animateToRegion({
                        ...coordinate,
                        latitudeDelta: this.props.region.latitudeDelta,
                        longitudeDelta: this.props.region.longitudeDelta,
                    }, wp(350));
                }
            }, 10);
        });
        // await this.getCurLocation();
        await this.props.getNearbyFilms({
            latitude: this.props.region.latitude,
            longitude: this.props.region.longitude,
            ...BunnyConstants.latLngDeltaGrace
        });
    }
    onMarkerPress(marker) {
        const mapView = this.mapView.current;
        mapView && mapView.animateToRegion({
            latitude: marker.coordinate.latitude,
            longitude: marker.coordinate.longitude,
            ...BunnyConstants.latLngDeltaGrace
        });
    }
    render() {
        const { bunnyKit } = this.props;
        const { sizeLabor, themeLabor, wp } = bunnyKit;
        const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
        const styles = makeStyles(sizeLabor, themeLabor);
        const { width } = getCardSize(sizeLabor, themeLabor);
        const interpolations = this.props.demoNearbyFilms.map((marker, index) => {
            const inputRange = [
                (index - 1) * width,
                index * width,
                ((index + 1) * width),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: 'clamp',
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: 'clamp',
            });
            return { scale, opacity };
        });
        return (<View style={containerStyles.Screen}>
                <MapView ref={this.mapView} initialRegion={this.props.region} style={styles.mapView} provider={PROVIDER_DEFAULT}>
                    {this.props.demoNearbyFilms.length > 0 && this.props.demoNearbyFilms.map((marker, index) => {
                const scaleStyle = {
                    transform: [
                        {
                            scale: interpolations[index].scale,
                        },
                    ],
                };
                const opacityStyle = {
                    opacity: interpolations[index].opacity,
                };
                return (<Marker key={index} coordinate={marker.coordinate} onPress={() => {
                        this.onMarkerPress(marker);
                    }}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]}/>
                                    <View style={styles.marker}/>
                                </Animated.View>
                            </Marker>);
            })}
                </MapView>
                <Animated.ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} snapToInterval={width} onScroll={Animated.event([{
                    nativeEvent: {
                        contentOffset: {
                            x: this.animation,
                        },
                    }
                }], { useNativeDriver: config.useNativeDriver })} style={styles.scrollView} contentContainerStyle={styles.endPadding}>
                    {this.props.demoNearbyFilms.length > 0 && this.props.demoNearbyFilms.map((marker, index) => (<TouchableOpacity onPress={() => {
                    this.onMarkerPress(marker);
                }} key={marker.id}>
                            <View style={styles.card}>
                                <Image source={marker.image} style={styles.cardImage} resizeMode="cover"/>
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardTitle}>{marker.title}</Text>
                                    <Text numberOfLines={1} style={styles.cardDescription}>
                                        {marker.description}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>))}
                </Animated.ScrollView>
            </View>);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withBunnyKit(DemoMapScreen));
