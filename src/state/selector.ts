import { Stateful } from './stateful';

// The "get" function is the way that selectors can subscribe to other selectors and atoms. 
// The "set" function is the way for selectors to set the new value for other pieces of state.
export type SelectorGenerator<T> = (context: { get: <V>(dep: Stateful<V>) => V }) => T;
export type SelectorSetter<T> = (
    context: {
        get: <V>(dep: Stateful<V>) => V ,
        set: <V>(dep: Stateful<V>, newVal: V) => void,
    },
    newValue: T
) => void;

export type SelectorConfig<T> = {
    key: string,
    get: SelectorGenerator<T>,
    set: SelectorSetter<T>
}

export class Selector<T> extends Stateful<T> {
    key: string
    private readonly generate: SelectorGenerator<T>
    private readonly set: SelectorSetter<T>

    // Set of all the registered dependencies.
    private registeredDeps = new Set<Stateful<any>>();

    // When the get function is called, it allows consumers to subscribe to state
    // changes. This method subscribes the Selector to the dependency if it hasn't been already,
    // then returns it's value.
    private addDep<V>(dep: Stateful<V>): V {
        if (!this.registeredDeps.has(dep)) {
            dep.subscribe(() => this.updateSelector());
            this.registeredDeps.add(dep);
        }

        return dep.snapshot();
    }

    // A helper method for running the internal generator method, updating dependencies,
    // returning the computed state and updating all listeners.
    private updateSelector() {
        this.update(this.generate({ get: dep => this.addDep(dep) }));
    }

    constructor(config: SelectorConfig<T>) {
        super(undefined as any);

        this.value = config.get({ get: dep => this.addDep(dep) });

        this.key = config.key;
        this.generate = config.get;
        this.set = config.set;
    }

    public setState(value: T) {
        this.set({
            get: dep => this.addDep(dep),
            set: (dep, val) => dep.setState(val),
        }, value);
    }
}