---
title: ccxc进阶教程
published: 2026-04-13
description: '有关CCXC-Engine个性化开发、二次开发之类的心得与总结。希望能帮到你'
image: /assets/posts/ccxcpro_banner_DE325E18BAB37405C752694D5D450ADD.png
category: 指南
draft: false
tags:
- 开源
- CCBC
- PuzzleHunt
---

CCXC是个非常好的PuzzleHunt后台引擎，这篇文章会教学如何从搭建完成到举办hunt，当然您也可以查看：[官方部署文档](https://engine.ccbcarchive.com/guide/deployment.html)

**如果您还没开始部署，请参阅：**

<a href="/posts/ccxcdev/">
<div class="sp-link">
<div class="sp-link-meta">

<h3>ccxc部署小白教程（踩坑记录）</h3>

本人在CCXC-Engine部署过程中踩的坑以及部署ccxc引擎的小白向教程

</div>

![Cover](/assets/posts/ccxc_banner_43A5FE1EFD6504FBDCE67A1079D35A18.png)

</div>
</a>

<style>
.sp-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;
    background-color: #88888811;
    border-radius: 1rem;
    margin: 0;
    margin-left:1rem;
}

.sp-link img{
    max-width: 30vw;
    max-height: 8rem;
}

.sp-link * {
    margin-top:.1rem !important;
    margin-bottom:.1rem !important;
}

.sp-link-meta {
    display: flex;
    flex-direction: column;
}

</style>

:::warning[劝退提醒！]
前排提醒，ccxc的设计非常精妙，对于普通hunt需要定制很多的内容，如果你要办hunt但是精力不足建议使用[P&KU Website](https://github.com/PKUPC/pnku-website).同时我有空的话也可以找我**免费**帮忙（仅限非期末周，期末周太忙了心有余而力不足TAT）     
**注：如果时间紧迫，（根据本人体验主观排名）部署容易度&速度 公众号>P&KU Website>CCXC；**     
相对的，体验效果上CCXC会更好。
:::

## 基础知识

首先，和P&KU Website不同，ccxc的前端是基于Vue3的，如果你只是想出一些静态的题目，完全不需要学习Vue3，你只需要学会Markdown和HTML的任意一种（推荐优先学习HTML）；但是如果你想出一些不错的交互题型，Vue是你绕不开的一部分，这也就意味着你需要学习Vue3。

如果你只是想出静态题，那么接下来的教程对你来说用处不大，你只需要看得懂puzzle前端对于题目美术素材的配置，这就足够了。

## 后端脚本

> CCXC 后端脚本系统提供了一套强大且灵活的 API 接口，让开发者能够构建复杂的交互式题目和自定义判题逻辑。

后端脚本分为两种类型，一种是判题函数，可以用来实现自定义判题结果，另一种是题目后端，用于实现题目内容的动态交互。如果有大量的内容需要交互，这套接口的性能是不足的，请参考（尚未编写）后端插件开发章节。

如下是一个非常简单的后端脚本示例，它不接收参数，只判断当前服务器时间是否达到指定时间，然后返回True或者False。通过（下文会提到）Vue SFC API，我们便可以通过`let isOK = await backend("check-time",{})`获取到服务器时间是否达到2025-12-31 23:59:59。

```javascript
// key: check-time
// @ts-check
// ========== 服务端 main 函数 ==========
function main() {
    const targetDateTime = new Date(2025, 11, 31, 23, 59, 59);
    const now = new Date();
    return (now > targetDateTime);
}

//=======以下是JSON解析与调用脚本，一般不需要修改========
/**
 * @param {Ctx} ctx 全局上下文对象
 */
function _jsonProcessHelper(ctx) {
    let request = JSON.parse(ctx.request);
    request = request;
    let resBody = main();
    let resString = JSON.stringify(resBody);
    ctx.response(resString);
}
_jsonProcessHelper(ctx);

```

一般来说，我们只需要修改main函数，让它返回一些别的object，来实现我们自己的功能。当然，服务端是C#写的，所以js跑在Jurassic环境里面，有一些函数是运行不了的。好消息是一般来说用js能实现的判定它都能实现。这一部分在[官方文档](https://engine.ccbcarchive.com/reference/backend-script.html)里已经写的相当详细了，这里就只提一些官方文档没有说明的API。**这些API仅存在于题目后端脚本环境中。**

#### httpPostForm

直接调用HttpRequest.PostForm进行表单POST，适用于需要外部查询但是有CORS限制

```javascript
ctx.httpPostForm(string url, Object form, Object headers)
```

#### hasPuzzleFinished

检查一个题目对于当前队伍是否已被通过，参数是题目id，需要在后台题目管理查看。返回布尔值。

```javascript
ctx.hasPuzzleFinished(int pid)
```

#### getCheckCount

获取队伍的作答情况，参数是题目id，需要在后台题目管理查看。返回字典。

```javascript
ctx.hasPuzzleFinished(int pid)
``` 

返回值：

```javascript
{
    "count":0, // 各题目的答案提交次数
    "additionalCount":0 // 已购买的额外题目回答次数
}
```

#### ctx.saveData

直接取得原始存档数据。

## VUE SFC API

> 通过 Vue 依赖注入 (inject) 提供的渲染器核心功能。

这个功能就是给Vue题目使用的调用接口了。你可以通过编辑puzzle前端`/src/components/puzzleVue/puzzleVuePlugin.ts`来添加更多的功能。[官方文档](https://engine.ccbcarchive.com/reference/vue-sfc.html)已经解释的很清楚了，快去看看吧。（看不懂的话建议先学习Vue入门）


----

*(未完待续)*