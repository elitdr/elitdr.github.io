# React Native 学习

**记录于 2025 年 12 月 18 日，设备为安装 macOS Sonoma 14.7.8 系统 Inter + ADM 显卡的黑苹果，React Native 版本为 0.83，Xcode 版本为 16.2，Android Studio 版本为 2025.2.2。**{#current-environment}

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

经过测试，发现需要安装 `SDK Tools > Android SDK Command-line Tools` 工具，网上提到建议安装旧版本，并且需要配置环境变量，但是在[当前环境](#current-environment)下使用当前最新版 `Android SDK Command-line Tools 19.0`，没有配置环境变量也可正常启动项目，前提是严格按照 React Native 英文网配置。

**至此，iOS 和 Android 项目均可以正常启动了**。
