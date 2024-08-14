import data from '../../../utils/data.js'
import { ApiEnum, EventEnum, HeroNameEnum, MsgEnum, PlayerEnum } from '../Enum/Index.js'
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
    eventCenter.on(EventEnum.ClientInput, this.hanldClientInput, this)
    networkManager.listenMsg(MsgEnum.MsgLogin, this.handleMsgLogin, this)
    networkManager.listenMsg(MsgEnum.MsgLogOut, this.handleMsgLoginOut, this)
    networkManager.listenMsg(MsgEnum.MsgSyncServerInput, this.handleMsgSyncServerInput, this)
    this.initBackGround()
    await this.connectServer()
  }
  test(id = 999, heroName = HeroNameEnum.ShaSeng, playerNumber = PlayerEnum.PLAYER_1) {
    dataManager.playerNumberPlayerIdMap.set(playerNumber, id) /* 先保存再生成player */
    const player = new Player({
      id: id,
      playerNumber: playerNumber,
      heroName: heroName,
    })
    player.cloth_anim.changeImgSrc('res/hero/shaseng/yifu_初始_chan.png')
    player.weapon_anim.changeImgSrc('res/hero/shaseng/wuqi_初始.png')
    dataManager.state.players.push(player)
  }
  destroy() {
    eventCenter.off(EventEnum.ChooseHero, this.handleChooseHero, this)
    eventCenter.off(EventEnum.ClientInput, this.hanldClientInput, this)
    networkManager.unlistenMsg(MsgEnum.MsgLogin, this.handleMsgLogin, this)
    networkManager.unlistenMsg(MsgEnum.MsgLogOut, this.handleMsgLoginOut, this)
    networkManager.unlistenMsg(MsgEnum.MsgSyncServerInput, this.handleMsgSyncServerInput, this)
    dataManager.destroy()
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
  async handleChooseHero({ heroName, playerNumber }) {
    // 只会执行一次
    const { success, error, res } = await networkManager.callApi(ApiEnum.ApiLogin, {
      nickname: '悟空',
      heroName: heroName,
      playerNumber: playerNumber,
    })
    if (success) {
      // dataManager.createPlayer(res.player.heroName)
      console.log(res)
      /* 先保存再生成player */
      dataManager.playerNumberPlayerIdMap.set(res.player.playerNumber, res.player.id)
      /* 生成自己 */
      dataManager.createPlayer(res.player.id, res.player.heroName, res.player.playerNumber)
      /* 生成其他玩家 */
      res.players.forEach((p, i) => {
        dataManager.createPlayer(
          p.id,
          p.heroName,
          p.playerNumber,
          res.playersLastState[i].position,
          res.playersLastState[i].nowDir
        )
      })
    }
  }
  handleMsgLogin(res) {
    // 有玩家加入就执行
    console.log('handleMsgLogin', res)
    // 客户端会返回登录的角色,也就是新加入的玩家,不包括自己
    // dataManager.playerNumberPlayerIdMap.set(res.playerNumber, res.id)
    dataManager.createPlayer(res.id, res.heroName, res.playerNumber)
  }
  handleMsgLoginOut(res) {
    // 有玩家退出就执行
    console.log('handleMsgLoginOut', res)
    dataManager.removePlayer(res.id)
  }
  update(delta) {
    // 背景
    dataManager.update(delta)
  }
  hanldClientInput(input) {
    // 客户端输入
    const msg = {
      input,
      lastFrame: dataManager.frameId || 0,
    }

    networkManager.sendMsg(MsgEnum.MsgSyncClientInput, msg)
    // dataManager.applyInput(input)
  }
  handleMsgSyncServerInput(msg) {
    const { inputs, lastFrame } = msg
    for (const input of inputs) {
      dataManager.applyInput(input)
    }
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    dataManager.state.players.forEach((p) => p.render(ctx))
    dataManager.state.effects.forEach((e) => e.render(ctx))
  }
}
