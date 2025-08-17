---
title: HPMS服务器入坑指南
published: 2025-08-15
description: 'hpms.cc服务器入坑指南'
image: https://vip.123pan.cn/1813814650/yk6baz03t0m000d7w33gaqx0fx6xb317DIYPDwYPAdQyDcxPDIUxDO==.gif
tags: 
- HPMS
- Minecraft
- 我的世界
- SMP
- Multiplayer
category: '指南'
draft: false 
---

# HPMS服务器是什么？

> HPMS，一个多元、具有探索精神且追求知识共享的 Minecraft 生存社区。玩家们结成部落，从远古洞穴到现代文明，遍布世界。

HPMS是一个目前处于`1.20.6`的Minecraft SMP(多人生存)服务器,腐竹是`MildBunny`.

服务器的官网和连接的IP均为`hpms.cc`.     

# 如何游玩服务器？

HPMS是一个正版Minecraft服务器。欲加入HPMS服务器，您需要购入一个正版Minecraft账号。通常在电商平台上40-80元即可购入。

然后，您需要下载`1.8.10`-`1.21.4`之间您喜爱的版本的Minecraft Java Edition游戏本体。这里推荐使用`1.21.4`版本。如果您是生电玩家，我推荐使用[XPlus PerioTable Modpack (Fabric)](https://modrinth.com/modpack/xplus-2.0-modpack-global)的`1.21.4`版本来获取更佳的游戏体验。

## 服务器禁红石吗？有其他游玩限制吗？

服务器不会对红石进行限制，但是受限于服务器性能，请您在建造大型高速机器（例如72k手挖收集类机器、效率超过100k的机器）时务必三思。同时，由于使用Paper服务端，服务器无法使用RNG计算。其他的限制相当少，您可以在服务器中自由探寻玩法的上限。

>[!WARNING]
> 在服务器中“熊”是非常危险的行为。恶意破坏其他玩家的心血可能会遭到永久封禁。所以请不要这么做。

## 【部落】与【商店】

> 部落是 HPMS 玩家的主要聚集方式之一，所有部落均由 HPMS 玩家们自主设计并发起创建。任何 HPMS 玩家均可建造属于自己的部落。待部落发展后，部落酋长可以通过申请获得 Warp 传送点、启动激励等升级。

游戏中存在部落这一概念。玩家可以在部落中建造和发挥想象。目前游戏中存在如下大型部落：`共联世界United Worlds(-38411,-68300)`、`牧野原Naida(-38481,-67469)`。大部分玩家在此处聚集，您也可以在这些部落中留下属于您的印记。

您可以在出生点点击头上写有对应名字的生物来传送，或使用`/warp`命令进行传送。（详见后文）

> 商店是 HPMS 玩家的主要易物方式之一，所有商店均由 HPMS 玩家们自主创建。任何 HPMS 玩家均可创建属于自己的商店。

像素币是服内交易体系中使用的货币。

如下是一个商店告示牌的示例：
```
  EterIll
     10
 B 999:800 S
   Beacon
```
您可以右键消耗999像素币向EterIll购买10个信标，或者左键向EterIll售出10个信标换取800像素币。

您可以通过箱子与告示牌的组合来创建商店。以下为详细步骤。

- 步骤 1: 放置一个箱子

- 步骤 2: 在距离箱子 1 个方块的地方放置一个标志（例如，在箱子上方）

- 步骤 3: 在标牌上按如下格式书写内容:
    > 第一行留空。
    > 
    > 第二行是要购买或出售的物品数量
    > 
    > 第三行是买入价和卖出价的组合。B表示玩家向你购买物品时的价格，S表示玩家向你售卖物品时的价格，价格用冒号分隔，例如: “B 10:5 S”，“B 5”, “S 10”
    > 
    > 第四行将保存物品的ID/名称。在标志上写上 “?”, 商店将自动识别箱子中的物品, 或者你可以稍后使用物品单击牌子来设置物品ID。

## 实用指令
传送至位置: `/warp <地点>`
> Warp传送列表:
>  - `sol`: 自由村民雕像
>  - `uw`: 部落 - 共联世界 (United World)
>  - `naida`: 部落 - 牧野源 (Naida)
>  - `skytier`: Skytier
>  - `spawn`: 出生点 (与 `/spawn` 作用相同)

查看所有可用的传送位置: `/warp`

设置家: `/sethome <家的名字 (自定义)>`

删除家: `/delhome <家的名字>`

回家: `/home <家的名字>`

请求传送至玩家: `/tpa <玩家>`

取消tpa请求: `/tpacancel`

接受tpa请求: `/tpaccept [玩家]`

请求特定玩家传送至你的位置: `/tpahere <玩家>`

开启/关闭自动接受来自其他玩家的 tpa: `/tpauto`

回到出生点: `/spawn`

传送至随机位置: `/tpr`

总在线时间查询: `/pt`

查询服务器规则: `/rules`

**查看你的警告(违反服务器规定): `/warns`**

查看所有家: `/home`、`/homes`

坐: `/sit`

躺: `/lay`

爬: `/crawl`

私信给玩家: `/msg <玩家> <消息 (自定义)>`、`/tell <玩家> <消息 (自定义)>`、`/whisper <玩家> <消息 (自定义)>`、`/w <玩家> <消息 (自定义)>`

余额查询: `/bal`

向其他玩家转账: `/pay <玩家> <金额 (自定义)>`

开启 / 关闭他人在自己商店购买 / 售卖的提示消息: `/cstoggle`

> 赞助者指令(有关赞助详见[`HPMS玩家手册`](https://hpms.cc/zh/manual/))
>
> 打开 / 关闭飞行: `/fly`
>
> 回到上次死亡点: `/back`
>
> 旋转: `/spin`
>
> 将物品戴在头上: `/hat`

# 服务器的地标有哪些？

![United Worlds](https://vip.123pan.cn/1813814650/ymjew503t0l000d7w32xa8h0fortqk02DIYPDwYPAdQyDcxPDIUxDO==.png)

共联世界United Worlds`(-38411,-68300)`

![牧野原](https://vip.123pan.cn/1813814650/yk6baz03t0m000d7w33gaszu7v8ef5owDIYPDwYPAdQyDcxPDIUxDO==.png)

牧野原Naida`(-38481,-67469)`

![72K刷冰机](https://vip.123pan.cn/1813814650/ymjew503t0n000d7w32y76180on2ak2xDIYPDwYPAdQyDcxPDIUxDO==.gif)

EterIll工业区`(-6041,-5316)`
> 注：此地暂无warp传送点，您可以通过共联世界地狱交通前往。

![GK博物馆](https://vip.123pan.cn/1813814650/ymjew503t0n000d7w32y7619y1n2eue1DIYPDwYPAdQyDcxPDIUxDO==.png)

GK的博物馆`(坐标暂不公开)`