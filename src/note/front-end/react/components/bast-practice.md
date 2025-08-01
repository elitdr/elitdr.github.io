## [React 最佳实践](/note/front-end/react/components/bast-practice)

### 组件设计原则

- **单一职责原则**：每个组件只负责一个功能
- **可复用性**：尽量设计通用组件
- **无状态组件优先**：优先使用函数组件
- **组件分离**：容器组件和展示组件分离

### 状态管理

- 局部状态：使用 useState 或 useReducer
- 全局状态：使用 Context API 或状态管理库如 Redux
- 状态提升：将共享状态提升到最近的共同父组件

### 性能优化

- 使用 React.memo 避免不必要的组件重渲染
- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存函数引用
- 使用 lazy 和 Suspense 实现代码分割

### lazy 和 Suspense

React.lazy 允许你将组件动态导入，从而实现代码分割，只在需要时加载组件代码。Suspense 组件用于在组件加载时显示 fallback 内容。

#### 基本用法

```jsx
import React, { lazy, Suspense } from "react";

// 动态导入组件
const OtherComponent = lazy(() => import("./OtherComponent"));
const AnotherComponent = lazy(() => import("./AnotherComponent"));

function MyComponent() {
  return (
    <div>
      <h1>My Component</h1>
      {/* 使用 Suspense 包裹懒加载组件，并提供 fallback */}
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
        <AnotherComponent />
      </Suspense>
    </div>
  );
}
```

#### 错误处理

当动态导入失败时，可以使用 Error Boundaries 来处理错误：

```jsx
import React, { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Failed to load component</h2>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

#### 命名导出的懒加载

如果需要懒加载的模块使用的是命名导出而非默认导出，可以这样处理：

```jsx
// MyComponents.js - 使用命名导出
export const ComponentA = () => <div>Component A</div>;
export const ComponentB = () => <div>Component B</div>;

// App.js - 懒加载命名导出
import React, { lazy, Suspense } from "react";

const ComponentA = lazy(() =>
  import("./MyComponents").then((module) => ({ default: module.ComponentA })),
);

// 或者创建一个辅助函数
const lazyImport = (importFunc, componentName) =>
  lazy(async () => {
    const module = await importFunc();
    return { default: module[componentName] };
  });

const ComponentB = lazyImport(() => import("./MyComponents"), "ComponentB");

function App() {
  return (
    <Suspense fallback={<div>Loading components...</div>}>
      <ComponentA />
      <ComponentB />
    </Suspense>
  );
}
```

#### 自定义加载指示器

可以创建更丰富的加载体验：

```jsx
import React, { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

// 自定义加载组件
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
    }}
  >
    <div className="spinner">Loading...</div>
  </div>
);

// 带延迟的 Suspense（避免闪烁）
const SuspenseWithDelay = ({ fallback, delay = 300, children }) => {
  const [showFallback, setShowFallback] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!showFallback) {
    return <>{children}</>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
};

function App() {
  return (
    <SuspenseWithDelay fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </SuspenseWithDelay>
  );
}
```

#### 使用建议

1. **合理分割代码**：将大型组件或不常用的组件进行懒加载
2. **提供良好的加载体验**：设计合适的 fallback UI
3. **处理加载错误**：使用 Error Boundaries 捕获加载失败的情况
4. **避免过度分割**：过多的小块可能反而影响性能
5. **预加载策略**：对于用户可能很快需要的组件，可以考虑预加载

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

### 错误处理

使用 Error Boundaries 捕获组件树中的 JavaScript 错误：

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```
