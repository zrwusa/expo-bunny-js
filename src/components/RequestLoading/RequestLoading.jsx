import React, { useEffect, useState } from 'react';
import { View } from '../UI';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from './styles';
import { ActivityIndicator } from 'react-native';
import { useBunnyKit } from '../../hooks/bunny-kit';
const RequestLoading = () => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { requestStatuses } = useSelector((store) => store.sysState);
    const [isShow, setIsShow] = useState(false);
    const styles = makeStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();
    useEffect(() => {
        const loadingRequests = requestStatuses.filter(item => item.status === 'LOADING');
        setIsShow(loadingRequests.length > 0);
    }, [JSON.stringify(requestStatuses)]);
    return (isShow
        ? <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        : null);
};
export default RequestLoading;
