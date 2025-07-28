# 微信小程序

## 开发流程

1. **注册开发者账号**
   - 在微信公众平台注册小程序账号
   - 完成实名认证
   - 获取 AppID（在开发阶段可使用测试号）

2. **开发环境准备**
   - 下载安装微信开发者工具
   - 安装 Node.js（可选，用于构建工具）
   - 选择合适的代码编辑器（VS Code、WebStorm 等）

3. **创建项目**
   - 使用微信开发者工具创建新项目
   - 输入 AppID 或选择测试号
   - 选择项目目录
   - 选择合适的模板（默认模板、TypeScript模板等）

4. **项目结构配置**
   - 配置 app.json（全局配置）
   - 配置 project.config.json（项目配置）
   - 配置 sitemap.json（搜索引擎收录配置）

5. **开发阶段**
   - 编写页面结构（WXML）
   - 设计页面样式（WXSS）
   - 实现业务逻辑（JavaScript）
   - 配置页面路由和窗口表现
   - 调试和测试功能

6. **调试测试**
   - 使用微信开发者工具进行本地调试
   - 使用真机预览功能在手机上测试
   - 进行不同机型和系统版本的兼容性测试

7. **发布上线**
   - 代码审核
   - 版本提交
   - 审核通过后上线发布

## 生命周期

### 应用生命周期

在 app.js 中实现，用于管理小程序的生命周期：

1. `onLaunch` - 小程序初始化完成时触发，全局只触发一次
2. `onShow` - 小程序启动，或从后台进入前台显示时触发
3. `onHide` - 小程序从前台进入后台时触发
4. `onError` - 小程序发生脚本错误，或者 API 调用失败时触发
5. `onPageNotFound` - 小程序要打开的页面不存在时触发
6. `onUnhandledRejection` - 监听未处理的 Promise 拒绝事件
7. `onThemeChange` - 监听系统主题改变

### 页面生命周期

在页面文件中实现，用于管理页面的生命周期：

1. `onLoad` - 页面加载时触发，一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数
2. `onShow` - 页面显示/切入前台时触发
3. `onReady` - 页面初次渲染完成时触发，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互
4. `onHide` - 页面隐藏/切入后台时触发，如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等
5. `onUnload` - 页面卸载时触发，如 redirectTo 或 navigateBack 到其他页面时
6. `onPullDownRefresh` - 用户下拉刷新时触发
7. `onReachBottom` - 用户上拉触底时触发
8. `onShareAppMessage` - 用户点击右上角转发时触发
9. `onPageScroll` - 页面滚动时触发
10. `onResize` - 页面尺寸改变时触发

### 组件生命周期

在自定义组件中实现，用于管理组件的生命周期：

1. created - 在组件实例刚刚被创建时执行，此时不能调用 setData
2. attached - 在组件实例进入页面节点树后执行
3. ready - 在组件在视图层布局完成后执行
4. moved - 在组件实例被移动到节点树另一个位置时执行
5. detached - 在组件实例被从页面节点树移除时执行
6. error - 每当组件方法抛出错误时执行

组件还包含一些更新阶段的生命周期函数：

7. 生命周期 - 在组件实例进入页面节点树后执行
   - created - 组件实例刚刚被创建时执行
   - attached - 组件实例进入页面节点树后执行
   - ready - 组件在视图层布局完成后执行
   - moved - 组件实例被移动到节点树另一个位置时执行
   - detached - 组件实例被从页面节点树移除时执行
   - error - 每当组件方法抛出错误时执行

### 页面生命周期补充说明

#### onLoad(options)

- 页面创建时执行，一个页面只会调用一次
- 接收页面参数（通过导航传递的参数）
- 通常在此进行数据初始化、网络请求等操作

#### onShow()

- 页面显示时执行，每次打开页面都会调用
- 适用于需要每次展示页面时都执行的操作，如刷新数据

#### onReady()

- 页面首次渲染完成后执行，一个页面只会调用一次
- 此时页面视图层已经准备完毕，可以进行节点操作（如选择器selectComponent）

#### onHide()

- 页面隐藏时执行
- 适用于页面被遮挡或切换到后台时需要执行的操作

#### onUnload()

- 页面卸载时执行
- 适用于页面关闭前的清理操作，如清除定时器、解绑事件等

### 应用生命周期补充说明

#### onLaunch(options)

- 小程序初始化完成时触发，全局只触发一次
- options 参数包含场景值、启动参数等信息

#### onShow(options)

- 小程序启动，或从后台进入前台显示时触发
- options 参数包含场景值、启动参数等信息

#### onHide()

