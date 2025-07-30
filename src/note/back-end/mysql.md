# MySQL

MySQL 是世界上最流行的开源关系型数据库管理系统之一，广泛应用于 Web 应用开发中。

## 连接与断开

### 连接数据库

```sh
mysql -u 用户名 -p
```

常用选项：

| 选项 | 示例             | 说明         |
| :--- | :--------------- | :----------- |
| `-u` | `-u root`        | 指定用户名   |
| `-p` | `-p` 或 `-p1234` | 指定密码     |
| `-h` | `-h 127.0.0.1`   | 指定主机地址 |
| `-P` | `-P 3306`        | 指定端口     |

示例：

连接本地 MySQL 数据库：

```sh
mysql -u root -p
```

连接远程 MySQL 数据库：

```sh
mysql -h 192.168.1.100 -P 3306 -u root -p
```

### 退出数据库

```sql
exit;
-- 或者
quit;
```

## 数据库操作

### 查看数据库

```sql
SHOW DATABASES;
```

### 创建数据库

```sql
CREATE DATABASE 数据库名;
```

示例：

```sql
CREATE DATABASE myapp;
```

创建指定字符集的数据库：

```sql
CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 选择数据库

```sql
USE 数据库名;
```

示例：

```sql
USE myapp;
```

### 删除数据库

```sql
DROP DATABASE 数据库名;
```

示例：

```sql
DROP DATABASE myapp;
```

## 表操作

### 查看表

查看当前数据库中的所有表：

```sql
SHOW TABLES;
```

查看表结构：

```sql
DESCRIBE 表名;
-- 或者
SHOW COLUMNS FROM 表名;
```

### 创建表

```sql
CREATE TABLE 表名 (
  字段名1 数据类型 约束条件,
  字段名2 数据类型 约束条件,
  ...
);
```

常用数据类型：

| 类型         | 说明           |
| :----------- | :------------- |
| INT          | 整数型         |
| VARCHAR(n)   | 可变长度字符串 |
| TEXT         | 长文本         |
| DATETIME     | 日期时间       |
| DECIMAL(m,n) | 精确数值       |

常用约束条件：

| 约束           | 说明     |
| :------------- | :------- |
| PRIMARY KEY    | 主键     |
| NOT NULL       | 非空     |
| UNIQUE         | 唯一     |
| DEFAULT        | 默认值   |
| AUTO_INCREMENT | 自动递增 |

示例：

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 删除表

```sql
DROP TABLE 表名;
```

示例：

```sql
DROP TABLE users;
```

## 数据操作

### 插入数据

```sql
INSERT INTO 表名 (字段1, 字段2, ...) VALUES (值1, 值2, ...);
```

示例：

```sql
INSERT INTO users (username, email) VALUES ('john_doe', 'john@example.com');
```

插入多条数据：

```sql
INSERT INTO users (username, email) VALUES
  ('john_doe', 'john@example.com'),
  ('jane_smith', 'jane@example.com');
```

### 查询数据

基本查询语法：

```sql
SELECT 字段1, 字段2, ... FROM 表名 WHERE 条件;
```

查询所有字段：

```sql
SELECT * FROM 表名;
```

示例：

```sql
SELECT * FROM users;
SELECT username, email FROM users WHERE id = 1;
```

### 更新数据

```sql
UPDATE 表名 SET 字段1 = 值1, 字段2 = 值2 WHERE 条件;
```

示例：

```sql
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;
```

### 删除数据

```sql
DELETE FROM 表名 WHERE 条件;
```

示例：

```sql
DELETE FROM users WHERE id = 1;
```

## 索引操作

### 创建索引

```sql
CREATE INDEX 索引名 ON 表名 (字段名);
```

示例：

```sql
CREATE INDEX idx_username ON users (username);
```

### 查看索引

```sql
SHOW INDEX FROM 表名;
```

### 删除索引

```sql
DROP INDEX 索引名 ON 表名;
```

示例：

```sql
DROP INDEX idx_username ON users;
```

## 用户权限管理

### 创建用户

```sql
CREATE USER '用户名'@'主机' IDENTIFIED BY '密码';
```

示例：

```sql
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'password123';
```

### 授权

```sql
GRANT 权限 ON 数据库.表 TO '用户名'@'主机';
```

示例：

```sql
-- 授予特定数据库的所有权限
GRANT ALL PRIVILEGES ON myapp.* TO 'appuser'@'localhost';

-- 授予特定表的查询权限
GRANT SELECT ON myapp.users TO 'appuser'@'localhost';
```

刷新权限：

```sql
FLUSH PRIVILEGES;
```

### 查看用户权限

```sql
SHOW GRANTS FOR '用户名'@'主机';
```

### 撤销权限

```sql
REVOKE 权限 ON 数据库.表 FROM '用户名'@'主机';
```

示例：

```sql
REVOKE DELETE ON myapp.* FROM 'appuser'@'localhost';
```

### 删除用户

```sql
DROP USER '用户名'@'主机';
```

示例：

```sql
DROP USER 'appuser'@'localhost';
```

## 数据备份与恢复

### 备份数据库

使用 mysqldump 命令备份：

```sh
mysqldump -u 用户名 -p 数据库名 > 备份文件.sql
```

示例：

```sh
mysqldump -u root -p myapp > myapp_backup.sql
```

### 恢复数据库

```sh
mysql -u 用户名 -p 数据库名 < 备份文件.sql
```

示例：

```sh
mysql -u root -p myapp < myapp_backup.sql
```
