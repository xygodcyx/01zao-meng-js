import Sprite from '../SpriteAnimated/Sprite.js'
import Vector2 from '../Vector/Vector2.js'
import staticBackgroundManger from './StaticBackgroundManager.js'
export default class Cloud {
  static width = 1155
  static height = 504
  size = new Vector2(Cloud.width, Cloud.height)
  position = new Vector2(0, 0)
  sprite
  constructor({ src, size = this.size, position }) {
    this.size = size
    this.position = position
    this.sprite = new Sprite({
      src: src,
      size: this.size,
      position: this.position,
      autoAddScene: false,
    })
    this.sprite.frameClip = new Vector2(0, 30)
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
