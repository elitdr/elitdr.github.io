# React Native

个人学习笔记，只记录遇到的问题和个人认为的重点部分，详细内容请参考 [React Native 官方文档](https://reactnative.dev)。

> 记录于 2025 年 12 月 18 日，设备为安装 macOS Sonoma 14.7.8 系统 Inter + ADM 显卡的黑苹果，React Native 版本为 0.83，Xcode 版本为 16.2，Android Studio 版本为 2025.2.2。{#current-environment}

## 运行 iOS 项目时遇到的问题

由于 MacOS 自带的 Ruby 版本老旧，且缺少开发头文件。

在创建项目的时候会提示是否安装 CocoaPods，选择安装会导致报错（原因如上所述，建议选择否后续手动处理），但是项目可以正常初始化。

**第一步：安装 Ruby**

建议使用 rbenv 安装一个较新的 Ruby 版本。

```sh
brew install rbenv ruby-build
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
source ~/.zshrc
rbenv install 3.2.2
rbenv global 3.2.2
```

**第二步：安装 CocoaPods**

建议使用 brew 安装 CocoaPods。

```sh
brew install cocoapods
```

**第三步：安装依赖**

重新安装 iOS 项目需要的依赖，确保代理能够稳定访问（需要下载大量依赖），完成后即可正常启动项目。

1. `cd ios` 导航到项目根目录下的 ios 文件夹。
2. `bundle install` 安装 Bundler。
3. `bundle exec pod install` 安装由 CocoaPods 管理的 iOS 依赖项。

## 运行 Android 项目时遇到的问题

经过测试，在[当前环境](#current-environment)下只能使用版本为 Android 11 及以下的 Android Studio 虚拟机。

::: warning 注意：
React Native 中文网没有列出设置 JAVA_HOME 的步骤，需将以下命令添加到 ~/.zshrc 文件中。

`export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`
:::

执行 `npx react-native doctor` 命令可以检查环境是否配置正确。

关于以下问题，React Native 中英文网都没有提到如何处理。

```sh
 ✖ Android SDK - Required for building and installing your app on Android
   - Versions found: N/A
```

经过测试，发现需要安装 **SDK Tools > Android SDK Command-line Tools** 工具，网上提到建议安装旧版本，并且需要配置环境变量，但是在[当前环境](#current-environment)下使用当前最新版 **Android SDK Command-line Tools 19.0**，没有配置环境变量也可正常启动项目，前提是严格按照 React Native 英文网配置。

至此，iOS 和 Android 项目均可以正常启动了。

## 布局

在 React Native 中， View 使用弹性盒模型（Flexbox）来为子元素布局。

## 平台

React Native 提供了两种方法来区分平台：

- 使用 Platform 模块
- 使用特定平台后缀

### Platform 模块

`Platform.OS` 在 iOS 上会返回 `ios`，而在 Android 环境则会返回 `android`。

还有个实用的方法是 `Platform.select()`，它以 `Platform.OS` 为 key，从传入的对象中返回对应平台的值，见下面的示例：

```jsx
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: "red",
      },
      android: {
        backgroundColor: "blue",
      },
    }),
  },
});
```

#### 检测 Android 版本

在 Android 上，Version 属性是一个数字，表示 Android 的 api level：

```jsx
import { Platform } from "react-native";

if (Platform.Version === 25) {
  console.log("Running on Nougat!");
}
```

#### 检测 iOS 版本

在 iOS 上，Version 属性是 `-[UIDevice systemVersion]` 的返回值，具体形式为一个表示当前系统版本的字符串。比如可能是"10.3"。

```jsx
import { Platform } from "react-native";

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log("Work around a change in behavior");
}
```

### 特定平台后缀

当不同平台的代码逻辑较为复杂时，最好是放到不同的文件里，这时候我们可以使用特定平台后缀。React Native 会检测某个文件是否具有 `.ios.` 或是 `.android.` 的后缀，然后根据当前运行的平台自动加载正确对应的文件。

比如你可以在项目中创建下面这样的组件：

```sh
BigButton.ios.js
BigButton.android.js
```

然后去掉平台后缀直接引用：

```jsx
import BigButton from "./BigButton";
```

React Native 会根据运行平台的不同自动引入正确对应的组件。

如果你还希望在 web 端复用 React Native 的代码，那么还可以使用 `.native.js` 的后缀。（注意目前官方并没有直接提供 web 端的支持，请在社区搜索第三方方案）。

## 强制刷新

在文件的任何地方增加 `// @refresh reset`，便可以清除缓存。

## 严格的 TypeScript API（选择加入）

> Strict TypeScript API 是我们未来用于 React Native 的稳定 JavaScript API 的预览。

以上是官方原话，这里建议采用最新的 TypeScript 配置。

```json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "customConditions": ["react-native-strict-api"] // [!code ++]
  }
}
```

## 样式

建议使用 `StyleSheet.create` 来集中定义组件的样式。比如像下面这样：

```jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LotsOfStyles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});

export default LotsOfStyles;
```

## 宽高

React Native 中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点。

## Flexbox 布局

React Native 中的 Flexbox 的工作原理和 web 上的 CSS 基本一致，当然也存在少许差异。首先是默认值不同：flexDirection 的默认值为 column（而不是 row），alignContent 默认值为 flex-start（而不是 stretch）, flexShrink 默认值为0 （而不是1）, 而 flex 只能指定一个数字值。

### Align Items

`stretch`（默认值）：将容器的子元素拉伸以匹配容器次轴的高度。

> 要使 stretch 选项生效，子元素在次轴方向上不能有固定尺寸。

### flexShrink

`flexShrink` 接受大于等于 0 的任意浮点数值，默认值为 0（在 Web 上，默认值为 1）。容器将按照各个子项的 flex shrink 值加权收缩它们。

## 环境变量

使用 `react-native-config` 来管理环境变量。

## 模块别名（绝对路径）

使用 `babel-plugin-module-resolver` 来配置模块别名。

## 导航器

使用 `react-navigation` 来管理导航器。
