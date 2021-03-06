import { ButtonTO, IcoMoon, InButtonText, Text, TextButton, View } from '../UI';
import { Col, Row } from '../../containers';
import * as React from 'react';
import { useState } from 'react';
import { useBunnyKit } from '../../hooks/bunny-kit';
import { getSharedStyles } from '../../helpers';
import { makeStyles } from './styles';
export const HeightPicker = (props) => {
    const { sizeLabor, themeLabor, wp, colors } = useBunnyKit();
    const { onDone, onCancel, title = 'title', initialHeight, } = props;
    const { sharedStyles } = getSharedStyles(sizeLabor, themeLabor);
    const styles = makeStyles(sizeLabor, themeLabor);
    const [height, setHeight] = useState(initialHeight);
    const _reset = () => {
    };
    return <View style={[styles.container]}>
        <View style={styles.header}>
            <Row>
                <Col><TextButton onPress={() => {
            onCancel?.();
        }}><IcoMoon name="x"/></TextButton></Col>
                <Col align="center"><Text>{title}</Text></Col>
                <Col align="flex-end"><TextButton onPress={_reset}><Text style={sharedStyles.text2}>Reset</Text></TextButton></Col>
            </Row>
        </View>
        <View style={styles.content}>
            <View style={{ paddingVertical: wp(10) }}>
                <Text>Todo</Text>
            </View>
        </View>
        <View style={[styles.footer]}>
            <ButtonTO onPress={() => {
            onDone?.(height);
        }}><InButtonText>Done</InButtonText></ButtonTO>
        </View>
    </View>;
};
