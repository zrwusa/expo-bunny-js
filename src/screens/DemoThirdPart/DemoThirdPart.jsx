import React, { useState } from 'react';
import { Avatar, Button, List } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { IconMC, View } from '../../components/UI';
import { shortenTFunctionKey } from '../../providers/i18n-labor';
import { Card, makeContainerStyles, Row } from '../../containers';
import { uuidV4 } from '../../utils';
import { makeStyles } from './styles';
import { useBunnyKit } from '../../hooks/bunny-kit';
function DemoThirdPartScreen(props) {
    const { sizeLabor, themeLabor, t, wp } = useBunnyKit();
    const [state, setState] = useState({
        name: 'DemoThirdPart',
        pickerValue: 'football'
    });
    const st = shortenTFunctionKey(t, 'screens.DemoThirdPart');
    const styles = makeStyles(sizeLabor, themeLabor);
    const LIST = [
        {
            id: uuidV4(),
            name: 'Amy Farha',
            avatar_url: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany.jpeg',
            subtitle: 'Alex'
        },
        {
            id: uuidV4(),
            name: 'Chris Jackson',
            avatar_url: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany-avatar.jpeg',
            subtitle: 'Rios'
        },
    ];
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    return (<View style={[containerStyles.Screen, styles.container]}>
            <Row>
                <Card title="">
                    <Button icon={() => <IconMC name="air-horn"/>} onPress={() => {
        }}>{st(`buttonWithIcon`)}</Button>
                    <View>
                        <List.Section title="Accordions">
                            {LIST.map((l, i) => (<List.Accordion key={l.id} title={l.name} left={props => <Avatar.Image size={wp(30)} source={{ uri: l.avatar_url }}/>}>
                                    <List.Item title="First item"/>
                                    <List.Item title="Second item"/>
                                </List.Accordion>))}
                        </List.Section>
                    </View>
                    <View>
                        <Button icon={() => <IconMC name="air-horn"/>} onPress={() => {
        }}>{st(`buttonWithIcon`)}</Button>
                    </View>
                    <RNPickerSelect value={state.pickerValue} onValueChange={(itemValue, itemIndex) => setState({ ...state, pickerValue: itemValue })} items={[
            { label: 'Football', value: 'football' },
            { label: 'Baseball', value: 'baseball' },
            { label: 'Hockey', value: 'hockey' },
        ]}>
                    </RNPickerSelect>
                </Card>
            </Row>

        </View>);
}
export default DemoThirdPartScreen;
