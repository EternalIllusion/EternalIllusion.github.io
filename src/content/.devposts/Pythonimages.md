---
title: Python资源合集（持续更新）
image: https://p1.ssl.qhimg.com/t010d1433ef39d6d0cf.jpg
category: 教程
description: Python资源合集
draft: true
published: 2024-12-17
tags:
- Python
---

# 安装包镜像
[阿里云](https://mirrors.aliyun.com/python-release/)|[华为云](https://mirrors.huaweicloud.com/python/)
# pip镜像
[阿里云源](https://mirrors.aliyun.com/pypi/simple/)|[中科大源](https://mirrors.ustc.edu.cn/pypi/simple/)|[清华源](https://pypi.tuna.tsinghua.edu.cn/simple)|[豆瓣源](https://pypi.douban.com/simple)

## pip源使用
临时使用：
```cmd
pip install 包名 -i 源URL
```
永久切换：

在用户目录\pip下建立或修改`pip.ini`
（如果使用Linux系统用户目录改为/home/用户名）
```ini
[global]
index-url = 源URL
[install]
trusted-host = 同上，保持一致
```