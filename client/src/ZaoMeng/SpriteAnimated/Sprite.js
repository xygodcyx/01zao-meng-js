import Vector2 from '../Vector/Vector2.js'
import spriteManager from './spriteManager.js'

/**
 *
 * @classdesc 只显示一个单独的图片，不能有位移，并且原始图片是什么，渲染出来就是什么
 *
 */
export default class Sprite {
  /**
   * img
   * @type {HTMLImageElement} img - img
   * @type {Vector2} size - img size
   */
  img = new Image()
  frameClip = new Vector2(0, 0)
  /**
   * size
   * @type {Vector2} size - img size
   */
  size = new Vector2()
  /**
   * position
   * @type {Vector2} position - img render position
   */
  position = new Vector2()
  constructor({ src, size, position = this.position, autoAddScene = true }) {
    this.img.src = src
    this.size = size
    this.position = position
    autoAddScene ? spriteManager.add(this) : ''
  }
  /**
   * setSrc
   * @param {string} src - img src
   * @returns {string} img src
   */
  setSrc(src) {
    this.img.src = src
  }
  /**
   * setSize
   * @param {Vector2} size - img size
   */
  setSize(size) {
    this.size = size
  }
  /**
   * setPosition
   * @param {Vector2} position - position
   */
  setPosition(position) {
    this.position = position
  }
  update(delta) {}
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    ctx.drawImage(
      this.img,
      this.frameClip.x, //图片x起始位置
      this.frameClip.y, //图片y起始位置
      this.size.x, // 一帧多宽
      this.size.y, // 一帧多高
      this.position.x, //x坐标
      this.position.y, //y坐标
      this.size.x, //在canvas上显示的宽度
      this.size.y //在canvas上显示的高度
    )
  }
}
