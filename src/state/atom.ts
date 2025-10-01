import { Stateful } from './stateful';

export type AtomConfig<T> = {
    key: string,
    default: T,
}

export class Atom<T> extends Stateful<T> {
    key: string;
    
    constructor(config: AtomConfig<T>) {
        super(undefined as any);

        this.key = config.key;
        super.value = config.default
    }

    public setState(value: T) {
        super.update(value);
    }
}