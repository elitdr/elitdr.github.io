- `Object.groupBy()` 静态方法根据提供的回调函数返回的字符串值对给定可迭代对象中的元素进行分组。返回的对象具有每个组的单独属性，其中包含组中的元素的数组。

  ```js
  const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 12 },
    { name: "fish", type: "meat", quantity: 22 },
  ];

  const result = Object.groupBy(inventory, ({ quantity }) =>
    quantity < 6 ? "restock" : "sufficient",
  );
  console.log(result.restock);
  // [{ name: "bananas", type: "fruit", quantity: 5 }]
  ```
