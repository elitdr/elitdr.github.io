---
outline: deep
---

# Ubuntu

## 解压缩文件

### 解压命令

```sh
tar -zxvf filename.tar.gz -C destination_folder
```

1. `-z` 表示用gzip解压
2. `-x` 表示解压缩
3. `-v` 表示显示过程(verbose)
4. `-f` 表示指定文件名
5. `-C` 表示指定解压目录

### 压缩命令

```sh
tar -zcvf archive_name.tar.gz directory_name
```

1. `-z` 表示用gzip解压
2. `-c` 表示创建新的压缩文件
3. `-v` 表示显示过程(verbose)
4. `-f` 表示指定文件名
