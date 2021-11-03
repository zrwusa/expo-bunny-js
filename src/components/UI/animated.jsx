import {Animated, FlatList} from 'react-native';

export const AnimatedFlatList = () => {
    return Animated.createAnimatedComponent(FlatList);
};
