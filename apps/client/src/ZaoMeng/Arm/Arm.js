import data from '../../../utils/data.js'
import SpriteAnimated from './SpriteAnimated/SpriteAnimated.js'
import Vector2 from '../Vector/Vector2.js'
import Effect from '../Effect/Effect.js'
import armManger from './ArmManager.js'
import Label from '../Label/Label.js'

export default class Arm {
  name = 'xygod'
  /**
   * nameLabel
   * @type {Label} nameLabel - nameLabel
   */
  nameLabel
  dir = 1
  /**
   * anim
   * @type {SpriteAnimated} anim - anim
   */
  anim = new SpriteAnimated()
  /**
   * enemy position
   * @type {Vector2} position - position
   */
  position = new Vector2(
    -this.anim.frameWidth,
    data.height - data.floorHeight - this.anim.frameHeight
  )

  effectTimer = 0
  effectInterval = 0.4
  constructor(name = this.name) {
    armManger.add(this)
    this.nameLabel = new Label(
      name,
      new Vector2(
        this.position.x + this.anim.frameWidth / 2,
        this.position.y - this.anim.frameHeight / 4
      ),
      16
    )
  }

  update(delta) {
    this.playAnimationByDir()
    this.position.x += 1
    this.anim.update(delta, this.position)
    this.judgmentBorder(delta)
    this.nameLabel.position.x = this.position.x + this.anim.frameWidth / 2
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
        this.anim.playerAnimation('walk')
        break
      case 0:
        this.anim.playerAnimation('idle')
        break
      default:
        this.anim.playerAnimation('idle')
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
