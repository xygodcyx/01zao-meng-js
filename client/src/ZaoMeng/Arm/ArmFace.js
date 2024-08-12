import data from '../../../utils/data.js'
import Label from '../Label/Label.js'
import Vector2 from '../Vector/Vector2.js'
import Arm from './Arm.js'
import armFaceManger from './ArmFaceManager.js'
import { ClickEvent } from '../EventCenter/ClickEvent.js'
import { HoverEvent } from '../EventCenter/hOVEREvent.js'
import eventCenter from '../EventCenter/EventCenter.js'
import Sprite from '../SpriteAnimated/Sprite.js'

export default class ArmFace {
  static imgFaceWidth = 46
  static imgFaceHeight = 47
  /**
   * sprite
   * @type {Sprite} sprite - armFace sprite
   */
  sprite

  /**
   * size
   * @type {Vector2} size - size
   */
  size = new Vector2(ArmFace.imgFaceHeight, ArmFace.imgFaceHeight)
  /**
   * position
   * @type {Vector2} position - position
   */
  position = new Vector2(46, data.height - data.floorHeight / 2)
  /**
   * click armFace create arm
   * @type {Arm} arm - click armFace create arm
   */
  arm
  // imgFaceWidth = 46;
  // imgFaceHeight = 47;
  name = 'xygod'
  /**
   * nameLabel
   * @type {Label} nameLabel - arm nameLabel
   */
  nameLabel = new Label(this.name)

  constructor(position = this.position, name = this.name) {
    this.position.addV2(position)
    this.sprite = new Sprite('public/img/player1-head.png', this.size, this.position)
    armFaceManger.add(this)
    this.nameLabel.position = new Vector2(
      this.position.x + this.size.x / 2,
      this.position.y - this.size.y / 3
    )
    this.name = name
    this.nameLabel.text = this.name
    this.nameLabel.setFontMaxSize(16)
    this.nameLabel.align = 'center'
    eventCenter.on('click', this.onClick, this)
  }
  update(delta) {}
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx -
   */
  render(ctx) {}
  /**
   * clickEvent
   * @param {ClickEvent} clickEvent - clickEvent
   */
  onClick(clickEvent) {
    const position = clickEvent.clickInfo.position
    const min = position.x > this.position.x && position.y > this.position.y
    const max =
      position.x < this.position.x + this.size.x && position.y < this.position.y + this.size.y
    if (min && max) {
      console.log(this.name)
      new Arm(this.name)
    }
  }
  /**
   * hoverEvent
   * @param {HoverEvent} hoverEvent - hoverEvent
   */
  onHover(hoverEvent) {
    const position = hoverEvent.clickInfo.position
    const min = position.x > this.position.x && position.y > this.position.y
    const max =
      position.x < this.position.x + this.imgFaceWidth &&
      position.y < this.position.y + this.imgFaceHeight
    if (min && max) {
      document.body.style.cursor = 'pointer'
    } else {
      document.body.style.cursor = 'default'
    }
  }
}
