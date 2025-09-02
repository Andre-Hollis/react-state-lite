import { Atom } from './atom';
import { Selector, type SelectorGenerator, type SelectorSetter } from './selector';

// A helper function for creating a new Atom
// The `key` member is currently unused. I just kept it around to maintain a similar
// API to Recoil.
export function atom<V>(value: { key: string; default: V }): Atom<V> {
    return new Atom({key: value.key, default: value.default});
}

// A helper method for creating a new Selector
// Likewise the `key` method is just for looking like Recoil.
export function selector<V>(value: {
    key: string;
    get: SelectorGenerator<V>;
    set: SelectorSetter<V>;
}): Selector<V> {
    return new Selector({key: value.key, get: value.get, set: value.set});   
}