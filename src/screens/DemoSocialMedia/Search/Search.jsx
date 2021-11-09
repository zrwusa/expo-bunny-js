import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { shortenTFunctionKey } from '../../../providers/i18n-labor';
import { makeContainerStyles } from '../../../containers';
import { makeStyles } from './styles';
import { Animated, Platform, SafeAreaView } from 'react-native';
import { uuid4 } from '@sentry/utils';
import { Masonry } from '../../../components/Masonry/Masonry';
import { FollowUpSearchBar } from '../../../components/FollowUpSearchBar';
import { useSelector } from 'react-redux';
import { isLoaded, useFirebase, useFirestoreConnect } from 'react-redux-firebase';
import config from '../../../config';
import { Preparing } from '../../../components/Preparing';
import { useBunnyKit } from '../../../hooks/bunny-kit';
export function SocialMediaSearchScreen({ route, navigation }) {
    const { sizeLabor, themeLabor, wp, t } = useBunnyKit();
    const firebase = useFirebase();
    const getSocialMediaImages = async () => {
        await firebase.watchEvent('value', 'socialMediaImages', 'socialMediaImages');
    };
    useFirestoreConnect([
        { collection: 'socialMediaImages' }
    ]);
    const socialMediaImages = useSelector((rootState) => rootState.firestoreState.ordered.socialMediaImages);
    const st = shortenTFunctionKey(t, 'screens.SocialMediaSearch');
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const styles = makeStyles(sizeLabor, themeLabor);
    const [MasonryData, setMasonryData] = useState([]);
    const memoizedSocialMediaImages = useMemo(() => {
        if (!socialMediaImages) {
            return [];
        }
        return socialMediaImages.map(item => item);
    }, [socialMediaImages]);
    useEffect(() => {
        getSocialMediaImages().then();
    }, []);
    useEffect(() => {
        if (!socialMediaImages) {
            return;
        }
        let column1 = [], column2 = [], column3 = [];
        let manyBricks = memoizedSocialMediaImages;
        for (let i = 0; i < 1; i++) {
            manyBricks = manyBricks.concat(memoizedSocialMediaImages);
        }
        let i = 0;
        while (i < manyBricks.length) {
            column1.push(manyBricks[i++]);
            if (i < manyBricks.length) {
                column2.push(manyBricks[i++]);
            }
            if (i < manyBricks.length) {
                column3.push(manyBricks[i++]);
            }
        }
        let newMasonryData = [];
        for (let i = 0; i < 10; i++) {
            newMasonryData.push({ id: uuid4(), column1, column2, column3 });
        }
        setMasonryData(newMasonryData);
    }, [socialMediaImages]);
    const imageWidth = wp(375 / 3 - 1);
    const getItem = function (data, index) {
        return data[index];
    };
    const getItemCount = function (data) {
        return data.length;
    };
    const [scrollYValue] = useState(new Animated.Value(0));
    const handleSearch = (key) => {
        let column1 = [], column2 = [], column3 = [];
        let manyBricks = [];
        for (let i = 0; i < 1; i++) {
            manyBricks = manyBricks.concat(memoizedSocialMediaImages.filter((brick) => {
                return brick.text.includes(key);
            }));
        }
        let i = 0;
        while (i < manyBricks.length) {
            column1.push(manyBricks[i++]);
            if (i < manyBricks.length) {
                column2.push(manyBricks[i++]);
            }
            if (i < manyBricks.length) {
                column3.push(manyBricks[i++]);
            }
        }
        let newMasonryData = [];
        for (let i = 0; i < 10; i++) {
            newMasonryData.push({ id: uuid4(), column1, column2, column3 });
        }
        setMasonryData(newMasonryData);
    };
    return (<SafeAreaView style={containerStyles.Screen}>
            <FollowUpSearchBar scrollYValue={scrollYValue} onSearch={handleSearch}/>
            {isLoaded(socialMediaImages) ?
            <Animated.FlatList data={MasonryData} renderItem={({ item }) => <Masonry data={item}/>} keyExtractor={item => item.id} initialNumToRender={1} windowSize={3} removeClippedSubviews={Platform.OS === 'android'} maxToRenderPerBatch={10} updateCellsBatchingPeriod={50} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYValue } } }], { useNativeDriver: config.useNativeDriver })}/>
            : <Preparing />}
        </SafeAreaView>);
}
