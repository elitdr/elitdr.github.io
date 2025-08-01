## [React Hooks](/note/front-end/react/components/hooks)

- `useState` 用于在函数组件中添加状态：

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

  useState 的特点：
  - 返回一个状态变量和一个更新函数
  - 可以创建多个 state 变量
  - 更新函数可以接受新值或函数作为参数

- `useEffect` 用于处理副作用，相当于类组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount：

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

  useEffect 的使用方式：
  - 第二个参数为空数组：只在组件挂载时执行（相当于 componentDidMount）
  - 第二个参数为依赖数组：在依赖变化时执行
  - 返回清理函数：在组件卸载或依赖变化前执行清理（相当于 componentWillUnmount）

- `useContext` 用于在组件间共享状态：

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

- `useReducer` 用于复杂状态逻辑的管理，是 useState 的替代方案：

  ```jsx
  import React, { useReducer } from "react";

  const initialState = { count: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }

  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </>
    );
  }
  ```

- `useMemo` 用于缓存计算结果，避免重复计算：

  ```jsx
  import React, { useMemo } from "react";

  function ExpensiveComponent({ list, filter }) {
    const filteredList = useMemo(() => {
      return list.filter((item) => item.type === filter);
    }, [list, filter]);

    return (
      <ul>
        {filteredList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }
  ```

- `useCallback` 用于缓存函数，避免子组件不必要的重新渲染：

  ```jsx
  import React, { useState, useCallback } from "react";

  function Parent() {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
      setCount(count + 1);
    }, [count]);

    return (
      <div>
        <p>Count: {count}</p>
        <Child onClick={handleClick} />
      </div>
    );
  }

  const Child = React.memo(({ onClick }) => {
    console.log("Child rendered");
    return <button onClick={onClick}>Click me</button>;
  });
  ```
