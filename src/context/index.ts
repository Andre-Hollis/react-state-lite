import React from 'react';

export interface Store {
    atoms: Map<string, any>;
    selectors: Map<string, any>;
    selectorSubscribers: Map<string, any>;
}

export const StateLiteContext = React.createContext<Map<string, any> | null>(new Map());
// export const StateLiteContext = React.createContext<Store | null>(null);