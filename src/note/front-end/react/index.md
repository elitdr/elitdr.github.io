# React 学习笔记

## 什么是 React

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发并开源。它专注于视图层，采用组件化的开发方式，使得构建复杂的用户界面变得更加容易。

## 核心概念

### 组件（Components）

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

### JSX

JSX 是 JavaScript 的语法扩展，允许在 JS 中写类似 HTML 的代码。

```jsx
const element = <h1>Hello, world!</h1>;
```

JSX 的特点：

- 可以嵌入表达式：`<h1>Hello, {name}</h1>`
- 可以作为表达式使用：`const element = <h1>Hello</h1>;`
- 属性使用驼峰命名：`<img src={url} alt="Description" />`
- 防止注入攻击：React DOM 在渲染前会转义所有嵌入的值

### Props 和 State

- **Props**：组件的输入参数，用于从父组件向子组件传递数据
- **State**：组件内部的数据，可以随用户交互而变化

Props 特性：

- 只读性：组件不能修改自身的 props
- 单向数据流：数据从父组件流向子组件

State 特性：

- 局部性：state 是组件私有的
- 异步更新：setState 是异步的

<!--@include: ./components/hooks.md-->

<!--@include: ./components/bast-practice.md-->

<!--@include: ./components/q&a.md-->

## React 18 新特性

### 自动批处理

React 18 通过默认启用自动批处理来提高性能，将多个状态更新合并为一次重新渲染：

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount((c) => c + 1); // 这些状态更新会被批处理
    setFlag((f) => !f); // 结果只会重新渲染一次
  }

  // ...
}
```

### 并发渲染

React 18 引入了并发渲染功能，可以中断渲染工作并在稍后继续，从而提供更好的用户体验：

```jsx
// 使用并发特性需要使用新的根 API
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

### 新的 Hooks

#### useId

用于生成唯一 ID，特别适用于服务端渲染：

```jsx
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react" />
    </>
  );
}
```

#### useTransition

用于标记某些状态更新为非紧急更新：

```jsx
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount((c) => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```

#### useTransition 的使用场景

- 搜索框输入时的延迟加载
- 切换选项卡时的复杂渲染
- 大列表的筛选和排序

```jsx
import React, { useState, useTransition } from "react";

function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    startTransition(() => {
      setSearchTerm(e.target.value);
    });
  };

  // 假设这是一个昂贵的搜索操作
  const results = performExpensiveSearch(searchTerm);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="输入搜索内容..."
      />
      {isPending ? (
        <div>搜索中...</div>
      ) : (
        <div>
          {results.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 开闭原则 (Open/Closed Principle)

开闭原则是面向对象设计中的重要原则之一，它指出软件实体（类、模块、函数等）应该对扩展开放，对修改关闭。

### 核心思想

- **对扩展开放**：可以不修改原有代码的情况下添加新功能
- **对修改关闭**：修改现有代码可能会引入错误，应尽量避免

### 在 React 中的应用

#### 使用高阶组件(HOC)实现开闭原则

```jsx
// 不符合开闭原则的组件
function Button({ type, children }) {
  if (type === "primary") {
    return <button className="btn-primary">{children}</button>;
  } else if (type === "secondary") {
    return <button className="btn-secondary">{children}</button>;
  }
  return <button>{children}</button>;
}

// 符合开闭原则的实现
const withButtonStyle = (WrappedComponent, styleClass) => {
  return (props) => <WrappedComponent {...props} className={styleClass} />;
};

const PrimaryButton = withButtonStyle(Button, "btn-primary");
const SecondaryButton = withButtonStyle(Button, "btn-secondary");

// 添加新样式按钮时，无需修改原有代码
const DangerButton = withButtonStyle(Button, "btn-danger");
```

#### 使用组合模式实现开闭原则

```jsx
// 定义基础组件
const Button = ({ variant = "default", children, ...props }) => {
  const variants = {
    default: "btn",
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    danger: "btn btn-danger",
  };

  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  );
};

// 使用时可以直接选择已有变体，也可以通过CSS扩展新样式
// 添加新样式时，只需在CSS中添加新类名，无需修改组件代码
```

#### 使用自定义 Hooks 实现开闭原则

```jsx
// 基础数据获取 Hook
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// 扩展 Hook - 添加缓存功能，无需修改原有 Hook
function useCachedApi(url, cacheTime = 5 * 60 * 1000) {
  const cacheKey = `cache_${url}`;

  // 尝试从缓存获取数据
  const getCachedData = () => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < cacheTime) {
        return data;
      }
    }
    return null;
  };

  const [cachedData, setCachedData] = useState(getCachedData());
  const { data, loading, error } = useApi(cachedData ? null : url);

  useEffect(() => {
    if (data) {
      // 缓存新数据
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        }),
      );
      setCachedData(data);
    }
  }, [data, cacheKey]);

  return {
    data: cachedData || data,
    loading: !cachedData && loading,
    error,
  };
}
```
