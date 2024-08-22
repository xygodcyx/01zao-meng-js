import { HeroNameEnum as HeroNameEnum, InputTypeEnum, MsgEnum, PlayerEnum } from '../Enum/Index.js'
import Player from '../Player.js'
import effectManger from '../Effect/EffectManager.js'
import enemyManger from '../Enemy/EnemyManager.js'
import Label from '../Label/Label.js'
import labelManger from '../Label/LabelManager.js'
import spriteAnimatedManager from '../SpriteAnimated/SpriteAnimatedManager.js'
import spriteManager from '../SpriteAnimated/spriteManager.js'
import staticBackgroundManger from '../StaticBackground/StaticBackgroundManager.js'
import { logOnce } from '../../../utils/tool.js'
import Effect from '../Effect/Effect.js'
import Vector2 from '../Vector/Vector2.js'
import networkManager from './NetworkManager.js'
/**
 * @typedef {Object} IState
 * @property {Array<Player>} players  - 玩家数组
 * @property {Array<Effect>} effects  - 特效数组
 */
class DataManager {
  // state会从服务端传来(包含所有玩家的信息,这样就可以做到同步啦)
  /**
   * state
   * @type {IState} state
   */
  state = {
    players: [
      // new Player({ id: HeroNameEnum.WuKong }),
      // new Player({
      //   playerNumber: PlayerEnum.PLAYER_2,
      //   id: HeroNameEnum.ShaSeng,
      // }),
    ],
    effects: [] /*  */,
  }
  // myPlayerId = 0
  frameId = 0
  /**
   * playerNumberPlayerIdMap 用于存储playerNumber和playerId的映射关系
   * @type {Map<string, number>}  -
   */
  playerNumberPlayerIdMap = new Map() /* 只操作自己 */

  render(ctx) {
    // logOnce('ctx', ctx)
  }
  applyInput(input) {
    switch (input.type) {
      case InputTypeEnum.PlayerMove: {
        const { id, dir, dt, nowDir } = input

        const player = this.state.players.find((p) => p.id === id)
        if (player) {
          player.dir = dir
          player.nowDir = nowDir
          player.position.x += dt * dir * player.moveSpeed

          player.nameLabel.setPostion(
            new Vector2(
              player.position.x + player.cloth_anim.frameSize.x / 2,
              player.position.y + player.nameLabel.height * 2.1
            )
          )
          networkManager.sendMsg(MsgEnum.MsgLastPlayerState, {
            id: player.id,
            position: player.position,
            nowDir,
          })
        }
        break
      }
    }
  }

  update(dt) {
    this.state.players.forEach((p) => p.update(dt))
    this.state.effects.forEach((e) => e.update(dt))
  }
  createPlayer(id, heroName, playerNumber = PlayerEnum.PLAYER_1, position, nowDir) {
    this.state.players.push(new Player({ id, heroName, playerNumber, position, nowDir }))
  }
  removePlayer(id) {
    const index = this.state.players.findIndex((p) => p.id === id)
    console.log('removePlayer', index)
    this.state.players.splice(index, 1)
  }
  destroy() {
    this.state.players.forEach((p) => p.destroy())
    this.state.effects.forEach((e) => e.destroy())
    this.state.players = []
    this.state.effects = []
  }
}

const dataManager = new DataManager()

export default dataManager
