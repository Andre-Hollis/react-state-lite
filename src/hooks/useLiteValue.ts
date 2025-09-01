import React from 'react';

import type { Stateful } from '../state/stateful';

// This hook will re-render whenever the supplied `Stateful` value changes.
// It can be used with `Selector`s or `Atom`s.
export function useLiteValue<T>(value: Stateful<T>): T {
    const [, updateState] = React.useState({});

    React.useEffect(() => {
        const { disconnect } = value.subscribe(() => updateState({}));
        return () => disconnect();
    }, [value]);

    return value.snapshot();
}