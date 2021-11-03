import * as React from 'react';
import getSizeLabor from './sizeLabor';

const SizeLaborContext = React.createContext(getSizeLabor());
SizeLaborContext.displayName = 'SizeLaborContext';
export {SizeLaborContext};
