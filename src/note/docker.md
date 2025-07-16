---
outline: deep
---

# Docker

## 镜像

### 拉取镜像

```sh
docker pull <image>
```

#### 指定架构

```sh
docker pull --platform=<os> <image>
```

### 查看镜像

```sh
docker images
```

### 删除镜像

```sh
docker <image>
```

## 容器

### 创建并运行

```sh
docker run <image>
```

#### 后台运行

```sh
docker run <image> -d
```

#### 端口映射

```sh
docker run <image> -p <host port>:<container port>
```

#### 指定挂载卷

```sh
docker run <image> -v <host path>|<volume>:<container path>
```

#### 环境变量

```sh
docker run <image> -e <key>=<value>
```

#### 指定容器名

```sh
docker run <image> --name <container name>
```

#### 停止时删除

```sh
docker run <image> --rm
```

#### 交互模式

```sh
docker run <image> --it
```

#### 守护模式

```sh
docker run <image> --restart always|unless-stopped
```

### 启动容器

```sh
docker start <container>
```

### 停止容器

```sh
docker stop <container>
```

### 查看容器

```sh
docker ps
```

#### 查看所有容器

```sh
docker ps -a
```

### 删除容器

```sh
docker rm <container>
```

#### 强制删除

```sh
docker rm -f <container>
```

## 挂载卷

### 创建挂载卷

```sh
docker volume create <volume>
```

### 查看挂载卷

```sh
docker volume list
```

#### 挂载卷信息

```sh
docker volume inspect <volume>
```

### 删除挂载卷

```sh
docker volume rm <volume>
```

#### 删除未使用

```sh
docker volume prune -a
```

## 查看容器日志

```sh
docker logs <container>
```

### 追踪日志

```sh
docker logs <container> -f
```

## docker hub

### 个人镜像

#### Dockerfile

```dockerfile
# 使用官方 Ubuntu 基础镜像
FROM ubuntu:22.04

# 安装系统依赖
RUN apt-get update && \
    apt-get install -y curl gnupg2 ca-certificates lsb-release software-properties-common && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 安装指定版本的 Nginx (1.24.0)
RUN curl -O https://nginx.org/keys/nginx_signing.key && \
    apt-key add nginx_signing.key && \
    echo "deb http://nginx.org/packages/ubuntu jammy nginx" > /etc/apt/sources.list.d/nginx.list && \
    apt-get update && \
    apt-get install -y nginx=1.24.0-1~jammy && \
    rm nginx_signing.key

# 安装指定版本的 Node.js (18.20.*)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs=18.20.*

# 全局安装 PM2 (最新版)
RUN npm install -g pm2

# 暴露默认端口
EXPOSE 80 3000

# 默认运行 Nginx
CMD ["nginx", "-g", "daemon off;"]
```

1. **curl**: 用于从网络下载文件（例如，我们用它下载Nginx的签名密钥和NodeSource的安装脚本）。
2. **gnupg2**: GNU Privacy Guard 2，用于管理GPG密钥，我们用它来导入Nginx的签名密钥，以验证软件包的真实性。
3. **ca-certificates**: 包含了一组受信任的根证书，用于验证SSL/TLS连接的安全性（例如，当我们通过HTTPS下载文件时，需要这些证书来验证服务器的身份）。
4. **lsb-release**: 提供LSB（Linux Standard Base）版本信息，我们可以通过它获取当前系统的发行版代号（如Ubuntu 22.04的代号是jammy）。这样在添加软件源时，我们可以动态地使用正确的发行版代号。
5. **software-properties-common**: 提供了一些脚本和工具，用于管理软件源（例如，添加PPA源）。虽然在这个Dockerfile中我们没有直接使用`add-apt-repository`命令，但安装这个包可以确保我们能够使用一些常用的源管理功能。
