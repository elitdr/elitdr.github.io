- `Array.isArray()` 静态方法用于确定传递的值是否是一个数组。

  ```js
  console.log(Array.isArray([1, 3, 5]));
  // Expected output: true

  console.log(Array.isArray("[]"));
  // Expected output: false

  console.log(Array.isArray(new Array(5)));
  // Expected output: true

  console.log(Array.isArray(new Int16Array([15, 33])));
  // Expected output: false
  ```
