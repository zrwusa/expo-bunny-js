import React from 'react';
import { SafeAreaView, View, VirtualizedList } from 'react-native';
import { Text } from '../../../components/UI';
import { makeStyles } from './styles';
import { useThemeLabor } from '../../../providers/theme-labor';
import { makeContainerStyles } from '../../../containers';
import { useBunnyKit } from '../../../hooks/bunny-kit';
function RNVirtualizedListScreen() {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const styles = makeStyles(sizeLabor, themeLabor);
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const virtualizedListData = [];
    const getVirtualizedListItem = (data, index) => {
        return {
            id: Math.random().toString(12).substring(0),
            title: `Item ${index + 1}`,
        };
    };
    const getVirtualizedListItemCount = (data) => {
        return 1000;
    };
    const VirtualizedListItem = ({ title }) => {
        const { colors } = useThemeLabor().theme;
        return (<View style={{
                backgroundColor: colors.background,
                height: 150,
                justifyContent: 'center',
                marginVertical: 2,
                marginHorizontal: 2,
                padding: 20,
            }}>
                <Text style={styles.title}>{title}</Text>
            </View>);
    };
    return (<SafeAreaView style={containerStyles.Screen}>
            <VirtualizedList data={virtualizedListData} initialNumToRender={6} renderItem={({ item }) => <VirtualizedListItem title={item.title} id={item.id}/>} keyExtractor={item => item.id} getItemCount={getVirtualizedListItemCount} getItem={getVirtualizedListItem}/>
        </SafeAreaView>);
}
export default RNVirtualizedListScreen;
