import { Stateful } from './stateful';

export class Atom<T> extends Stateful<T> {
    public setState(value: T) {
        super.update(value);
    }
}