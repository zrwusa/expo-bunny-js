import React from 'react';
import {RequestContext} from './RequestContext';

export const useRequest = () => React.useContext(RequestContext);
