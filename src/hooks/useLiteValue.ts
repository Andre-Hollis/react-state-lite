import React from 'react';

import { StateLiteContext } from '../context';
import type { Selector } from '../state/selector';
import type { Atom } from '../state/atom';

export function useLiteValue<T>(value: Atom<T> | Selector<T>): T {
    const store = React.useContext(StateLiteContext);
    const [, updateState] = React.useState({});

    React.useEffect(() => {
        const { disconnect } = value.subscribe(() => updateState({}));
        return () => disconnect();
    }, [value]);

    store?.set(value.key, value);
    const val = value.snapshot();
    return val;
}