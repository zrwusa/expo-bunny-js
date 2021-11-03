import bunnyAPI from '../../helpers/bunny-api';
import React from 'react';
import {RequestContext} from './RequestContext';

;

export function RequestProvider(props) {
    const {children, axiosInstance} = props;
    // if (axiosInstance === undefined) {
    //     throw new Error('The component using the the context must be a descendant of the context provider')
    // }
    return (<RequestContext.Provider value={axiosInstance || bunnyAPI}>
        {children}
    </RequestContext.Provider>);
}
