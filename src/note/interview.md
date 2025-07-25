---
outline: deep
---

# 面试题

## JavaScript

### this

this 是指函数运行时的上下文对象，谁调用了函数，this 就指向谁。

#### 不同调用场景下的 this 指向

|     场景     |                说明                |
| :----------: | :--------------------------------: |
|   普通函数   |   window（严格模式为 undefined）   |
|   对象方法   |              对象本身              |
|   构造函数   |             创建的实例             |
|   箭头函数   | this 不绑定，继承外层作用域的 this |
| 事件处理函数 |    DOM 元素（某些框架会有不同）    |

#### 改变 this 指向的方式

|            方式             |                   说明                    |
| :-------------------------: | :---------------------------------------: |
| `call(thisArg, arg1, arg2)` | this 指向传入的第一个参数，并且是立即执行 |
| `apply(thisArg, argsArray)` |       和 call 一致，以数组形式传参        |
| `bind(thisArg, arg1, arg2)` |  绑定 this 并返回一个新函数，需手动执行   |

### 构造函数

构造函数（Constructor）是一种特殊类型的函数，主要用于创建和初始化对象。当使用 new 关键字调用时，它会创建一个新对象并设置其初始属性和方法。

> ES6 的 class 本质是构造函数的语法糖。

#### new 关键字的内部流程

- 创建一个空对象

- 将构造函数的 this 绑定到新对象

- 执行构造函数

- 返回新对象

### 原型

### 作用域

作用域定义了变量和函数在代码中的可访问性（可见性）和生命周期。

#### 作用域类型

|     类型      |                                           说明                                           |
| :-----------: | :--------------------------------------------------------------------------------------: |
|  全局作用域   |   全局作用域中的变量和函数，可以在任何地方访问，在整个程序执行期间都存在，直到页面关闭   |
|  函数作用域   | 函数作用域中的变量和函数，仅在函数内部可见，函数执行结束后，作用域就会销毁（闭包是例外） |
| {} 块级作用域 |   {} 块级作用域中的变量和函数，仅在块级作用域内可见，块级作用域结束后，作用域就会销毁    |

### 闭包

闭包是指一个函数会记录在函数定义时所访问过的变量，即使函数在其他作用域中被执行，也能访问到这些变量。

> 用处：变量私有化、模块化、缓存数据、封装防抖节流函数。

> 注意点：过度使用闭包可能导致内存泄漏，闭包中的引用对象会一直保存在内存中，直到被手动清除。

### 垃圾回收机制

### 事件循环

js 是单线程的，但是为了处理异步任务（如定时器、网络请求），它通过事件循环机制实现多任务处理。

js 中的任务被分为宏任务和微任务，宏任务包括：setTimeout、setInterval、DOM 事件、I/O 操作等，微任务包括：then、catch、finally、async、await、MutationObserver 等。

执行顺序为：同步代码（本身也属于宏任务） -> 所有微任务 -> 渲染 -> 宏任务（往复循环）

## TypeScript

由微软创建，用于 JavaScript 的类型检查。

### interface 接口

描述对象和类。

可以通过继承（extends）扩展其他接口。

### type alias 别名

描述一个广泛的类型，包括基本类型、联合类型（|）和交叉类型（&）。

可以通过交叉类型（&）扩展其他类型。

### \<T> 泛型

描述一个未知的类型参数，使用时可指定类型。

## Vue

### Vue3 新特性

1. 响应式数据

## React

### Redux

#### 异步修改状态

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
