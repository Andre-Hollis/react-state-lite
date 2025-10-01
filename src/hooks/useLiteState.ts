import React from 'react';

import type { Atom } from '../state/atom';
import type { Selector } from '../state/selector';
import { useLiteValue } from './useLiteValue';

export function useLiteState<T>(atom: Atom<T> | Selector<T>): [T, (value: T) => void] {
    const value = useLiteValue(atom);
    return [value, React.useCallback(value => atom.setState(value), [atom])];
}