import Component from '../Component/Component.js';
import { imageDataHRevert } from '../../../utils/tool.js';
import data from '../../../utils/data.js';
import Vector2 from '../Vector/Vector2.js';
import spriteAnimatedManager from './SpriteAnimatedManager.js';
import GameManager from '../Singleton/GameManager.js';

export default class SpriteAnimated {
  /**
   * img
   * @type {HTMLImageElement} img - img
   */
  img;
  delta = 0.02;
  /**
   * frameSize
   * @type {Vector2} frameSize - frameSize
   */
  // frameWidth = 60
  // frameHeight = 89
  scale = 1;
  frameWidth = 200;
  frameHeight = 200;
  frameSize = new Vector2(this.frameWidth, this.frameHeight);
  /**
   * 显示尺寸，一般自动计算，除非手动传入
   * @type {Vector2} showSize
   */
  showSize = null;
  /**
   * position
   * @type {Vector2} position - position
   */
  position = new Vector2();
  curAnimationName = 'idle';
  curFrame = 0;
  curRow = 0;
  curMinFrame = 0;
  curMaxFrame = 0;
  fps = 6;

  //翻转
  modifierX = 1;
  modifierY = 1;

  flipX = true;
  flipY = false;

  animationTimer = 0;
  animationInterval = 1600 / this.fps;

  // 上一次绘制时的坐标
  lastPosition = new Vector2();

  defaultAnimationConfig = {
    idle: {
      x: [0, 1, 2],
      y: [0],
      fps: 8,
    },
    walk: {
      x: [3, 4],
      y: [0],
      fps: 10,
    },
  };

  animationConfig = this.defaultAnimationConfig;

  canRender = true;

  init = true;
  constructor({
    src,
    frameSize = this.frameSize,
    showSize = null,
    scale = this.scale,
    animationConfig = this.defaultAnimationConfig,
    autoAddScene = true,
  }) {
    this.img = new Image();
    this.img.src = src;
    this.frameSize = frameSize;
    this.scale = scale;
    this.showSize =
      showSize ||
      new Vector2(this.frameSize.x * this.scale, this.frameSize.y * this.scale);
    this.position.x = 200;
    this.position.y = data.height - this.frameSize.y;
    this.animationConfig = animationConfig;
    autoAddScene ? spriteAnimatedManager.add(this) : '';
  }

  update(delta, ...params) {
    this.delta = delta;
    this.animation(delta);
    const [position] = params;
    this.position = position;
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    ctx.save();
    this.modifierX = this.flipX ? -1 : 1; // 是否需要X轴翻转
    this.modifierY = this.flipY ? -1 : 1; // 是否需要Y轴翻转
    ctx.scale(this.modifierX, this.modifierY); // 翻转
    ctx.drawImage(
      this.img,
      this.curFrame * this.frameSize.x, // 0
      this.curRow * this.frameSize.y, // 0
      this.frameSize.x, // 200
      this.frameSize.y, // 200
      this.position.x * this.modifierX,
      this.position.y * this.modifierY,
      this.showSize.x * this.modifierX,
      this.showSize.y * this.modifierY
    );
    ctx.restore();
    this.lastPosition.set(this.position.x, this.position.y);
  }
  setFlipX(flipX) {
    this.flipX = flipX;
  }
  changeAnimation(animationName) {
    if (this.curAnimationName === animationName) return;
    this.curAnimationName = animationName;
    this.init = true;
  }
  changeImgSrc(src) {
    if (this.img.src === src) return;
    this.img.src = src;
  }
  animation(delta) {
    if (
      this.curFrame === this.curMaxFrame &&
      this.animationConfig[this.curAnimationName].loop ===
        false /* 不写loop时默认循环 */ &&
      !this.init
    ) {
      return;
    }
    this.animationTimer += delta;
    if (this.animationTimer > this.animationInterval) {
      this.init = false;
      const curAnimation = this.animationConfig[this.curAnimationName];
      this.curMinFrame = curAnimation['x'][0];
      this.curMaxFrame = curAnimation['x'][curAnimation['x'].length - 1];
      this.curRow = curAnimation['y'][0];
      this.curFrame = Math.max(
        (this.curFrame + 1) % (this.curMaxFrame + 1),
        this.curMinFrame
      ); // 循环播放动画
      this.animationInterval = 1000 / curAnimation['fps'];
      this.animationTimer = 0;
    }
  }
}
