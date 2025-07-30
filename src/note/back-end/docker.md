# Docker

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

## 镜像（Image）

Docker 镜像是一个只读的模板，用来创建 Docker 容器。

> 镜像的结构为：`<origin/image:tag>`

### 拉取镜像

```sh
docker pull [OPTIONS] <image>
```

| 选项         | 示例              | 说明     |
| :----------- | :---------------- | :------- |
| `--platform` | `--platform=<os>` | 指定架构 |

### 构建镜像

```sh
docker build [OPTIONS] <image> .
```

| 选项          | 示例                     | 说明                           |
| :------------ | :----------------------- | :----------------------------- |
| `-t`          | `-t name:tag`            | 设置镜像名称和标签             |
| `-f`          | `-f path/to/Dockerfile`  | 指定 Dockerfile 路径           |
| `--build-arg` | `--build-arg key=value`  | 设置构建时变量                 |
| `--no-cache`  | `--no-cache`             | 不使用缓存构建                 |
| `--platform`  | `--platform linux/amd64` | 指定平台架构                   |
| `--target`    | `--target production`    | 设置目标构建阶段               |
| `--pull`      | `--pull`                 | 总是拉取最新基础镜像           |
| `--rm`        | `--rm`                   | 构建成功后删除中间容器（默认） |

### 发布镜像

```sh
docker push <image>
```

### 查看镜像

```sh
docker images
```

### 删除镜像

```sh
docker rmi <image>
```

## 容器（Container）

Docker 容器是镜像的运行实例，可以被启动、开始、停止、删除。

### 创建并运行容器

```sh
docker run <image>
```

| 选项        | 示例                                 | 说明               |
| :---------- | :----------------------------------- | :----------------- |
| `-d`        | `-d`                                 | 后台运行           |
| `-p`        | `-p <host>:<container>`              | 端口映射           |
| `-v`        | `-v <host｜volume>:<container>`      | 挂载卷             |
| `-e`        | `-e <key>=<value>`                   | 环境变量           |
| `--name`    | `--name <container>`                 | 容器名             |
| `--rm`      | `--rm`                               | 容器停止时自动删除 |
| `--restart` | `--restart <always｜unless-stopped>` | 守护模式           |
| `--network` | `--network <network｜host>`          | 网络               |

### 执行命令

```sh
docker exec [OPTIONS] <container> <command>
```

| 选项   | 示例   | 说明     |
| :----- | :----- | :------- |
| `--it` | `--it` | 交互模式 |

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

| 选项 | 示例 | 说明         |
| :--- | :--- | :----------- |
| `-a` | `-a` | 查看所有容器 |

### 删除容器

```sh
docker rm <container>
```

| 选项 | 示例             | 说明     |
| :--- | :--------------- | :------- |
| `-f` | `-f <container>` | 强制删除 |

## 挂载卷（Volume）

Docker 卷用于持久化数据，独立于容器的生命周期。

### 创建卷

```sh
docker volume create <volume>
```

### 查看卷

```sh
docker volume list
```

### 查看卷详情

```sh
docker volume inspect <volume>
```

### 删除卷

```sh
docker volume rm <volume>
```

### 删除未使用的卷

```sh
docker volume prune -a
```

## 网络（Network）

Docker 提供了多种网络驱动，相同子网下的容器可以通过子网名称进行通信。

### 创建网络

```sh
docker network create <network>
```

## 日志管理

查看容器日志是调试和监控容器应用的重要手段。

```sh
docker logs <container>
```

| 选项 | 示例 | 说明     |
| :--- | :--- | :------- |
| `-f` | `-f` | 追踪日志 |

## Dockerfile

Dockerfile 是一个文本文件，其中包含构建 Docker 镜像的指令。

### 模板

::: code-group

```Dockerfile [Dockerfile]
FROM <image>

WORKDIR <path>

COPY <src> <dest>

RUN <command>

EXPOSE <port>

CMD ["<command>"]
```

:::

## Docker Compose

Docker Compose 是用于批量管理容器的工具，通过 YAML 文件定义和运行多容器 Docker 应用程序。

> Docker Compose 会自动将所有容器加入到同一个子网。

### 模板

::: code-group

```yaml [docker-compose.yml]
version: "3.8" # 推荐使用最新稳定版本

services:
  app: # 应用服务名，可自定义
    image: node:20
    working_dir: /app
    volumes:
      - ./:/app
    ports:
      - "3000:3000"
    command: npm run dev # 启动命令
    environment:
      - NODE_ENV=development
    depends_on:
      - db # 确保 db 先启动

  db: # 数据库服务
    image: postgres:16
    restart: always
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

:::

### 启动服务

```sh
docker-compose up
```

| 选项      | 示例      | 说明     |
| :-------- | :-------- | :------- |
| `-d`      | `-d`      | 后台运行 |
| `--build` | `--build` | 构建     |

### 停止服务

```sh
docker-compose down
```

### 查看服务状态

```sh
docker-compose ps
```