- 小程序从前台进入后台时触发
- 适用于小程序被隐藏时需要执行的操作

#### onError(error)

- 小程序发生脚本错误等异常时触发
- 可用于错误收集和上报

#### onPageNotFound(options)

- 小程序要打开的页面不存在时触发
- 可以进行重定向或其他处理

## 架构

微信小程序采用双线程架构：

- View Thread（视图层）：负责页面的渲染，运行在 WebView 中
- App Service Thread（逻辑层）：负责业务逻辑处理，运行在 JsCore 中

这种设计既保障了渲染性能，又避免了传统Web开发中的安全问题。两个线程之间通过系统层的 JSB（JavaScript Bridge）进行通信。

视图层和逻辑层的分离使得小程序既能保持良好的渲染性能，又能保障安全性。逻辑层的 JavaScript 代码运行在独立的 JS 引擎中，不依赖浏览器环境，从而避免了 XSS 攻击等安全问题。

## 组件系统

### 内置组件

- 视图容器：view、scroll-view、swiper 等
- 基础内容：icon、text、progress 等
- 表单组件：button、checkbox、form、input、picker 等
- 导航：navigator
- 媒体组件：audio、image、video 等
- 地图组件：map
- 画布组件：canvas

### 自定义组件

通过 Component 构造器创建自定义组件，具有独立的属性、数据和方法。

自定义组件具有以下特点：

- 可组合性：可以嵌套使用其他组件或自定义组件
- 可复用性：可以在多个页面中重复使用
- 独立作用域：组件内部的数据和方法不会影响到外部
- 通信机制：通过 properties 和 events 与外部通信

#### 创建自定义组件

1. **组件目录结构**：

   ```
   components/
     my-component/
       my-component.js     // 组件逻辑
       my-component.wxml   // 组件结构
       my-component.wxss   // 组件样式
       my-component.json   // 组件配置
   ```

2. **组件配置文件**（my-component.json）：

   ```json
   {
     "component": true,
     "usingComponents": {}
   }
   ```

3. **组件代码示例**（my-component.js）：

   ```javascript
   Component({
     // 组件属性
     properties: {
       title: {
         type: String,
         value: "默认标题",
       },
     },

     // 组件内部数据
     data: {
       counter: 0,
     },

     // 组件方法
     methods: {
       onTap() {
         this.setData({
           counter: this.data.counter + 1,
         });

         // 触发自定义事件
         this.triggerEvent("customevent", {
           counter: this.data.counter,
         });
       },
     },

     // 组件生命周期
     lifetimes: {
       attached() {
         console.log("组件被加载");
       },
       detached() {
         console.log("组件被卸载");
       },
     },
   });
   ```

4. **组件结构**（my-component.wxml）：
   ```xml
   <view class="component-wrapper">
     <text>{{title}}: {{counter}}</text>
     <button bindtap="onTap">点击增加</button>
   </view>
   ```

#### 组件间通信

1. **父组件向子组件传递数据**（properties）：

   ```xml
   <!-- 父组件中使用子组件 -->
   <my-component title="计数器" />
   ```

2. **子组件向父组件传递数据**（triggerEvent）：

   ```javascript
   // 子组件触发事件
   this.triggerEvent('customevent', { value: 123 })

   // 父组件监听事件
   <my-component bindcustomevent="onComponentEvent" />
   ```

