import React from 'react';
import bunnyAPI from '../../helpers/bunny-api';
export const RequestContext = React.createContext(new Proxy(bunnyAPI, {
    apply: () => {
        throw new Error('You must wrap your component in an RequestProvider');
    },
    get: () => {
        throw new Error('You must wrap your component in an RequestProvider');
    }
}));
