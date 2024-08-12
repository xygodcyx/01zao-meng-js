import { heroNameEnum as HeroNameEnum, PlayerEnum } from '../Enum/Index.js'
import Player from '../Player.js'
import effectManger from '../Effect/EffectManager.js'
import enemyManger from '../Enemy/EnemyManager.js'
import Label from '../Label/Label.js'
import labelManger from '../Label/LabelManager.js'
import spriteAnimatedManager from '../SpriteAnimated/SpriteAnimatedManager.js'
import spriteManager from '../SpriteAnimated/spriteManager.js'
import staticBackgroundManger from '../StaticBackground/StaticBackgroundManager.js'
import { logOnce } from '../../../utils/tool.js'

class DataManager {
  // state会从服务端传来(包含所有玩家的信息,这样就可以做到同步啦)
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
  myPlayerId = 0

  render(ctx) {
    // logOnce('ctx', ctx)
    this.state.players.forEach((p) => p.render(ctx))
    this.state.effects.forEach((e) => e.render(ctx))
  }

  update(dt) {
    this.state.players.forEach((p) => p.update(dt))
    this.state.effects.forEach((e) => e.update(dt))
  }
  createPlayer(id, playerNumber = PlayerEnum.PLAYER_1) {
    this.state.players.push(new Player({ id, playerNumber }))
  }
}

const dataManager = new DataManager()

export default dataManager
