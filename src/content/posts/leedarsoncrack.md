---
title: 立达信教育物联面板破解改装教程
image: https://eterill.xyz/assets/posts/leedarsoncrack-1.webp
category: 教程
description: 立达信教育物联面板破解改装教程
draft: false
published: 2025-08-06
tags:
- Android
- 逆向
- 教程
---

## 注意！损害公共财产的行为不可取！后果请自负！

很多学校使用的灯控面板来自立达信教育物联，经过本人研究发现86盒面板居然是带zigbee的安卓面板，MCU是Rockchip的PX30，性能方面勉勉强强，480p的H264可以达到30fps，考虑到这款灯控面板的显示屏也就是480*480px，拿来摸鱼还是够用的。
![显示屏是480*480px](/assets/posts/leedarsoncrack-2.webp)

### 初尝试（ADB）

由于外观上没有发现USB调试口，但是直觉告诉我这玩意绝对有调试口，于是开始拆机。（新款有些自带USB口，没试过，有需要的话自己试试看）

卸下背后两颗螺丝，我发现后盖打不开，以为是卡扣，随强拆，于是把主板和屏幕弄断了，钱包-200。

检查面板的尸体之后，发现两颗螺丝外圈还有一层贴纸，底下还有螺丝，靠北哦！

卸下所有螺丝之后，用螺丝刀轻轻拆开四个卡扣，后盖成功拆下。主板没有额外固定，正反面做有卡扣屏蔽罩，做工还不错，用的高温锡焊接。从micro-usb开始顺时针的接口分别是：usb(host/otg) 音响接口(未使用) Zigbee天线 环境光传感器 显示屏MIPI 触摸屏 未知接口。

usb连接电脑，自动开机，电脑adb识别成功。

安装了个第三方桌面(我用的微软桌面)和MT管理器，就可以冻结`com.leedarson.impmini`替换系统桌面了

### 10分钟自动重启？

安装了新桌面之后，我发现开机10分钟左右就会自己重启，我怀疑是有看门狗，于是果断卸载impmini恢复出厂设置。结果恢复完之后它居然回来了！直觉告诉我这玩意绝对注入系统了，提取安装包在虚拟机安装后果然要了su权限写入了data和system分区。经过折腾，发现了三个重要的文件路径：
```
/system/bin/ifs_android_startup.sh
/data/IotOs/x64/ifs_android_startup.sh
/data/IotOs/x64/impMini.apk
```

直接破案。于是我又删除了一遍impmini，然后用MT管理器修改了`/system/bin/ifs_android_startup.sh`，把文件修改成了这样（系统是userdebug，自带root可以直接改）：

```bash
sleep 10s
su -c "sh /data/IotOs/x64/shutdown.sh" - root
```

调用了自带的看门狗关闭程序，所以到时候恢复起来也是很方便的，把内容重新替换为`/data/IotOs/x64/ifs_android_startup.sh`里面的内容就行了

### 破解成功！接下来你就可以拿灯控刷b站啦！

（未完待续：修改独立供电，用充电宝来供电）

![外接引脚定义](/assets/posts/leedarsoncrack-3.webp)

![改装供电示例](/assets/posts/leedarsoncrack-4.webp)