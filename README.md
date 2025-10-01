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

## 📦 Basic Concepts

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

## 📦 API Reference

```bash
atom<T>(initialValue: T): Atom<T>
```
Creates a new piece of reactive state.

```bash
useAtom<T>(atom: Atom<T>): [T, (value: T | ((prev: T) => T)) => void]
```
Hook to access and update the state of an atom.
  ✅ Automatically subscribes the component to changes in the atom's value.

```bash
selector<T>(get: () => T): Atom<T>
```
(Optional) Create derived state from one or more atoms.
