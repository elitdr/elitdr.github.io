# React 学习笔记

## 什么是 React

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发并开源。它专注于视图层，采用组件化的开发方式，使得构建复杂的用户界面变得更加容易。

## 核心概念

### 1. 组件（Components）

React 应用由一个个组件构成，组件可以分为：

- **函数组件**：使用函数定义的组件
- **类组件**：使用 ES6 class 定义的组件

```jsx
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 2. JSX

JSX 是 JavaScript 的语法扩展，允许在 JS 中写类似 HTML 的代码。

```jsx
const element = <h1>Hello, world!</h1>;
```

### 3. Props 和 State

- **Props**：组件的输入参数，用于从父组件向子组件传递数据
- **State**：组件内部的数据，可以随用户交互而变化

## React Hooks

### useState

用于在函数组件中添加状态：

```jsx
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### useEffect

用于处理副作用，相当于类组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount：

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### useContext

用于在组件间共享状态：

```jsx
import React, { useContext } from "react";

const MyContext = React.createContext();

function App() {
  return (
    <MyContext.Provider value="Hello world">
      <Toolbar />
    </MyContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const value = useContext(MyContext);
  return <button>{value}</button>;
}
```

## React 最佳实践

### 1. 组件设计原则

- **单一职责原则**：每个组件只负责一个功能
- **可复用性**：尽量设计通用组件
- **无状态组件优先**：优先使用函数组件

### 2. 状态管理

- 局部状态：使用 useState 或 useReducer
- 全局状态：使用 Context API 或状态管理库如 Redux

### 3. 性能优化

- 使用 React.memo 避免不必要的组件重渲染
- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存函数引用

```jsx
import React, { memo, useMemo, useCallback } from "react";

const MyComponent = memo(({ list, onUpdate }) => {
  const expensiveValue = useMemo(() => {
    // 一些昂贵的计算
    return list.reduce((a, b) => a + b, 0);
  }, [list]);

  const handleClick = useCallback(
    (id) => {
      onUpdate(id);
    },
    [onUpdate],
  );

  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
      {list.map((item) => (
        <button key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
});
```

## 常见问题和解决方案

### 1. 如何处理表单

```jsx
import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 2. 条件渲染

```jsx
function Greeting({ isLoggedIn }) {
  return <div>{isLoggedIn ? <UserGreeting /> : <GuestGreeting />}</div>;
}
```

## 总结

React 是一个强大而灵活的库，通过组件化和声明式编程，使得构建复杂的用户界面变得简单。掌握 React 的核心概念和最佳实践，能够帮助我们开发出高质量的前端应用。
