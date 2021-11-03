import Modal from 'react-native-modal';
import * as React from 'react';
import {useBunnyKit} from '../../hooks';
import {getStyles} from './styles';

export const ModalFromRight = (props) => {
    const {modalProps, children, isVisible = false, onVisibleChanged} = props;
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    return <Modal isVisible={isVisible} onSwipeComplete={() => onVisibleChanged?.(false)} swipeDirection="right"
                  animationIn="slideInRight" animationOut="slideOutRight" style={styles.modal} propagateSwipe={true}
                  onBackdropPress={() => onVisibleChanged?.(false)} {...modalProps}>
        {children}
    </Modal>;
};
