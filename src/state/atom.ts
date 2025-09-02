import { Stateful } from './stateful';

export type AtomConfig<T> = {
    key: string,
    default: T,
}

export class Atom<T> extends Stateful<T> {
    key: string;
    
    constructor(config: AtomConfig<T>) {
        // This needs to be undefined initially because of Typescript's inheritance rules
        // It's effectively "initialised memory"
        super(undefined as any);

        this.key = config.key;
    }

    public setState(value: T) {
        super.update(value);
    }
}