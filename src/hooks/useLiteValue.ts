import React from 'react';

import { StateLiteContext } from '../context';
import type { Selector } from '../state/selector';
import type { Atom } from '../state/atom';

// This hook will re-render whenever the supplied `Stateful` value changes.
// It can be used with `Selector`s or `Atom`s.
export function useLiteValue<T>(value: Atom<T> | Selector<T>): T {
    const store = React.useContext(StateLiteContext);
    console.log(store);
    const [, updateState] = React.useState({});

    React.useEffect(() => {
        const { disconnect } = value.subscribe(() => updateState({}));
        return () => disconnect();
    }, [value]);

    store?.set(value.key, value);
    const val = value.snapshot();
    console.log(val);
    return val;
}