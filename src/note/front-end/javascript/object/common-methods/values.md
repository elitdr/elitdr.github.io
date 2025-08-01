- `Object.values()` 静态方法返回一个给定对象的自有可枚举字符串键属性值组成的数组。

  ```js
  const object1 = {
    a: "somestring",
    b: 42,
    c: false,
  };

  console.log(Object.values(object1));
  // Expected output: Array ["somestring", 42, false]
  ```
