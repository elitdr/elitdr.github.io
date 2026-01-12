# TypeScript 学习

## interface 接口

描述对象和类。

可以通过继承（extends）扩展其他接口。

## type 别名

描述一个广泛的类型，包括基本类型、联合类型（|）和交叉类型（&）。

可以通过交叉类型（&）扩展其他类型。

## T 泛型

描述一个未知的类型参数，使用时可指定类型。

## Record

`Record` 是一个非常常用的 内置泛型工具类型（Utility Type），可以快速构造一种具有一组指定键和统一值类型的对象类型。

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

使用场景

```ts
type Status = "pending" | "success" | "error";
type MsgMap = Record<Status, string>;

const messages: MsgMap = {
  pending: "正在处理中",
  success: "操作成功",
  error: "操作失败",
};
```

## declare

`declare` 关键字是一个非常特殊且常用的语法，用来告诉 编译器有某个东西存在，但它的实现不在当前文件里，而且不会在生成的 JavaScript 中输出任何相关代码。换句话说，它是 “声明存在但不定义实现” 的意思。

```ts
declare const API_KEY: string;
console.log(API_KEY);
```
