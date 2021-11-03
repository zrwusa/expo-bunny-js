import React, { PureComponent } from 'react';
import { Text, View } from '../UI';
import { getStyles } from './styles';
import { SizeLaborContext } from '../../providers/size-labor';
import { ThemeLaborContext } from '../../providers/theme-labor';
// PureComponent ensures rendering just from props or contexts changing.Not rendered by parent component
export class DemoPureComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.count = 0;
    }
    render() {
        const { title, labelBeenRendered, labelRenderedUnit } = this.props;
        this.count++;
        return (
        // sizeLabor from SizeLaborContext
        <SizeLaborContext.Consumer>
                {(sizeLabor) => {
                return (<ThemeLaborContext.Consumer>
                            {(themeLabor) => {
                        const styles = getStyles(sizeLabor, themeLabor);
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
