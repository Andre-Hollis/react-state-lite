import React from "react";

import { StateLiteContext, type Store } from "../context"

interface IStateLiteRootProps {
    children: React.ReactNode;
}

export const StateLiteRoot = ({children}: IStateLiteRootProps) => {

    // const store = React.useMemo<Store>(() => {
    //     return {
    //         atoms: new Map(),
    //         selectors: new Map(),
    //         selectorSubscribers: new Map(),
    //     };
    // }, []);

    const store = React.useMemo<Map<string, any>>(() => {
        return new Map();
    }, []);

    return (
        <StateLiteContext.Provider value={store}>
            {children}
        </StateLiteContext.Provider>
    );
};