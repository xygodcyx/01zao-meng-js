import labelManger from './Label/LabelManager.js'
import effectManger from './Effect/EffectManager.js'
import spriteAnimatedManager from './SpriteAnimated/SpriteAnimatedManager.js'
import enemyManger from './Enemy/EnemyManager.js'
import spriteManager from './SpriteAnimated/spriteManager.js'
// 背景
import staticBackgroundManger from './StaticBackground/StaticBackgroundManager.js'
import dataManager from './Global/DataManager.js'
import { BattleScene } from './Scene/BattleScene.js'
import domManager from './Global/DomManager.js'

export default class Game {
  constructor() {
    this.init()
  }
  allInstance = []
  /**
   * currentScene 当前激活的场景
   * @type {Scene} currentScene
   */
  currentScene = null
  init() {
    domManager /* 读取一下dom管理器触发引入 */
    this.currentScene = new BattleScene()
    this.allInstance.push(staticBackgroundManger)
    this.allInstance.push(effectManger)
    this.allInstance.push(enemyManger)
    this.allInstance.push(dataManager)
    this.allInstance.push(labelManger)
    this.allInstance.push(spriteManager)
    this.allInstance.push(spriteAnimatedManager)
    this.allInstance.push(this.currentScene)
  }

  onload() {
    this.allInstance.forEach((instance) => {
      instance.onload?.bind(instance).call()
    })
  }
  start() {
    this.allInstance.forEach((instance) => {
      instance.start?.bind(instance).call()
    })
  }

  update(dt) {
    this.allInstance.forEach((instance) => {
      instance.update?.bind(instance, dt).call()
    })
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    // 背景
    this.allInstance.forEach((instance) => {
      instance.render?.bind(instance, ctx).call()
    })
  }
  destroy() {
    this.allInstance.forEach((instance) => {
      instance.destroy?.bind(instance).call()
    })
  }
}
