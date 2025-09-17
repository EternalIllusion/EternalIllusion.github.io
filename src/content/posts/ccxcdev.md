---
title: 'ccxc部署小白教程（踩坑记录）'
published: 2025-09-17
description: '笔者在CCXC-Engine部署过程中踩的坑以及部署ccxc引擎的小白向教程'
image: 'https://engine.ccbcarchive.com/ccxc-engine-logo.png'
category: 教程
draft: false
tags:
- 密码菌
- CCBC
- PuzzleHunt
---

CCXC是个非常好的PuzzleHunt后台引擎，这篇文章会教学如何从0开始部署一个私有化的CCXC引擎，当然您也可以查看：[官方部署文档](https://engine.ccbcarchive.com/guide/deployment.html)

> [!TIP]
> 我们正在筹建一个预计于每年寒假举办的CCBC的fanmade赛事，如果您有兴趣加入出题组或者内测组，亦或者您有美工或者设计方面的才能，欢迎您加入！群号：[1061351084(点击加群)](https://qm.qq.com/q/IW4u3LjbeS)

## 硬件准备

- 一台服务器

- 一个域名（自己体验的话也可以没有）

> 推荐使用大陆外的Ubuntu 22.04 LTS服务器。
> 
> 如果没有服务器，使用自己的电脑也可以。使用国内服务器的化，请确保域名已经备案。使用自己的域名的话请务必确保**域名能正确访问到你的服务器**，并且80和443端口正常开放

> [!WARNING]
> 如果你没有自己的域名，请注意你只能在服务器上访问体验CCXC引擎，如果你想给别人用或者搭建服务器请自备域名

### 域名配置

**如果你没有域名请跳过！**

```
yourdomain.com          -> 你的服务器 IP
api.yourdomain.com      -> 你的服务器 IP
static.yourdomain.com   -> 你的服务器 IP
admin.yourdomain.com    -> 你的服务器 IP
puzzle.yourdomain.com   -> 你的服务器 IP
```

将以上DNS记录添加到你的域名中，将`yourdomain.com`替换为你自己的域名。[如何添加DNS记录？](https://toolshu.com/baidu?%E5%9F%9F%E5%90%8D%E6%B7%BB%E5%8A%A0DNS%E8%AE%B0%E5%BD%95)

## 环境搭建

你必须安装并配置以下组件：

- git
- node.js *v22.0.0 或更高版本*
- .NET 8.0 *运行时或SDK*
- 至少一个文本编辑器
- MariaDB
- Redis

你最好安装并配置以下组件：*(这些组件是部署服务器才需要的)*

- mkcert
- PM2
- Nginx

### 基本环境搭建

> [!TIPS]
> 如果你是Windows用户请自行下载安装以下软件：
>
> - [Git Bash](https://gitforwindows.org/)
> - [Node.js v22.0.0 或更高版本](https://nodejs.org/en/download/)
> - [.NET 8.0 运行时或SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
> - [MariaDB for Windows](https://mariadb.com/downloads/)
> - [Redis Windows](https://developer.aliyun.com/article/1395346)

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install -y git
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb
sudo apt update
sudo apt install -y apt-transport-https
sudo apt update
sudo apt install -y dotnet-sdk-8.0
sudo npm install -g pm2
pm2 --version
```

请把上面的代码一行一行黏贴到服务器控制台的终端部分,如果要求输入密码请输入当前账号的密码。输入密码时不会显示任何内容，请你仔细输入。

### 数据库安装与配置

```bash
sudo apt install -y mariadb-server
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation
```

> [!WARNING]
> 这一步有坑！！！

运行最后一行之后会跳出这样的文字，【】内是你需要输入的文本，输入完之后记得按回车，windows下也是差不多的，主要是关掉大部分不必要甚至会导致后端运行不起来的安全选项。

```
NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MariaDB to secure it, we'll need the current
password for the root user. If you've just installed MariaDB, and
haven't set the root password yet, you should just press enter here.

Enter current password for root (enter for none): 【你的root密码，不知道的话去找服务器厂商客服咨询】
OK, successfully used password, moving on...

Setting the root password or using the unix_socket ensures that nobody
can log into the MariaDB root user without the proper authorisation.

You already have your root account protected, so you can safely answer 'n'.

Switch to unix_socket authentication [Y/n] 【n】
 ... skipping.

You already have your root account protected, so you can safely answer 'n'.

Change the root password? [Y/n] 【n】
 ... skipping.

By default, a MariaDB installation has an anonymous user, allowing anyone
to log into MariaDB without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] 【n】
 ... skipping.

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] 【n】
 ... skipping.

By default, MariaDB comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] 【n】
 ... skipping.

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] 【Y】
 ... Success!

Cleaning up...

All done!  If you've completed all of the above steps, your MariaDB
installation should now be secure.

Thanks for using MariaDB!
```

接下来就是数据库初始化步骤.

```bash
mysql -u root -p
```

```mysql
CREATE DATABASE ccxc_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ccxc_user'@'localhost' IDENTIFIED BY '！！这里填一个密码！！';
```

注意把`！！这里填一个密码！！`换成你自己的密码，不要输入中文

```mysql
GRANT ALL PRIVILEGES ON ccxc_prod.* TO 'ccxc_user'@'localhost';
GRANT SELECT ON information_schema.* TO 'ccxc_user'@'localhost';
```

> [!WARNING]
> 这一步有坑！！！输入上面第二行可能会有报错，不用管！

```mysql
FLUSH PRIVILEGES;
EXIT;
```

恭喜，你的MariaDB已经配置完毕了！

### 缓存安装与配置

```bash
sudo apt install -y redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

接下来输入`redis-cli ping`,如果你看到一个`PONG`,就是安装成功了！恭喜！

### nginx安装与配置

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
sudo mkdir -p /var/www/static
sudo mkdir -p /var/www/ccxc/{admin,website,puzzle}
sudo chown -R www-data:www-data /var/www/
```

## 启动主后端

```bash
sudo mkdir -p /opt/ccxc-backend
cd /opt/ccxc-backend

sudo git clone https://github.com/cipherpuzzles/ccxc-backend.git src
cd src
```

> [!WARNING]
> 这一步有坑！！！如果你是自定义域名，你需要编辑`/opt/ccxc-backend/src/ccxc-backend/Config/SystemConfig.cs`并替换如下网址`public string ProjectFrontendPrefix { get; set; } = "https://www.ccxc.ikp.yt:13880";`为你的域名，不然到后面管理面板进不去！

```bash
sudo dotnet publish --configuration Release --runtime linux-x64 --self-contained false --output /opt/ccxc-backend/app

sudo chown -R www-data:www-data /opt/ccxc-backend
sudo chmod +x /opt/ccxc-backend/app/ccxc-backend
```

编辑`/opt/ccxc-backend/app/Config/ccxc.config.toml`:

```toml
[Config/CcxcConfig]
HttpPort = "52412"
RedisConnStr = "127.0.0.1:6379"
DbConnStr = "Server=localhost;User=ccxc_user;Database=ccxc_prod;Port=3306;Password=！！这里填之前数据库那个密码！！;Charset=utf8mb4;ConvertZeroDateTime=True"
DebugMode = "False"
ImageStorage = "/var/www/static/images/"
ImagePrefix = "https://static.yourdomain.com/images/"
PassHashKey1 = "！！这里填一个20字符长度的脸滚键盘字符串！！"
PassHashKey2 = "！！这里填一个20字符长度的脸滚键盘字符串！！"
AESMasterKey = "！！这里填一个32字符长度的脸滚键盘字符串！！"
AliyunDmAccessKey = "！！这里填阿里云AccessKey！！"
AliyunDmAccessSecret = "！！这里填阿里云AccessSecret！！"
```
[脸滚键盘字符生成器](https://www.lddgo.net/string/randompassword)排除字符填`"\`,设置好长度直接复制进来替换就行

阿里云邮件推送要求你拥有一个域名，所以如果你没有的话可以不填，后面会教怎么绕邮件激活。

> [!WARNING]
> 这一步有坑！！！你需要编辑`/opt/ccxc-backend/app/ccxc.service`:

```ini
[Unit]
Description=Ccxc Backend

[Service]
ExecStart=/opt/ccxc-backend/ccxc-backend
Restart=always
Environment=PATH=/usr/bin:/usr/local/bin:/usr/local/node/bin
WorkingDirectory=/opt/ccxc-backend/

[Install]
WantedBy=multi-user.target
```

接下来你需要执行以下命令：

```bash
sudo cp /opt/ccxc-backend/app/ccxc.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable ccxc
sudo systemctl start ccxc

# 检查服务状态
sudo systemctl status ccxc
```

如果出现类似这样的就是成功了：

```
● ccxc.service - Ccxc Backend
     Loaded: loaded (/etc/systemd/system/ccxc.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2025-09-01 08:00:00 UTC; 114h ago
   Main PID: 114514 (ccxc-backend)
      Tasks: 69 (limit: 1145)
     Memory: 114.5M
        CPU: 1min 15.514s
     CGroup: /system.slice/ccxc.service
             └─114514 /opt/ccxc-backend/app/ccxc-backend
```

> [!WARNING]
> 这一步有坑！！！如果没运行起来，那么大概率是数据库连不上 *(报错看起来是这样的)* ：

```
[1   ] 2025-09-04 19:58:31 ,096 INFO - 正在初始化数据库。 
Unhanded exception . Sqlsugar . Sq 1 sugarException :中文提示:连接数据库过程中发生错误,检查服务器是否正常：ccxc_user '@' localhost ' to database ' mysql' DbType =" MySql"; ConfigId =""; Access denied for user 'ccxc_user'@'localhost' English Message : Connection open error Access denied for user to database ' my at sqlsugar . check . Exception ( Boo 1 ean isException , String message , String [] args ) 
```

这时候你要重新编辑`/opt/ccxc-backend/app/Config/ccxc.config.toml`，把数据库连接字符串换成root用户和root密码，如果还不行请自行咨询chatgpt ~~(我当时就是通义千问帮忙排查的问题)~~

## 同步服务器、前端部署


这几步只需要跟着官方文档来就行！非常简单！

- [官方部署文档](https://engine.ccbcarchive.com/guide/deployment.html)

## 系统初始化

> [!WARNING]
> 这一步全是坑！！！！！

> [!WARNING]
> 这一步全是坑！！！！！

> [!WARNING]
> 这一步全是坑！！！！！

首先，你需要注册主站，注册完需要你验证邮件，但是你没有阿里云AccessKey或者显示邮件发送错误，这时候你就需要使用数据库绕激活

> [!WARNING]
> 这一步有坑！！！阿里云AccessKey填写正确之后发不出邮件，后端显示`Aliyun.Acs.Core.Exceptions.ClientException: InvalidMailAddress.NotFound : The specified mailAddress does not exist.`请注意需要使用新加披站点的发件邮箱! 在DM控制台左上角下拉框改成新加坡重新配置发件域名和发件地址！

### 绕邮件激活/初始化管理

> [!WARNING]
> 这一步有坑！！！两个操作是一样的！无论你有没有激活邮箱都得这么干

```bash
mysql -u root -p
```

然后会出来一个输入框，输入数据库root密码。

接下来：
```mysql
use ccxc_prod
SELECT * from user;
UPDATE user SET roleid = 5 WHERE email = '<你注册使用的邮箱>';
```

完整操作示例如下：

```
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 70
Server version: 10.6.22-MariaDB-0ubuntu0.22.04.1 Ubuntu 22.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> use ccxc_prod
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [ccxc_prod]> SELECT * from user;
+-----+--------------+------------------------------+--------------------------+-------+------------------------------+--------+----------------------------+----------------------------+-----------------------------------------------------------+------------------------------------------------------------------+-------------+--------+------------+
| uid | username     | email                        | hashkey                  | phone | password                     | roleid | update_time                | create_time                | profile                                                   | info_key                                                         | theme_color | gender | third_pron |
+-----+--------------+------------------------------+--------------------------+-------+------------------------------+--------+----------------------------+----------------------------+-----------------------------------------------------------+------------------------------------------------------------------+-------------+--------+------------+
|   1 | etetill      | eterill@hotmail.com          | **************************** | NULL  | **************************** |      5 | 2025-09-17 08:46:00.441015 | 2025-09-12 14:51:14.093171 | 人有五名，代价有三，存之有四，共饮无期                    | ******************************************************** | #0fe6d8     |      0 | NULL       |
+-----+--------------+------------------------------+--------------------------+-------+------------------------------+--------+----------------------------+----------------------------+-----------------------------------------------------------+------------------------------------------------------------------+-------------+--------+------------+
6 rows in set (0.001 sec)

MariaDB [ccxc_prod]> UPDATE user SET roleid = 5 WHERE email = 'eterill@hotmail.com';
Query OK, 1 rows affected (0.002 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [ccxc_prod]> COMMIT;
Query OK, 0 rows affected (0.000 sec)

MariaDB [ccxc_prod]> EXIT;
Bye

```

现在回到主站登录，发现已经是管理员了，接下来按照官方文档说明进入后台修改其他字段就行了

### 👍💯👏恭喜！你已经完成了部署！

## 其他细节！

CCXC前端部分功能没有改干净，后面如果有空我会完善这一部分，不过先让我军训完再说（

## 我还是不会，怎么办！！！

1.直接在下面Github登录然后评论

2.点击网站主页置顶文章加我QQ，备注：CCXC *（不备注不通过）*

> [!TIP]
> 我们正在筹建一个预计于每年寒假举办的CCBC的fanmade赛事，如果您有兴趣加入出题组或者内测组，亦或者您有美工或者设计方面的才能，欢迎您加入！群号：[1061351084(点击加群)](https://qm.qq.com/q/IW4u3LjbeS)