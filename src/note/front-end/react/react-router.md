# React Router

~React Router 是 React 应用中广泛使用的路由管理库，它允许我们构建单页应用程序(SPA)，在不同组件之间进行导航而无需刷新整个页面。目前最新版本是 v6，相较于之前的版本有许多重要更新。

## React Router v6 主要特性

### 1. 安装和基本设置

```bash
npm install react-router-dom@latest
```

基本使用方式：

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 2. 主要变化

#### Routes 替代 Switch

在 v6 版本中，`Switch` 组件被 `Routes` 组件替代：

```jsx
// v5
import { Switch, Route } from "react-router-dom";

<Switch>
  <Route exact path="/">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Switch>;

// v6
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>;
```

#### element 属性替代 component/render

v6 中使用 `element` 属性替代了 v5 中的 `component` 和 `render` 属性：

```jsx
// v5
<Route path="/about" component={About} />
<Route path="/users/:id" render={(props) => <User {...props} />} />

// v6
<Route path="/about" element={<About />} />
<Route path="/users/:id" element={<User />} />
```

#### 使用 useNavigate 替代 useHistory

v6 中推荐使用 `useNavigate` hook 替代 `useHistory`：

```jsx
// v5
import { useHistory } from "react-router-dom";

function MyComponent() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }
}

// v6
import { useNavigate } from "react-router-dom";

function MyComponent() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }
}
```

### 3. 嵌套路由和布局路由

v6 强化了嵌套路由的功能，可以通过 `Outlet` 组件实现：

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

### 4. 编程式导航

使用 `useNavigate` hook 进行编程式导航：

```jsx
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    // 导航到指定路径
    navigate("/dashboard");

    // 向后导航
    navigate(-1);

    // 替换当前历史记录
    navigate("/login", { replace: true });

    // 传递状态
    navigate("/user", { state: { id: 123 } });
  };

  return <button onClick={handleClick}>Navigate</button>;
}
```

### 5. 路由参数

获取路由参数的方式：

```jsx
import { useParams, useSearchParams } from "react-router-dom";

// 动态路由参数
function UserProfile() {
  const { userId } = useParams();
  return <div>User ID: {userId}</div>;
}

// 查询参数
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  return <div>Search query: {query}</div>;
}
```

### 6. 路由保护

实现路由保护的方式：

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth(); // 假设这是一个自定义hook

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// 使用方式
<Routes>
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>;
```

### 7. useRoutes Hook

可以通过 `useRoutes` hook 以编程方式定义路由：

```jsx
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "messages",
          element: <DashboardMessages />,
        },
      ],
    },
    {
      path: "/about",
      element: <About />,
    },
  ]);

  return element;
}
```

## 最佳实践

1. 总是使用 `element` 属性而不是 `component` 或 `render`
2. 使用 `useNavigate` 进行编程式导航
3. 利用嵌套路由和 `Outlet` 构建布局
4. 使用 `useParams` 和 `useSearchParams` 获取路由参数
5. 使用 `Navigate` 组件进行重定向

React Router v6 提供了更直观、更灵活的 API，使路由管理变得更加简单和强大。
