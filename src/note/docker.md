---
outline: deep
---

# Docker

Docker 常用命令

## 一、镜像

### 拉取

```sh
docker pull <image>
```

#### 参数

|     参数     |       用法        |   描述   |
| :----------: | :---------------: | :------: |
| `--platform` | `--platform=<os>` | 指定架构 |

### 构建

```sh
docker build -t <origin/image:tag> <Dockerfile>
```

### 发布

```sh
docker push <origin/image:tag>
```

### 查看

```sh
docker images
```

### 删除

```sh
docker rmi <image>
```

## 二、容器

### 创建

```sh
docker run <image>
```

#### 参数

|    参数     |                 用法                 |        描述        |
| :---------: | :----------------------------------: | :----------------: |
|    `-d`     |                 `-d`                 |      后台运行      |
|    `-p`     |       `-p <host>:<container>`        |      端口映射      |
|    `-v`     |   `-v <host｜volume>:<container>`    |       挂载卷       |
|    `-e`     |          `-e <key>=<value>`          |      环境变量      |
|  `--name`   |         `--name <container>`         |       容器名       |
|   `--rm`    |                `--rm`                | 容器停止时自动删除 |
| `--restart` | `--restart <always｜unless-stopped>` |      守护模式      |
| `--network` |     `--network <network｜host>`      |        网络        |

### 执行命令

```sh
docker exec [OPTIONS] <container> <command>
```

#### 参数

|  参数  |  用法  |   描述   |
| :----: | :----: | :------: |
| `--it` | `--it` | 交互模式 |

### 启动

```sh
docker start <container>
```

### 停止

```sh
docker stop <container>
```

### 查看

```sh
docker ps
```

#### 参数

| 参数 | 用法 |     描述     |
| :--: | :--: | :----------: |
| `-a` | `-a` | 查看所有容器 |

### 删除

```sh
docker rm <container>
```

#### 参数

| 参数 |       用法       |   描述   |
| :--: | :--------------: | :------: |
| `-f` | `-f <container>` | 强制删除 |

## 三、挂载卷

### 创建

```sh
docker volume create <volume>
```

### 查看

```sh
docker volume list
```

#### 查看详情

```sh
docker volume inspect <volume>
```

### 删除

```sh
docker volume rm <volume>
```

#### 删除未使用

```sh
docker volume prune -a
```

## 四、网络

容器之间可以通过创建子网相互通信。

### 创建

```sh
docker network create <network>
```

## 五、日志

```sh
docker logs <container>
```

#### 参数

| 参数 | 用法 |   描述   |
| :--: | :--: | :------: |
| `-f` | `-f` | 追踪日志 |

## 六、Dockerfile

### Dockerfile 基础模板

::: code-group

```Dockerfile [Dockerfile]
FROM <image>

WORKDIR <path>

COPY <src> <dest>

RUN <command>

EXPOSE <port>

CMD <command>
```

:::

## 七、Docker Compose

Docker Compose 是用于批量管理容器的工具。

### Docker Compose 基础模板

Docker Compose 会自动将所有容器加入到同一个子网。

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

### 启动

```sh
docker-compose up
```

#### 参数

|   参数    |   用法    |   描述   |
| :-------: | :-------: | :------: |
|   `-d`    |   `-d`    | 后台运行 |
| `--build` | `--build` |   构建   |

### 停止

```sh
docker-compose down
```

### 查看

```sh
docker-compose ps
```
