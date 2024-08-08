import data from '../../utils/data.js'
import Component from './Component/Component.js'
import Effect from './Effect/Effect.js'
import { PlayerEnum } from './Enum/Index.js'
import eventCenter from './EventCenter/EventCenter.js'
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

  /* 
    other
     */
  baseColor = '#5b6ee1'

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
  canAutoMove = false
  autoMoveTargetPosition = 0
  isArriveTargetPoint = false
  dir = 0
  moveSpeed = 300

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
      fps: 12,
    },
    walk: {
      x: [0, 1, 2, 3],
      y: [2],
      fps: 12,
    },
    run: {
      x: [0, 1, 2, 3],
      y: [3],
      fps: 12,
    },
    cloudFloor: {
      x: [4],
      y: [4],
      fps: 10,
    },
  }
  /**
   * id
   * @type {string} 角色的id - wukong/tangseng/shaseng/bajie
   */
  id = 'wukong'
  cloths = [
    {
      name: '初始',
      src: `res/hero/wukong/yifu_初始.png`,
    },
    {
      name: '虬龙甲',
      src: `res/hero/wukong/yifu_虬龙甲.png`,
    },
    {
      name: '枯叶衫',
      src: `res/hero/wukong/yifu_枯叶衫.png`,
    },
  ]

  weapons = [
    {
      name: '初始',
      src: `res/hero/wukong/wuqi_初始.png`,
    },
    {
      name: '青云冰刀',
      src: `res/hero/wukong/wuqi_青云冰刀.png`,
    },
    {
      name: '紫金镔铁棍',
      src: `res/hero/wukong/wuqi_紫金镔铁棍.png`,
    },
  ]
  curCloth = 0
  curWeapon = 0

  // 因为图片有空白，所以检测碰撞时需要加上偏移量
  leftOffset = 70
  rightOffset = 46

  playerNumber = PlayerEnum.PLAYER_1

  constructor({
    playerNumber = PlayerEnum.PLAYER_1,
    id = 'wukong',
    nameLabel = new Label({
      text: '悟空',
      position: Vector2.zero,
      fontSizeMax: 22,
      color: '#F9A602',
    }),
    cloths = this.cloths,
    weapons = this.weapons,
  }) {
    this.id = id
    this.init()
    this.playerNumber = playerNumber
    this.input = new Input()
    this.key = this.input.key
    this.nameLabel = nameLabel
    this.cloths = cloths
    this.weapons = weapons
    // this.nameLabel.setTextColor(this.baseColor)
    this.nameLabel.align = 'center'
    // 配置动画参数
    this.cloth_anim.animationConfig = this.animationConfig
    this.weapon_anim.animationConfig = this.animationConfig
    this.cloth_anim.setFlipX(true)
    this.weapon_anim.setFlipX(true)
    eventCenter.on('keydown', this.onKeyDown, this)
    eventCenter.on('keyup', this.onKeyUp, this)
    this.test()
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

  init() {
    const that = this
    createInitPlayer()
    initPosition()
    function createInitPlayer() {
      that.weapon_anim = new SpriteAnimated({
        src: `res/hero/${that.id}/wuqi_初始.png`,
        autoAddScene: false,
      })
      that.cloth_anim = new SpriteAnimated({
        src: `res/hero/${that.id}/yifu_初始${that.id === 'shaseng' ? '_chan' : ''}.png`,
        autoAddScene: false,
        frameSize: that.id === 'bajie' ? new Vector2(300, 200) : new Vector2(200, 200),
      })
    }
    function initPosition() {
      that.position = new Vector2(
        data.width / 2 - that.cloth_anim.frameWidth / 2,
        data.height - that.cloth_anim.frameHeight - data.floorHeight / 2
      )
    }
  }
  update(delta) {
    this.delta = delta
    this.randomMove()
    this.autoMove(this.autoMoveTargetPosition)
    this.move(delta)

    this.cloth_anim.update(delta, this.position)
    this.weapon_anim.update(delta, this.position)
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render({ playerClothCtx, playerWeaponCtx }) {
    this.weapon_anim.render(playerWeaponCtx)
    this.cloth_anim.render(playerClothCtx)
  }

  move(delta) {
    this.changeDirByKey()
    this.playAnimationByDir()
    this.position.x += delta * this.dir * this.moveSpeed
    this.judgmentBorder()
    this.nameLabel.setPostion(
      new Vector2(
        this.position.x + this.cloth_anim.frameSize.x / 2,
        this.position.y + this.nameLabel.height * 2.1
      )
    )
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
    /* 
      stop autoMove , if press key in [hasLeft , hasRight]
    */
    if (this.canAutoMove) {
      if (this.hasLeft || this.hasRight) {
        this.canAutoMove = false
      } else {
        return
      }
    }
    if (this.hasLeft && this.hasRight) {
      this.dir = 0
    } else if (this.hasLeft) {
      this.dir = -1
      this.cloth_anim.setFlipX(false)
      this.weapon_anim.setFlipX(false)
    } else if (this.hasRight) {
      this.dir = 1
      this.cloth_anim.setFlipX(true)
      this.weapon_anim.setFlipX(true)
    } else {
      this.dir = 0
    }
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
        // new Effect(
        //   new Vector2(
        //     this.position.x + (this.dir > 0 ? 0 : this.anim.frameSize.x),
        //     this.position.y + this.anim.frameHeight
        //   ),
        //   this.baseColor
        // )
      }
    }
  }

  moveTo(position) {
    this.autoMoveTargetPosition = position.x
    this.canAutoMove = true
  }

  autoMove(targetPosition) {
    if (!this.canAutoMove) return
    const distance = Math.abs(this.position.x - targetPosition)
    if (distance > 10) {
      this.dir = targetPosition - this.position.x > 0 ? 1 : -1
      this.move(this.delta)
      this.isArriveTargetPoint = false
    } else {
      this.dir = 0
      this.position.x = targetPosition
      this.canAutoMove = false
      this.isArriveTargetPoint = true
    }
    this.judgmentBorder()
  }

  randomMove() {
    if (!this.canAutoMove) return
    if (this.isArriveTargetPoint) {
      this.autoMoveTargetPosition = Math.random() * (data.width - this.cloth_anim.frameSize.x)
      this.canAutoMove = true
    }
  }
}
