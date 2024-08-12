import data from '../../../utils/data.js'
import Label from '../Label/Label.js'
import Vector2 from '../Vector/Vector2.js'
import Sprite from '../SpriteAnimated/Sprite.js'
import staticBackgroundManger from './StaticBackgroundManager.js'

export default class Background {
  static width = 1440
  static height = 1080
  /**
   * sprite
   * @type {Sprite} sprite - armFace sprite
   */
  sprite

  /**
   * size
   * @type {Vector2} size - size
   */
  size = new Vector2(Background.width, Background.height)
  /**
   * position
   * @type {Vector2} position - position
   */
  position

  constructor({ position = this.position, clip = Vector2.zero }) {
    this.position = position
    this.sprite = new Sprite({
      src: 'res/map/001/1_floorBg1.png',
      size: this.size,
      position: this.position,
      autoAddScene: false,
    })
    this.sprite.frameClip = clip
    staticBackgroundManger.add(this)
  }
  update(delta) {
    this.sprite.update(delta)
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx -
   */
  render(ctx) {
    this.sprite.render(ctx)
  }
}
