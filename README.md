<p align="center">复刻造梦</p>

<p align="center">只用原生js/ts复刻造梦并实现联机(制作中),不使用游戏引擎<p>

## 如何启动?

 1. 客户端安装插件live server(vscode插件,也可以自己弄成工程化的环境,然后用npm起一个服务器,都可以,因为前端我不想用包,所有就这样写了),然后在index.html里右键点击open with live server启动客户端
 2. 服务端在根目录运行 yarn dev(可能需要先安装依赖,运行yarn安装依赖)启动服务器

## 复刻进度

- [ ] 为角色添加缓动,解决帧同步的卡顿问题
- [ ] 添加预测和回溯,解决因网络波动造成的输入延迟
- [x] 在场景中时帧同步所有玩家的位置
- [x] 添加角色时同步其他玩家的位置
- [x] 动态添加(有玩家登录时)和移除(玩家离线时)角色
- [x] 基本的移动、动画和和文本
- [x] 迷你js游戏引擎
