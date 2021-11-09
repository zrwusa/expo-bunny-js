import * as React from 'react';
import { getSizeLabor } from './sizeLabor';
export const SizeLaborContext = React.createContext(getSizeLabor());
SizeLaborContext.displayName = 'SizeLaborContext';
