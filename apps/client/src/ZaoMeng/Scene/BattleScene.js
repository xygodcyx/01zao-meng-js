import data from '../../../utils/data.js'
import { ApiEnum, EventEnum } from '../Enum/Index.js'
import eventCenter from '../EventCenter/EventCenter.js'
import dataManager from '../Global/DataManager.js'
import networkManager from '../Global/NetworkManager.js'
import Label from '../Label/Label.js'
import Player from '../Player.js'
import Sprite from '../SpriteAnimated/Sprite.js'
import Background from '../StaticBackground/Background.js'
import Floor from '../StaticBackground/Floor.js'
import Vector2 from '../Vector/Vector2.js'
import Scene from './Scene.js'
export class BattleScene extends Scene {
  /**
   * labels
   * @type {Array<JumpLabel | Label>} labels  - labels
   */
  playerLevel = 1

  start() {
    this.init()
  }
  async connectServer() {
    if (!(await networkManager.connect().catch(() => false))) {
      await new Promise((re) => setTimeout(re, 1000))
      await this.connectServer()
    } else {
      console.log('connect server success')
    }
  }

  async init() {
    this.initTopInfo()
    eventCenter.on(EventEnum.ChooseHero, this.handleChooseHero, this)
    this.initBackGround()
    await this.connectServer()
  }
  destroy() {
    eventCenter.off(EventEnum.ChooseHero, this.handleChooseHero, this)
  }

  initTopInfo() {
    const nameLabel = new Label({
      text: '悟空',
      position: new Vector2(90, 60),
      fontSizeMax: 30,
    })
    const LevelLabel = new Label({
      text: `Lv.${this.playerLevel}`,
      position: new Vector2(140, 70),
      fontSizeMax: 22,
    })
    new Sprite({
      src: 'public/img/player2-head.png',
      size: new Vector2(46, 47),
      position: new Vector2(10, 60 - 47 / 1.3),
    })
  }
  initBackGround() {
    new Background({ position: new Vector2(0, 0) })
    new Background({ position: new Vector2(Background.width, 0) })
    new Floor({ position: new Vector2(0, data.height - data.floorHeight) })
    new Floor({ position: new Vector2(Floor.width, data.height - data.floorHeight) })
  }
  async handleChooseHero(hero) {
    console.log(hero)
    const { success, error, res } = await networkManager.instance.callApi(ApiEnum.ApiLogin, {
      nickname: '悟空',
      heroName: hero,
    })
    if (success) {
      dataManager.createPlayer(res.player.heroName)
      console.log(res)
    }
  }
  update(delta) {
    // 背景
    dataManager.update(delta)
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    // 背景
    dataManager.render(ctx)
  }
}
