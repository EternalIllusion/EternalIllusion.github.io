---
title: Linux系统从入门到入土1-基础操作
image: https://tse4-mm.cn.bing.net/th/id/OIP-C.lh4fi-Kapb51zrbET9aXQQAAAA?pid=ImgDetMain
category: 教程
description: 给你的Alist添加更好看的主题！
draft: true
published: 2024-12-17
tags:
- linux
- 教程
---

> This page is under writing.
# 文件处理
## 文本编辑器|Nano
Nano是一款开源文本编辑器，一般来说会包含在你的系统里。要启动nano，你可以输入：`nano [文件名]`来启动nano。如果你要使用nano修改系统文件，请使用sudo。

### 界面
Nano界面如下：

> `GNU nano 7.2&emsp;&emsp;  文件名&emsp;&emsp;&emsp;&emsp;   `
> 
> 正文内容
> 
> `^G` Help&emsp;  `^O` Write Out `^W` Where Is  `^K` Cut&emsp;   `^T` Execute   `^C` Location
> 
> `^X` Exit&emsp;  `^R` Read File `^\` Replace   `^U` Paste&emsp; `^J` Justify   `^/` Go To Line
### 操作
Nano的操作在界面下方全部展示，`^`代表`Ctrl`。如需退出，按下`Ctrl+X`，输入y/n选择是否保存，确定文件名即可退出。

## 文本编辑器|Vim
Vim也是一款开源文本编辑器，一般来说会包含在你的系统里。要启动Vim，你可以输入：`vim <文件名>`来启动vim。如果你要使用Vim修改系统文件，请使用sudo。
### 界面
Vim界面如下：

> ~
> 
> ~
> 
> `&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  0,0-1&emsp;&emsp; All`
### 基本操作
vim使用方向键来操作光标，按`i`进入编辑模式，按`ESC`退出编辑模式。按下`:`进入命令行，输入`w`保存，输入`q`退出，输入`qa!`强制退出，输入`help`打开帮助。例：输入`:wq`保存并退出。