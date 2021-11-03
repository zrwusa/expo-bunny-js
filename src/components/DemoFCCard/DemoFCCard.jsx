import React from 'react';
import { Text, View } from '../UI';
const DemoFCCard = ({ title, paragraph, children }) => {
    return (<View>
        <Text>{title}</Text>
        {/*we can use children even though we haven't defined them in our FCCardProps*/}
        {children}
    </View>);
};
export default DemoFCCard;
