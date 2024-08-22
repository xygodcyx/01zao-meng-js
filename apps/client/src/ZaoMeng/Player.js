import data from '../../utils/data.js'
import { logOnce } from '../../utils/tool.js'
import Component from './Component/Component.js'
import Effect from './Effect/Effect.js'
import { EventEnum, HeroNameEnum, InputTypeEnum, PlayerEnum } from './Enum/Index.js'
import eventCenter from './EventCenter/EventCenter.js'
import dataManager from './Global/DataManager.js'
import Input from './Input.js'
import JumpLabel from './Label/JumpLabel.js'
import Label from './Label/Label.js'
import SpriteAnimated from './SpriteAnimated/SpriteAnimated.js'
import Vector2 from './Vector/Vector2.js'
export default class Player {
  // 昵称
  /**
   * nameLabel
   * @type {Label} nameLabel - nameLabel
   */
  nameLabel

  // 输入石头
  /**
   * input
   * @type {Input} input - input
   */
  input
  key // 左右按键
  hasLeft = false
  hasRight = false
  delta = 0.02
  dir = 0
  moveSpeed = 0.16 /* 单位是m/s */

  // 特效
  effectTimer = 0
  effectInterval = 0.1

  // 动画和位置（动画决定位置）
  /**
   * anim
   * @type {SpriteAnimated} anim - anim
   */
  cloth_anim
  weapon_anim
  /**
   * position
   * @type {Vector2} position - position
   */
  position
  animationConfig = {
    idle: {
      x: [0, 1, 2, 3, 4, 5],
      y: [0],
      fps: 6,
    },
    walk: {
      x: [0, 1, 2, 3],
      y: [2],
      fps: 4,
    },
    run: {
      x: [0, 1, 2, 3],
      y: [3],
      fps: 4,
    },
    cloudFloor: {
      x: [4],
      y: [4],
      fps: 1,
    },
  }
  /**
   * heroName
   * @type {string} 角色的名字(不是昵称) - wukong/tangseng/shaseng/bajie
   */
  heroName = 'wukong'
  id = 0 // 玩家的id
  cloths = []

  weapons = []
  curCloth = 0
  curWeapon = 0

  // 因为图片有空白，所以检测碰撞时需要加上偏移量
  leftOffset = 70
  rightOffset = 46

  playerNumber = PlayerEnum.PLAYER_1

  // 面朝哪里(不参与计算,只是给别的玩家参考)
  nowDir = 1

  constructor({
    id,
    heroName,
    playerNumber = PlayerEnum.PLAYER_1,
    position = null,
    nowDir = 1,
    cloths = this.cloths,
    weapons = this.weapons,
  }) {
    this.init(heroName)
    this.id = id
    position ? (this.position = new Vector2(position.x, position.y)) : ''
    nowDir ? (this.nowDir = nowDir) : ''
    this.dir = nowDir
    this.playerNumber = playerNumber
    this.input = new Input()
    this.key = this.input.key
    this.cloths = cloths
    this.weapons = weapons
    this.nameLabel.align = 'center'
    // 配置动画参数
    this.cloth_anim.animationConfig = this.animationConfig
    this.weapon_anim.animationConfig = this.animationConfig
    this.cloth_anim.setFlipX(true)
    this.weapon_anim.setFlipX(true)
    console.log(dataManager.playerNumberPlayerIdMap)
    console.log(this.id, this.playerNumber)
    if (dataManager.playerNumberPlayerIdMap.get(this.playerNumber) === this.id) {
      this.nameLabel.text += '(me)'
      eventCenter.on('keydown', this.onKeyDown, this)
      eventCenter.on('keyup', this.onKeyUp, this)
    }
  }
  destroy() {
    if (dataManager.playerNumberPlayerIdMap.get(this.playerNumber) === this.id) {
      eventCenter.off('keydown', this.onKeyDown, this)
      eventCenter.off('keyup', this.onKeyUp, this)
    }
  }
  test() {
    window.addEventListener('load', () => {
      this.cloths.forEach((cloth) => {
        document.querySelector(`.${'yifu_' + cloth.name}`).addEventListener('click', () => {
          this.cloth_anim.changeImgSrc(cloth.src)
        })
      })
      this.weapons.forEach((weapon) => {
        document.querySelector(`.${'wuqi_' + weapon.name}`).addEventListener('click', () => {
          this.weapon_anim.changeImgSrc(weapon.src)
        })
      })
    })
  }

