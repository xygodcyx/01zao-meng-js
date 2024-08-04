import Font from './Font.js'
import Vector2 from '../Vector/Vector2.js'

import eventCenter from '../EventCenter/EventCenter.js'
import { EventEnum } from '../Enum/Index.js'
import labelManger from './LabelManager.js'

let onceDebug = true
export default class Label {
  static text = '默认文本'
  static fontSizeMax = 28
  static position = new Vector2(60, 60)
  static fontSize = this.fontSizeMax
  static width = 0
  static color = '#ecf0f1'
  static alpha = 1
  static align = 'center'
  static font = new Font()
  text = '默认文本'
  fontSizeMax = 28
  fontSize = this.fontSizeMax
  width = 0
  height = 0
  /**
   * textInfo
   * @type {TextMetrics} textInfo - 文本信息
   */
  textInfo = null
  color = '#ecf0f1'
  alpha = 1
  align = 'center'
  /**
   * font
   * @type {Font} font - font
   */
  font = new Font()
  /**
   * position
   * @type {Vector2} position - position
   */
  position = new Vector2(60, 60)
  constructor({
    text = this.text,
    position = this.position,
    fontSizeMax = this.fontSizeMax,
    color = this.color,
    font = this.font,
    autoAddScene = true,
  }) {
    this.text = text
    this.position = position
    this.fontSizeMax = fontSizeMax
    this.fontSize = fontSizeMax
    this.font = font
    this.color = color
    eventCenter.on(EventEnum.FONT_LOADED, this.onFontLoaded, this)
    autoAddScene ? labelManger.add(this) : ''
  }
  update(delta) {}

  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    this.fillText(ctx)
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  fillText(ctx) {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.fillStyle = this.color
    ctx.font = `${this.fontSize}px ${this.font.fontName}`
    ctx.textAlign = this.align
    ctx.fillText(this.text, this.position.x, this.position.y)
    this.textInfo = ctx.measureText(this.text)
    this.width = this.textInfo.width
    this.height = this.textInfo.actualBoundingBoxAscent + this.textInfo.actualBoundingBoxDescent
    onceDebug ? (onceDebug = false) : ''
    ctx.restore()
  }
  setPostion(position) {
    this.position = position
  }
  /**
   * setTextColor
   * @param {string} color - color
   * @returns {string} color
   */
  setTextColor(color) {
    this.color = color
    return this.color
  }
  /**
   * setFontMaxSize
   * @param {number} fontSizeMax - fontSizeMax
   * @returns {number} fontSizeMax
   */
  setFontMaxSize(fontSizeMax) {
    this.fontSizeMax = fontSizeMax
    this.fontSize = this.fontSizeMax
    return this.fontSizeMax
  }
  onFontLoaded(fontName) {
    this.font.fontName = fontName
  }
}
