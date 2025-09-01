import React from 'react';

export interface Store {
    atoms: Map<string, any>;
    selectors: Map<string, any>;
    selectorSubscribers: Map<string, any>;
}

export const RecoilContext = React.createContext<Store | null>(null);