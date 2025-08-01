- `Object.keys()` 静态方法返回一个由给定对象自身的可枚举的字符串键属性名组成的数组。

  ```js
  const object1 = {
    a: "somestring",
    b: 42,
    c: false,
  };

  console.log(Object.keys(object1));
  // Expected output: Array ["a", "b", "c"]
  ```
