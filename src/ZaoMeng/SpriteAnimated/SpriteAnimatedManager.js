import SpriteAnimated from './SpriteAnimated.js'

class SpriteAnimatedManager {
  /**
   * sprites
   * @type {Set<SpriteAnimated>} sprites - sprites
   */
  spriteAnimates = new Set()
  constructor() {}
  update(delta) {}
  render(ctx) {
    this.spriteAnimates.forEach((spriteAnimated) => spriteAnimated.render(ctx))
  }
  /**
   * add SpriteAnimated
   * @param {SpriteAnimated} spriteAnimated - want to add SpriteAnimated
   * @returns {boolean} add?
   */
  add(spriteAnimated) {
    return this.spriteAnimates.add(spriteAnimated) !== null
  }
  /**
   * remove SpriteAnimated
   * @param {SpriteAnimated} spriteAnimated - want to remove SpriteAnimated
   * @returns {boolean} remove?
   */
  remove(spriteAnimated) {
    return this.spriteAnimates.delete(spriteAnimated)
  }
  clear() {
    this.spriteAnimates.clear()
  }
}
const spriteAnimatedManager = new SpriteAnimatedManager()
export default spriteAnimatedManager
