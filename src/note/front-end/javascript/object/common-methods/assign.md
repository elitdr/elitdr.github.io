- `Object.assign()` 静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象（浅拷贝）。

  ```js
  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };

  const returnedTarget = Object.assign(target, source);

  console.log(target);
  // Expected output: Object { a: 1, b: 4, c: 5 }

  console.log(returnedTarget === target);
  // Expected output: true
  ```
