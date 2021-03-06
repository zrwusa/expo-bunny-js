import React, { Component } from 'react';
import { Text, View } from '../UI';
import { makeStyles } from './styles';
import { SizeLaborContext } from '../../providers/size-labor';
import { ThemeLaborContext } from '../../providers/theme-labor';
// PureComponent ensures rendering just from props or contexts changing.Not rendered by parent component
export class DemoRegularComponent extends Component {
    constructor(props) {
        super(props);
        // SizeLaborContent and SizeLaborProvider to pass content
        this.count = 0;
    }
    render() {
        const { title, labelBeenRendered, labelRenderedUnit } = this.props;
        // this.context is from the SizeLaborProvider
        this.count++;
        return (<SizeLaborContext.Consumer>
                {(sizeLabor) => {
                return (<ThemeLaborContext.Consumer>
                            {(theme) => {
                        const styles = makeStyles(sizeLabor, theme);
                        return <View>
                                    <Text>{title}</Text>
                                    <View style={styles.demoSizeLabor}/>
                                    <Text>{labelBeenRendered} {this.count} {labelRenderedUnit}</Text>
                                </View>;
                    }}
                        </ThemeLaborContext.Consumer>);
            }}
            </SizeLaborContext.Consumer>);
    }
}
