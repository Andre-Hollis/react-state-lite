import { Stateful } from './stateful';

// The Recoil selector function is a bit gnarley. Essentially the "get" function
// is the way that selectors can subscribe to other selectors and atoms.
export type SelectorGenerator<T> = (context: { get: <V>(dep: Stateful<V>) => V }) => T;
export type SelectorSetter<T> = (
    context: {
        get: <V>(dep: Stateful<V>) => V ,
        set: <V>(dep: Stateful<V>, newVal: V) => void,
    },
    newValue: T
) => void;

export type SelectorConfig<T> = {
    get: SelectorGenerator<T>,
    set: SelectorSetter<T>
}

export class Selector<T> extends Stateful<T> {
    private readonly generate: SelectorGenerator<T>
    private readonly set: SelectorSetter<T>

    // Keep track of all the registered dependencies. We want to make sure we only
    // re-render once when they change.
    private registeredDeps = new Set<Stateful<any>>();

    // When the get function is called, it allows consumers to subscribe to state
    // changes. This method subscribes to the dependency if it hasn't been already,
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
        // This needs to be undefined initially because of Typescript's inheritance rules
        // It's effectively "initialised memory"
        super(undefined as any);

        this.value = config.get({ get: dep => this.addDep(dep) });

        this.generate = config.get;
        this.set = config.set;
    }

    public setState(value: T) {
        this.set({
            get: dep => this.addDep(dep),
            set: (dep, val) => {
                this.addDep(dep);
                dep.setState(val);
            },
        }, value);
    }
}