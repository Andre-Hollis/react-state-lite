import React from 'react';

import type { Atom } from '../state/atom';
import { useLiteValue } from './useLiteValue';

// Similar to the above method, but it also lets you set state.
export function useLiteState<T>(atom: Atom<T>): [T, (value: T) => void] {
    const value = useLiteValue(atom);
    return [value, React.useCallback(value => atom.setState(value), [atom])];
}