  init(heroName) {
    const that = this
    that.heroName = heroName
    createInitPlayer()
    initPosition()
    initEquip()
    initNameLabel()
    function createInitPlayer() {
      that.weapon_anim = new SpriteAnimated({
        src: `res/hero/${that.heroName}/wuqi_初始.png`,
        autoAddScene: false,
      })
      that.cloth_anim = new SpriteAnimated({
        src: `res/hero/${that.heroName}/yifu_初始${
          that.heroName === HeroNameEnum.ShaSeng ? '_chan' : ''
        }.png`,
        autoAddScene: false,
        frameSize: that.heroName === 'bajie' ? new Vector2(300, 200) : new Vector2(200, 200),
      })
    }
    function initPosition() {
      that.position = new Vector2(
        data.width / 2 - that.cloth_anim.frameWidth / 2,
        data.height - that.cloth_anim.frameHeight - data.floorHeight / 2
      )
    }
    function initEquip() {
      that.cloths.push({
        name: '初始',
        src: `res/hero/${that.heroName}/yifu_初始${
          that.heroName === HeroNameEnum.ShaSeng ? '_chan' : ''
        }.png`,
      })
      that.weapons.push({
        name: '初始',
        src: `res/hero/${that.heroName}/wuqi_初始.png`,
      })
    }
    function initNameLabel() {
      that.nameLabel = new Label({
        text: that.heroName,
        position: Vector2.zero,
        fontSizeMax: 22,
        color: '#F9A602',
        autoAddScene: false,
      })
    }
  }
  update(delta) {
    // logOnce({ id: 'player update', count: 4 }, this.heroName)
    this.delta = delta
    this.move(delta)
    this.cloth_anim.update(delta, this.position)
    this.weapon_anim.update(delta, this.position)
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    this.weapon_anim.render(ctx)
    this.cloth_anim.render(ctx) /* 还是要在各自的player里render,不然不好控制 */
    this.nameLabel.render(ctx)
    // 这些所有玩家都要判断
    this.changeDirByKey()
    this.changeFlipXByDir()
    this.playAnimationByDir()
    this.judgmentBorder()
  }

  move(delta) {
    // this.nameLabel.setPostion(
    //   new Vector2(
    //     this.position.x + this.cloth_anim.frameSize.x / 2,
    //     this.position.y + this.nameLabel.height * 2.1
    //   )
    // )
    // this.position.x += delta * this.dir * this.moveSpeed
    if (dataManager.playerNumberPlayerIdMap.get(this.playerNumber) !== this.id) {
      return
    }
    // 只发送自己的位置
    const msg = {
      type: InputTypeEnum.PlayerMove,
      id: this.id,
      dir: this.dir,
      nowDir: this.nowDir,
      dt: delta,
    }
    eventCenter.emit(EventEnum.ClientInput, msg)
  }
  onKeyDown() {
    this.hasLeft = this.input.hasKey(this.key.Left, this.playerNumber)
    this.hasRight = this.input.hasKey(this.key.Right, this.playerNumber)
  }
  onKeyUp() {
    this.hasLeft = this.input.hasKey(this.key.Left, this.playerNumber)
    this.hasRight = this.input.hasKey(this.key.Right, this.playerNumber)
  }
  changeDirByKey() {
    if (dataManager.playerNumberPlayerIdMap.get(this.playerNumber) !== this.id) {
      return
    }
    // 如果不是自己,那就接收从服务端传来的dir
    if (this.hasLeft && this.hasRight) {
      this.dir = 0
    } else if (this.hasLeft) {
      this.dir = -1
      this.nowDir = -1
      this.setFlipX(false)
    } else if (this.hasRight) {
      this.dir = 1
      this.nowDir = 1
      this.setFlipX(true)
    } else {
      this.dir = 0
    }
  }
  changeFlipXByDir() {
    if (this.dir === 1) {
      this.setFlipX(true)
    } else if (this.dir === -1) {
      this.setFlipX(false)
    }
  }
  setFlipX(canFlipX) {
    this.cloth_anim.setFlipX(canFlipX)
    this.weapon_anim.setFlipX(canFlipX)
  }
  playAnimation(name) {
    this.weapon_anim.changeAnimation(name)
    this.cloth_anim.changeAnimation(name)
  }
  playAnimationByDir() {
    switch (this.dir) {
      case 1:
      case -1:
        this.playAnimation('run')
        break
      case 0:
        this.playAnimation('idle')
        break
      default:
        this.playAnimation('idle')
    }
  }
  judgmentBorder() {
    if (this.position.x > data.width - this.cloth_anim.frameSize.x + this.rightOffset) {
      this.position.x = data.width - this.cloth_anim.frameSize.x + this.rightOffset
      // this.playAnimation('idle')
    } else if (this.position.x + this.leftOffset < 0) {
      this.position.x = -this.leftOffset
      // this.playAnimation('idle')
      new JumpLabel()
    } else if (this.cloth_anim.curAnimationName == 'walk') {
      this.effectTimer += this.delta
      if (this.effectTimer > this.effectInterval) {
        this.effectTimer = 0
      }
    }
  }
}
