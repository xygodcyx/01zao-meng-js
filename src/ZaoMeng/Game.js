import Player from './Player.js'
import JumpLabel from './Label/JumpLabel.js'
import Label from './Label/Label.js'
import Vector2 from './Vector/Vector2.js'
import labelManger from './Label/LabelManager.js'
import effectManger from './Effect/EffectManager.js'
import spriteAnimatedManager from './SpriteAnimated/SpriteAnimatedManager.js'
import enemyManger from './Enemy/EnemyManager.js'
import spriteManager from './SpriteAnimated/spriteManager.js'
import Sprite from './SpriteAnimated/Sprite.js'

// data
import data from '../../utils/data.js'

// 背景
import staticBackgroundManger from './StaticBackground/StaticBackgroundManager.js'
import Floor from './StaticBackground/Floor.js'
import Background from './StaticBackground/Background.js'
import Cloud from './StaticBackground/Cloud.js'
import { PlayerEnum } from './Enum/Index.js'

export default class Game {
  /**
   * player
   * @type {Player} player - player
   */
  player
  /**
   * labels
   * @type {Array<JumpLabel | Label>} labels  - labels
   */
  playerLevel = 1
  constructor() {
    this.init()
  }
  init() {
    this.player = new Player()
    this.player2 = new Player(
      PlayerEnum.PLAYER_2,
      new Label({
        text: '屈侯访翠思乡2',
        fontSizeMax: 22,
        color: '#F9A602',
      })
    )
    const nameLabel = new Label({
      text: '屈侯',
      position: new Vector2(90, 60),
      fontSizeMax: 30,
      color: this.player.baseColor,
    })
    const LevelLabel = new Label({
      text: `Lv.${this.playerLevel}`,
      position: new Vector2(140, 60),
      fontSizeMax: 22,
      color: this.player.baseColor,
    })
    new Sprite({
      src: 'public/img/player2-head.png',
      size: new Vector2(46, 47),
      position: new Vector2(10, 60 - 47 / 1.3),
    })
    new Background({ position: new Vector2(0, 0) })
    new Background({ position: new Vector2(Background.width, 0) })
    new Floor({ position: new Vector2(0, data.height - data.floorHeight) })
    new Floor({ position: new Vector2(Floor.width, data.height - data.floorHeight) })
  }
  update(delta) {
    // 背景
    staticBackgroundManger?.update(delta)
    effectManger?.update(delta)
    enemyManger?.update(delta)
    this.player?.update(delta)

    this.player2?.update(delta)
    labelManger?.update(delta)
    spriteManager?.update(delta)
    spriteAnimatedManager?.update(delta)
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx, { playerClothCtx, playerWeaponCtx }) {
    // 背景
    staticBackgroundManger.render(ctx)
    effectManger.render(ctx)
    enemyManger.render(ctx)
    this.player.render({ playerClothCtx, playerWeaponCtx })
    this.player2.render({ playerClothCtx, playerWeaponCtx })
    labelManger.render(ctx)
    spriteManager.render(ctx)
    spriteAnimatedManager.render(ctx)
  }
}
