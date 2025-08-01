- `Object.entries()` 静态方法返回一个数组，包含给定对象自有的可枚举字符串键属性的键值对。

  ```js
  const object1 = {
    a: "somestring",
    b: 42,
  };

  for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
  }

  // Expected output:
  // "a: somestring"
  // "b: 42"
  ```
