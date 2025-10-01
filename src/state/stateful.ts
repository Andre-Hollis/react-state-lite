interface Disconnect {
    disconnect: () => void;
}

export class Stateful<T> {
    // This is a set of unique callbacks that have 
    // subscribed and will update another objects state
    private listeners = new Set<((val: T) => void)>();

    constructor(protected value: T) {}

    // Method for returning the state.
    snapshot(): T {
        return this.value;
    }

    // The emit method is what calls all the listeners with the new state.
    private emit() {
        for (const listener of [...this.listeners]) {
            listener(this.snapshot());
        }
    }

    protected update(value: T) {
        if (this.value !== value) {
            this.value = value;

            // Let all the listeners know there's new state.
            this.emit();
        }
    }

    subscribe(callback: (value: T) => void): Disconnect {
        this.listeners.add(callback);
        return {
            disconnect: () => {
                this.listeners.delete(callback);
            },
        };
    }

    public setState(value: T) {
        throw new Error("Method 'draw()' must be implemented by subclasses.");
    }
}