// An interface with the disconnect method. This could just be a function
// but I think having it as an object is more readable.
interface Disconnect {
    disconnect: () => void;
}

export class Stateful<T> {
    // This is a set of unique callbacks. The callbacks are listeners
    // that have subscribed and will update their own state
    private listeners = new Set<((val: T) => void)>();

    // The value property is protected because it needs to be manually
    // assigned in the constructor (because of inheritance quirks)
    constructor(protected value: T) {}

    // Simple method for returning the state. This could return a deep
    // copy if you wanted to be extra cautious.
    snapshot(): T {
        return this.value;
    }

    // The emit method is what updates all the listeners with the new state
    private emit() {
        for (const listener of [...this.listeners]) {
            listener(this.snapshot());
        }
    }

    protected update(value: T) {
        if (this.value !== value) {
            this.value = value;
            // After updating the value, let all the listeners know there's a
            // new state.
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
        
    }
}