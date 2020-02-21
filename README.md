# 团队协作Lite-微信小程序

![](https://img.shields.io/badge/Writted%20By-Chnja-blue)
![](https://img.shields.io/badge/license-GPL--3.0-green)

> 超轻量级团队协作小程序

## 目标使用场景

在目前的情况下，部分公司及团队使用[钉钉](https://www.dingtalk.com/)、[企业微信](https://work.weixin.qq.com/)、[飞书](https://www.feishu.cn/)、[Teambition](https://www.teambition.com)等软件进行团队协作。但是对于一些小型团队或因某种原因临时组件的团队来说，上述的产品对于他们的团队协作的开展又太重了。

其实对于小型团队，他们日常的交流完全可以依靠微信群解决。那么他们要的轻量级办公软件所需要实现的功能其实仅仅是一个类似于群公告记录似的小程序。通过这个小程序记录布置的任务及详情，同时每个人可以对任务进行补充（Tips)

于是，我设计了这个小程序。

<img src="https://i.loli.net/2020/02/18/nRFwDmo3j6cabhZ.jpg" style='max-width:300px'></img>

## 使用说明

小程序目前实现了以下的几个功能：

- 创建团队

1. 可自定义程序内```称呼```（不多于6字），并可随时修改
2. 可创建团队并自定义```团队名称```，并可随时修改
3. 可通过小程序内的分享功能通过微信邀请朋友加入自己的队伍

- 团队内协作

1. 团队内可发布任务，并自定义```任务名称```、```任务详情```
2. 可将任务标记为```完成```，同时已完成任务可以被取消```完成```标记
3. 未完成任务可以随时修改```任务名称```、```任务详情```
4. 每一个任务支持增加及删除```Tips```，方便实时跟进任务要求

## 使用截图

<img src="https://i.loli.net/2020/02/18/2aDsNEHqWShXGwj.png" style='max-width:300px'></img>

## Todo

- [x] 显示任务发布者
- [x] 权限管理（仅任务发布者可确定完成任务，仅任务发布者可修改任务，仅团队所有者可修改团队名称）
- [x] 标记任务颜色、设定任务截止时间、设置任务人员
- [ ] 任务提醒


## 致谢

* [Vant Weapp组件库](https://youzan.github.io/vant-weapp/#/intro)
* [SM.MS图床](https://sm.ms/)

## 作者

Chnja from WuHan University

## 版权信息

Copyright © 2019, Chnja
Released under the [GNU General Public License v3.0](https://github.com/Chnja/QCDH-wxapp/blob/origin/LICENSE).