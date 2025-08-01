# Redux

Redux 是一个可预测的状态容器，用于 JavaScript 应用。它可以帮助你编写行为一致、易于测试和调试的应用程序。

## 核心概念

Redux 有三个核心原则：

1. **单一数据源**：整个应用的状态存储在一个对象树中
2. **状态是只读的**：唯一改变状态的方法是触发一个动作
3. **使用纯函数执行修改**：通过 reducer 函数来描述状态如何变化

## Redux Toolkit (RTK)

Redux Toolkit 是 Redux 官方推荐的编写 Redux 逻辑的方法。它包含了一系列工具，旨在简化常见的 Redux 用例，减少样板代码，并防止常见错误。

### 主要功能

- `configureStore()`：创建配置好的 Redux store，包含 thunk 中间件和 Redux DevTools 支持
- `createSlice()`：自动生成 action creators 和 reducers
- `createAsyncThunk`：处理异步逻辑
- `createEntityAdapter`：处理标准化数据结构
- `createSelector`：创建记忆化选择器函数

## 异步修改状态

Redux Toolkit (RTK) + createAsyncThunk

通过 createAsyncThunk 封装异步逻辑，自动生成 pending/fulfilled/rejected 三类 action，减少样板代码

```js
import {
  createAsyncThunk,
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetch", async (userId) => {
  const resp = await fetch(`/api/users/${userId}`);
  return resp.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const store = configureStore({ reducer: { user: userSlice.reducer } });
```

### createAsyncThunk 参数说明

`createAsyncThunk` 接受三个参数：

1. **typePrefix**：字符串类型，作为生成的 action type 的前缀
2. **payloadCreator**：返回 Promise 的函数，包含异步逻辑
3. **options**：可选配置对象

### 状态处理模式

通常异步操作有三种状态：

- `pending`：操作进行中
- `fulfilled`：操作成功完成
- `rejected`：操作失败

### 使用示例

```js
// 在组件中使用
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userSlice";

function UserProfile({ userId }) {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
    </div>
  );
}
```

## 数据标准化管理

对于需要管理大量同类型数据（如用户列表、文章列表等）的场景，推荐使用 `createEntityAdapter` 进行数据标准化管理。

### createEntityAdapter 使用示例

```js
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// 创建实体适配器
const usersAdapter = createEntityAdapter({
  // 选择器 id 字段，默认为 'id'
  selectId: (user) => user.id,
  // 排序比较器
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// 异步获取用户列表
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await fetch("/api/users");
  return response.json();
});

// 创建 slice
const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {
    // 可以添加额外的 reducers
    userAdded: usersAdapter.addOne,
    usersReceived: usersAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        // 使用适配器的 setAll 方法添加所有用户
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// 导出 actions
export const { userAdded, usersReceived } = usersSlice.actions;

// 导出 selector 函数
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
```

## 使用记忆化选择器优化性能

通过 `createSelector` 创建记忆化选择器，避免不必要的重新计算。

### createSelector 使用示例

```js
import { createSelector } from "@reduxjs/toolkit";

// 基础选择器
const selectUsers = (state) => state.users.entities;
const selectFilter = (state) => state.filters.userFilter;

// 记忆化选择器 - 只有当 users 或 filter 变化时才会重新计算
export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilter],
  (users, filter) => {
    if (!filter) return Object.values(users);
    return Object.values(users).filter((user) => user.name.includes(filter));
  },
);

// 在组件中使用
import { useSelector } from "react-redux";
import { selectFilteredUsers } from "./usersSlice";

function UsersList() {
  const filteredUsers = useSelector(selectFilteredUsers);

  return (
    <ul>
      {filteredUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## 最佳实践

1. **使用 Redux Toolkit**：RTK 是编写现代 Redux 应用的标准方式
2. **合理组织状态结构**：避免嵌套过深的对象结构
3. **标准化数据**：使用 `createEntityAdapter` 管理集合数据
4. **恰当使用异步逻辑**：通过 `createAsyncThunk` 处理副作用
5. **正确使用 selector**：使用 `createSelector` 优化性能
6. **避免在 Redux 中存储可变对象**：如 DOM 元素、类实例等
7. **使用 TypeScript**：提供更好的类型安全和开发体验
8. **合理划分 state 切片**：按照业务功能划分不同的 slice
9. **避免存储计算得出的值**：通过选择器来计算派生数据
10. **正确处理错误状态**：为异步操作提供适当的错误处理机制

## 相关资源

- [Redux 官方文档](https://redux.js.org/)
- [Redux Toolkit 官方文档](https://redux-toolkit.js.org/)
- [React Redux 官方文档](https://react-redux.js.org/)
