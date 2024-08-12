import data from '../../../utils/data.js'
import SpriteAnimated from '../SpriteAnimated/SpriteAnimated.js'
import Vector2 from '../Vector/Vector2.js'
import enemyManger from './EnemyManager.js'
import Effect from '../Effect/Effect.js'

export default class Enemy {
  dir = -1
  /**
   * anim
   * @type {SpriteAnimated} anim - anim
   */
  anim = new SpriteAnimated()
  /**
   * enemy position
   * @type {Vector2} position - position
   */
  position = new Vector2(data.width, data.height - data.floorHeight - this.anim.frameHeight)

  effectTimer = 0
  effectInterval = 0.6
  constructor() {
    enemyManger.add(this)
  }

  update(delta) {
    this.playAnimationByDir()
    this.position.x -= 1
    this.anim.update(delta, this.position)
    this.judgmentBorder(delta)
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx -
   */
  render(ctx) {}
  playAnimationByDir() {
    switch (this.dir) {
      case 1:
      case -1:
        this.anim.changeAnimation('walk')
        break
      case 0:
        this.anim.changeAnimation('idle')
        break
      default:
        this.anim.changeAnimation('idle')
    }
  }
  judgmentBorder(delta) {
    this.effectTimer += delta
    if (this.effectTimer > this.effectInterval) {
      this.effectTimer = 0
      new Effect(
        new Vector2(
          this.position.x + (this.dir > 0 ? 0 : this.anim.frameWidth),
          this.position.y + this.anim.frameHeight
        )
      )
    }
  }
}
