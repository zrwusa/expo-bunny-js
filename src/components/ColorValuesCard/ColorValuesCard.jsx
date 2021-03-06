import { Text, View } from '../UI';
import { CopyableText } from '../CopyableText';
import React from 'react';
import { makeStyles } from './styles';
import { Col, Row } from '../../containers';
import { useBunnyKit } from '../../hooks/bunny-kit';
export const ColorValuesCard = (props) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { item } = props;
    const styles = makeStyles(sizeLabor, themeLabor);
    return <View>
        <Row paddingVertical="m">
            <Col size={1}>
                <Text>Hex</Text>
            </Col>
            <Col size={2}>
                <Row>
                    <Col>
                        <CopyableText>{item.Hex}</CopyableText>
                    </Col>
                    <Col>
                        <CopyableText>{item.Hex.toLowerCase()}</CopyableText>
                    </Col>
                </Row>
            </Col>
            <Col size={1}>
                <View style={[styles.colorPanel, { backgroundColor: item.Hex }]}/>
            </Col>
        </Row>
        <Row paddingVertical="m">
            <Col size={1}>
                <Text>RGB</Text>
            </Col>
            <Col size={2}>
                <CopyableText>{item.RGB}</CopyableText>
            </Col>
            <Col size={1}>
                <View style={[styles.colorPanel, { backgroundColor: item.RGB }]}/>
            </Col>
        </Row>
        <Row paddingVertical="m">
            <Col size={1}>
                <Text>HSL</Text>
            </Col>
            <Col size={2}>
                <CopyableText>{item.HSL}</CopyableText>
            </Col>
            <Col size={1}>
                <View style={[styles.colorPanel, { backgroundColor: item.HSL }]}/>
            </Col>
        </Row>
    </View>;
};
