import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View } from '../../components/UI';
import { shortenTFunctionKey } from '../../providers/i18n-labor';
import { makeContainerStyles } from '../../containers';
import { Animated, SafeAreaView } from 'react-native';
import { randomText, wait } from '../../utils';
import { FollowUpSearchBar } from '../../components/FollowUpSearchBar';
import { makeStyles } from './styles';
import { collectBizLogicResult } from '../../store/actions';
import { bizLogicError } from '../../helpers';
import config from '../../config';
import { useBunnyKit } from '../../hooks/bunny-kit';
export function DemoSearchScreen({ route, navigation }) {
    const { sizeLabor, themeLabor, t } = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.DemoSearch');
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const styles = makeStyles(sizeLabor, themeLabor);
    const [scrollYValue] = useState(new Animated.Value(0));
    const [data, setData] = useState([]);
    const getDummyData = () => {
        const dummyData = [];
        for (let i = 0; i < 10000; i++) {
            dummyData.push({ id: i, text: randomText(30) });
        }
        return dummyData;
    };
    useEffect(() => {
    }, []);
    const mockSearch = async (keywordText) => {
        return new Promise((resolve, reject) => {
            wait(1000).then(() => {
                const dummyData = getDummyData();
                const result = dummyData.filter((item) => {
                    return item.text.includes(keywordText);
                });
                return Math.random() > 0.1 ? resolve(result) : reject(new Error('error when searching'));
            });
        });
    };
    return (<SafeAreaView style={containerStyles.Screen}>
            <FollowUpSearchBar scrollYValue={scrollYValue} defaultKeywords={[]} onSearch={async (searchText) => {
            try {
                const searchResult = await mockSearch(searchText);
                setData(searchResult);
            }
            catch (e) {
                collectBizLogicResult(bizLogicError(e));
            }
        }}/>
            <Animated.FlatList data={data} showsVerticalScrollIndicator={false} style={styles.list} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYValue } } }], { useNativeDriver: config.useNativeDriver })} keyExtractor={item => item.id.toString()} contentInsetAdjustmentBehavior="automatic" renderItem={({ item }) => <View style={styles.item}>
                    <View style={styles.itemBox}>
                        <Text style={styles.itemText}>{item.id}</Text>
                        <Text>{item.text}</Text>
                    </View>
                </View>}/>
            {/*<Animated.ScrollView*/}
            {/*    showsVerticalScrollIndicator={false}*/}
            {/*    style={styles.list}*/}
            {/*    onScroll={Animated.event(*/}
            {/*        [{nativeEvent: {contentOffset: {y: scrollYValue}}}],*/}
            {/*        {useNativeDriver: true},*/}
            {/*    )}*/}
            {/*    contentInsetAdjustmentBehavior="automatic">*/}
            {/*    {data.map(item => <View key={uuidV4()}*/}
            {/*                            style={{height: 100, width: 375, padding: 10}}>*/}
            {/*        <View style={{flexDirection: 'row'}}>*/}
            {/*            <Text style={{marginRight: 10}}>{item.id}</Text>*/}
            {/*            <Text>{item.text}</Text>*/}
            {/*        </View>*/}
            {/*    </View>)}*/}
            {/*</Animated.ScrollView>*/}
        </SafeAreaView>);
}
