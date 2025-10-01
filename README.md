# React State Lite

**React State Lite** is a lightweight and dependency-graph-driven state management library for React applications, written in TypeScript. Inspired by modern libraries like **Recoil** and **Jotai**, it enables fine-grained reactivity and efficient updates with minimal boilerplate.

## 🚀 Features

- ⚛️ React-first API, designed for hooks
- 🔁 Dependency-graph powered updates
- 🧠 Atom-based state architecture
- 📦 Tiny bundle size
- 🛠 Written in TypeScript – with full type safety

---

## 📦 Installation

**Coming soon...**

---

## 🧱 Basic Concepts

- Atom: The smallest unit of state.
- Selector (optional): Derived/computed state based on one or more atoms.
- useLiteState: React hook to read state.
- useLiteVale: React hook to read/write state.
- Dependency graph: Automatically tracks which components depend on which atoms or selectors for optimized updates.

🧪 Example Atom Usage
```bash
import { atom, useLiteState } from 'react-state-lite';

// Define an atom
const counterAtom = atom(1);

function Counter() {
  const [count, setCount] = counterAtom();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

🧪 Example Selector Usage
```bash
import { atom, useLiteState } from 'react-state-lite';

// Define an atom
const counterAtom = atom(1);

// Define a selector
const multipliedSelectorAtom = selector({
  get: ({ get }) => {
    return get(counterAtom)
  },
  set: ({ get, set }) => {
    set(counterAtom, get(counterAtom) * 2)
  },
});

function SelectorMultiplier() {
  const [count, setCount] = multipliedSelectorAtom();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount()}>Multiple By Two</button>
    </div>
  );
}
```

---

## 📚 API Reference

Create a new piece of reactive state:
```bash
atom<T>(initialValue: T): Atom<T>
```
<br/>
  
Create derived state from one or more atoms/selectors:
```bash
selector<T>(get: () => T): Atom<T>
```
<br/>

Hook to access and update the state of an atom/selector (automatically subscribes the component to changes in the state's value):
```bash
useLiteState<T>(atom: Atom<T> | Selector<T>): [T, (value: T | ((prev: T) => T)) => void]
```
<br/>

Hook to access the state of an atom/selector (automatically subscribes the component to changes in the state's value):
```bash
useLiteValue<T>(atom: Atom<T> | Selector<T>): T
```

---

## 🙌 Acknowledgements

Inspired by great state libraries like Recoil and Jotai. Built with ❤️ to make state management simpler and more performant.