3. **获取组件实例**：```
   // 在父组件中获取子组件实例
   const child = this.selectComponent('#my-component')
   child.callMethod() // 调用子组件方法

   ```

   ```

#### 组件插槽（Slot）

1. **单个插槽**：

   ```xml
   <!-- 组件内部 -->
   <view class="wrapper">
     <slot></slot>
   </view>

   <!-- 使用组件 -->
   <my-component>
     <view>插入的内容</view>
   </my-component>
   ```

2. **具名插槽**：

   ```xml
   <!-- 组件内部 -->
   <view class="wrapper">
     <slot name="header"></slot>
     <slot name="footer"></slot>
   </view>

   <!-- 使用组件 -->
   <my-component>
     <view slot="header">头部内容</view>
     <view slot="footer">底部内容</view>
   </my-component>
   ```

## 核心 API

### 路由

- wx.navigateTo - 保留当前页面，跳转到应用内某个页面
- wx.redirectTo - 关闭当前页面，跳转到应用内某个页面
- wx.switchTab - 跳转到 tabBar 页面
- wx.navigateBack - 关闭当前页面，返回上一页面
- wx.reLaunch - 关闭所有页面，打开到应用内的某个页面

### 网络请求

- wx.request - 发起 HTTPS 网络请求
- wx.uploadFile - 上传文件
- wx.downloadFile - 下载文件
- wx.connectSocket - 创建 WebSocket 连接
- wx.onSocketOpen - 监听 WebSocket 连接打开事件

### 数据缓存

- wx.setStorage / wx.setStorageSync - 异步/同步设置本地缓存
- wx.getStorage / wx.getStorageSync - 异步/同步获取本地缓存
- wx.removeStorage / wx.removeStorageSync - 异步/同步删除本地缓存
- wx.clearStorage / wx.clearStorageSync - 异步/同步清理本地缓存

### 界面交互

- wx.showToast - 显示消息提示框
- wx.showModal - 显示模态对话框
- wx.showLoading / wx.hideLoading - 显示/隐藏加载提示
- wx.showActionSheet - 显示操作菜单
- wx.setNavigationBarTitle - 动态设置当前页面的标题

## 性能优化

1. **图片优化**
   - 使用 WebP 格式图片
   - 合理压缩图片大小
   - 使用 CDN 加速图片加载
   - 图片懒加载

2. **代码包优化**
   - 控制代码包大小（总包不超过 32MB，主包不超过 2MB）
   - 分包加载策略
   - 及时清理无用代码和资源
   - 使用分包预下载

3. **渲染优化**
   - 避免频繁 setData
   - 减少 setData 数据量
   - 使用 wx:key 提升列表渲染性能
   - 避免在渲染层和逻辑层之间传递大量数据

4. **网络优化**
   - 合理使用缓存策略
   - 请求合并和延迟加载
   - 使用 HTTP/2 提升请求效率
   - 对于重复请求进行防抖处理

## 常见问题及解决方案

1. **setData 性能问题**
   - 避免一次性传递大量数据
   - 避免频繁调用 setData
   - 只传递需要变更的数据
   - 使用节流函数控制 setData 的调用频率

2. **页面白屏问题**
   - 合理使用骨架屏
   - 预加载关键数据
   - 优化首屏渲染逻辑
   - 使用分包预下载

3. **内存泄漏**
   - 及时清理定时器
   - 解绑事件监听器
   - 避免循环引用
   - 及时销毁无用的变量和对象

4. **兼容性问题**
   - 使用 wx.canIUse 检查接口兼容性
   - 对于新特性做好降级处理
   - 注意基础库版本差异

5. **用户体验问题**
   - 添加加载提示，避免用户误认为页面无响应
   - 对于耗时操作提供取消功能
   - 合理使用页面切换动画

## WXML 和 WXSS

### WXML（WeiXin Markup Language）

WXML 是微信小程序的视图结构语言，类似于 HTML，但具有更多小程序特有的功能。

#### 基本语法

1. **数据绑定**

   ```xml
   <!-- 内容绑定 -->
   <view>{{message}}</view>

   <!-- 属性绑定 -->
   <view id="{{elementId}}">{{message}}</view>

   <!-- 布尔属性绑定 -->
   <checkbox checked="{{isChecked}}" />
   ```

2. **列表渲染**

   ```xml
   <view wx:for="{{items}}" wx:key="id">
     {{index}}: {{item.name}}
   </view>
   ```

3. **条件渲染**

   ```xml
   <!-- if/elif/else -->
   <view wx:if="{{type === 1}}">Type 1</view>
   <view wx:elif="{{type === 2}}">Type 2</view>
   <view wx:else>Other Type</view>

   <!-- hidden 控制显示隐藏 -->
   <view hidden="{{hiddenFlag}}">可见性控制</view>
   ```

4. **模板引用**

   ```xml
   <!-- 定义模板 -->
   <template name="msgItem">
     <view>{{index}}: {{msg}}</view>
   </template>

   <!-- 使用模板 -->
   <template is="msgItem" data="{{...item}}" />
   ```

5. **事件绑定**
   ```xml
   <view bindtap="tapHandler">点击我</view>
   <view catchtap="tapHandler">阻止事件冒泡</view>
   ```

#### WXML 特性

- 支持数据绑定、列表渲染、条件渲染等动态功能
- 提供丰富的内置组件
- 支持模板和引用机制
- 支持事件系统

### WXSS（WeiXin Style Sheets）

WXSS 是微信小程序的样式语言，基于 CSS 扩展了部分特性。

#### 与 CSS 的区别

1. **尺寸单位**
   - rpx（responsive pixel）：小程序独有的响应式单位，可根据屏幕宽度自适应
   - rem：与根元素字体大小相关的单位

2. **样式导入**

   ```css
   @import "common.wxss";
   ```

3. **内联样式**
   ```xml
   <view style="color: {{color}};">动态样式</view>
   ```

#### 选择器支持

- 类选择器（.class）
- ID 选择器（#id）
- 元素选择器（element）
- 伪类选择器（:active、:first-child 等）

#### 全局样式与局部样式

- app.wxss：全局样式，作用于所有页面
- page.wxss：页面样式，只作用于当前页面
- component.wxss：组件样式，只作用于当前组件

#### 样式优先级

内联样式 > ID 选择器 > 类选择器 > 标签选择器

## 发布上线

### 版本管理

小程序有三种版本概念：

1. **开发版本**：开发者工具上传的版本，仅开发者和体验者可以访问
2. **审核版本**：提交审核中的版本，无法访问
3. **线上版本**：审核通过并发布的版本，所有用户可以访问

### 发布流程

1. **代码上传**
   - 在微信开发者工具中点击"上传"按钮
   - 填写版本号和项目备注
   - 等待上传完成

2. **提交审核**
   - 登录微信公众平台
   - 进入小程序管理后台
   - 选择"开发管理"->"开发版本"
   - 点击"提交审核"按钮
   - 填写审核信息（页面路径、功能介绍、截图等）

3. **审核要点**
   - 确保功能完整可用
   - 提供必要的类目和资质
   - 遵守小程序审核规范
   - 提供清晰的功能截图和说明

4. **发布上线**
   - 审核通过后，在"审核版本"中点击"发布"
   - 确认发布后，小程序即可在线上访问

### 版本回退

如果线上版本出现问题，可以进行版本回退：

1. 进入小程序管理后台
2. 选择"开发管理"->"线上版本"
3. 找到需要回退的版本
4. 点击"回退"按钮

### 运营数据分析

发布后可通过后台查看小程序的运营数据：

1. **用户分析**：新增用户、活跃用户、用户画像等
2. **访问分析**：页面访问、用户行为、访问趋势等
3. **性能分析**：加载性能、崩溃情况等
4. **渠道分析**：不同入口来源的用户数据

### 更新策略

1. **热更新**：通过更新配置或数据实现部分功能更新
2. **版本更新**：通过发布新版本实现功能更新
3. **灰度发布**：先向部分用户发布新功能，验证后再全面上线

## 状态管理

### 全局状态管理

#### 1. 使用全局变量（简单场景）

```javascript
// app.js
App({
  globalData: {
    userInfo: null,
    token: "",
  },

  // 更新全局数据的方法
  updateUserInfo(userInfo) {
    this.globalData.userInfo = userInfo;
  },
});

