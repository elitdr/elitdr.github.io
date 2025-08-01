## [常见问题和解决方案](/note/front-end/react/components/q&a)

### 如何处理表单

```jsx
import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 条件渲染

```jsx
function Greeting({ isLoggedIn }) {
  return <div>{isLoggedIn ? <UserGreeting /> : <GuestGreeting />}</div>;
}

// 使用逻辑与运算符进行条件渲染
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

// 使用三元运算符进行条件渲染
function LoadingIndicator({ isLoading }) {
  return <div>{isLoading ? <p>Loading...</p> : <p>Content loaded!</p>}</div>;
}
```

### 列表渲染

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul>{listItems}</ul>;
}
```

### 事件处理

```jsx
function Toggle() {
  const [isToggleOn, setIsToggleOn] = useState(true);

  // 注意：这里需要绑定 this 或使用箭头函数
  function handleClick() {
    setIsToggleOn(!isToggleOn);
  }

  // 或者使用箭头函数
  const handleClickArrow = () => {
    setIsToggleOn(!isToggleOn);
  };

  return <button onClick={handleClick}>{isToggleOn ? "ON" : "OFF"}</button>;
}
```
