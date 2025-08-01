- `Object.hasOwn()` 如果指定的对象自身有指定的属性，则静态方法返回 true。如果属性是继承的或者不存在，该方法返回 false。

  ```js
  const object1 = {
    prop: "exists",
  };

  console.log(Object.hasOwn(object1, "prop"));
  // Expected output: true

  console.log(Object.hasOwn(object1, "toString"));
  // Expected output: false

  console.log(Object.hasOwn(object1, "undeclaredPropertyValue"));
  // Expected output: false
  ```