// 页面中使用
const app = getApp();
Page({
  onLoad() {
    console.log(app.globalData.userInfo);
    app.updateUserInfo({ name: "Tom" });
  },
});
```

#### 2. 使用 getApp() 方法访问全局实例

```javascript
// 在页面中获取全局数据
const app = getApp();
console.log(app.globalData);

// 修改全局数据
app.globalData.token = "new-token";
```

### 页面间数据传递

1. **URL 参数传递**（适用于简单数据）

   ```javascript
   // 传递数据
   wx.navigateTo({
     url: "/pages/detail/detail?id=123&name=product",
   });

   // 接收数据
   Page({
     onLoad(options) {
       console.log(options.id, options.name);
     },
   });
   ```

2. **全局变量传递**（适用于复杂数据）
3. **本地存储**（适用于需要持久化的数据）

### 第三方状态管理方案

#### MobX 绑定辅助库

对于复杂项目，可以引入 mobx-miniprogram 和 mobx-miniprogram-bindings 实现响应式状态管理：

```javascript
// store.js
import { observable, action } from "mobx-miniprogram";

export const store = observable({
  // 数据字段
  msg: "Hello",

  // 计算属性
  get msgDouble() {
    return this.msg + this.msg;
  },

  // actions
  updateMsg: action(function (msg) {
    this.msg = msg;
  }),
});

// 页面中使用
import { createBindings } from "mobx-miniprogram-bindings";
import { store } from "../../store/store";

Page({
  onLoad() {
    // 绑定 store 到页面
    createBindings(this, {
      store,
      fields: ["msg", "msgDouble"],
      actions: ["updateMsg"],
    });
  },
});
```

#### Redux 状态管理

也可以使用 Redux 作为状态管理方案：

```javascript
// store/index.js
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);
export default store;

// 页面中使用
import store from "../../store/index";

Page({
  onLoad() {
    // 获取状态
    this.setData({
      state: store.getState(),
    });

    // 订阅状态变化
    store.subscribe(() => {
      this.setData({
        state: store.getState(),
      });
    });
  },
});
```
