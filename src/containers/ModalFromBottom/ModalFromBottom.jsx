import Modal from 'react-native-modal';
import * as React from 'react';
import { useBunnyKit } from '../../hooks/bunny-kit';
import { makeStyles } from './styles';
export const ModalFromBottom = (props) => {
    const { modalProps, children, isVisible = false, onVisibleChanged } = props;
    const { sizeLabor, themeLabor } = useBunnyKit();
    const styles = makeStyles(sizeLabor, themeLabor);
    return <Modal isVisible={isVisible} onSwipeComplete={() => onVisibleChanged?.(false)} swipeDirection="down" animationIn="slideInUp" animationOut="slideOutDown" style={styles.modal} propagateSwipe={true} onBackdropPress={() => onVisibleChanged?.(false)} {...modalProps}>
        {children}
    </Modal>;
};
