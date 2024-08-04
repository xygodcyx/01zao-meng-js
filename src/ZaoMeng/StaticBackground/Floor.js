import data from '../../../utils/data.js'
import Label from '../Label/Label.js'
import Vector2 from '../Vector/Vector2.js'
import Sprite from '../SpriteAnimated/Sprite.js'
import staticBackgroundManger from './StaticBackgroundManager.js'

export default class Floor {
  static width = 1132
  static height = 95
  /**
   * sprite
   * @type {Sprite} sprite - armFace sprite
   */
  sprite

  /**
   * size
   * @type {Vector2} size - size
   */
  size = new Vector2(Floor.width, Floor.height)
  /**
   * position
   * @type {Vector2} position - position
   */
  position

  constructor({ position = this.position }) {
    this.position = position
    this.sprite = new Sprite({
      src: 'res/map/001/地板带logo.png',
      size: this.size,
      position: this.position,
    })
    staticBackgroundManger.add(this)
  }
  update(delta) {}
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx -
   */
  render(ctx) {}
}
