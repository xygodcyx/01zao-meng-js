# 稿子

## 教程介绍

  大家好，这个系列我们继续来做造梦西游，但不是用godot来做了，这次我们用原生javascript来做，至于原因呢，我在动态里说明了，大概就是因为我要准备比赛的事情了，而且我对godot还处于半知半解的状态，本来是想通过边学习便录教程的形式来提升自己的godot水平，但是录完一个视频后发现根本讲不好自己都不熟悉的知识，其实背包和掉落功能我用godot也写完了，但是代码量有点多而且写的很不优雅，暂时没精力和能力去重构和录教程了，再加上自己自制力有点差，所以一直没能开始。但是不管怎么样吧，现在我们用JavaScript来重写造梦，相比于godot我还是更熟悉JavaScript。如果最近没有别的事情要干，我会每天抽出一点时间来完成这个系列，希望自己能坚持下去。

  这个视频我会先介绍一下我们将会学到什么，
  
  我们会实现一个用JavaScript写的迷你引擎，其功能暂时只为造梦服务，所以我们只会实现最基础的功能

  图片渲染，动画，碰撞检测，输入系统

  然后我们先看看效果吧，我们第一节可能会有点长，因为要先把小引擎给实现了，我还没想好怎么教大家写这个引擎,其实很简单,主要的api就是requestAnimationFrame，这个函数相当于游戏主循环，无论是游戏逻辑还是渲染都在这个函数里执行，至于把渲染移到worker里，暂时还不需要怎么做，因为性能还没到那个必要
