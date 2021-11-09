import { TouchableOpacity } from 'react-native';
import { useBunnyKit } from '../../hooks/bunny-kit';
import { getSharedStyles } from '../../helpers';
import { Col, Row } from '../../containers';
import { IcoMoon, Text } from '../UI';
import * as React from 'react';
let count = 0;
const counter = () => {
    return count++;
};
// Use React.memo as PureComponent instead of recompose.pure
export const InlineSelector = React.memo((props) => {
    // console.log('InlineSelector',counter())
    const { title, renderText, onPress, columns = [4, 8, 1], isShowChevron = true, titleStyle, textStyle, textAlign = 'flex-end', renderColumn2 } = props;
    const { sizeLabor, themeLabor, wp, t, colors, user } = useBunnyKit();
    const { sharedStyles } = getSharedStyles(sizeLabor, themeLabor);
    return <TouchableOpacity onPress={(e) => {
            onPress?.(e);
        }}>
        <Row style={{ padding: wp(10) }}>
            <Col size={columns[0]}>
                {title
            ? <Text style={[sharedStyles.text, titleStyle]}>{title}</Text>
            : null}
            </Col>
            <Col size={columns[1]} align={textAlign}>
                {renderColumn2
            ? renderColumn2()
            : <Text numberOfLines={1} style={[sharedStyles.text2, textStyle]}>
                            {renderText?.()}
                        </Text>}

            </Col>
            <Col size={columns[2]} align="flex-end">
                {isShowChevron
            ? <IcoMoon name="chevron-right1" color={colors.text2}/>
            : null}
            </Col>
        </Row>
    </TouchableOpacity>;
});
