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

```bash
npm install react-state-lite
# or
yarn add react-state-lite
```
---

## 🧱 Basic Concepts

- Atom: The smallest unit of state.
- Selector (optional): Derived/computed state based on one or more atoms.
- useLiteState: React hook to read state.
- useLiteVale: React hook to read/write state.
- Dependency graph: Automatically tracks which components depend on which atoms or selectors for optimized updates.

🧪 Example Usage
```bash
import { atom, useLiteState } from 'react-state-lite';

// Define an atom
const counterAtom = atom(0);

function Counter() {
  const [count, setCount] = useLiteStatecounterAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

---

## 📚 API Reference

```bash
atom<T>(initialValue: T): Atom<T>
```
Creates a new piece of reactive state.


```bash
selector<T>(get: () => T): Atom<T>
```
Create derived state from one or more atoms/selectors.


```bash
useLiteState<T>(atom: Atom<T> | Selector<T>): [T, (value: T | ((prev: T) => T)) => void]
```
Hook to access and update the state of an atom/selector.
  ✅ Automatically subscribes the component to changes in the state's value.

```bash
useLiteValue<T>(atom: Atom<T> | Selector<T>): T
```
Hook to access the state of an atom/selector.
  ✅ Automatically subscribes the component to changes in the state's value.

---

## 🙌 Acknowledgements

Inspired by great state libraries like Recoil and Jotai. Built with ❤️ to make state management simpler and more performant.
