import Sprite from './Sprite.js'

class SpriteManager {
  /**
   * sprites
   * @type {Set<Sprite>} sprites - sprites
   */
  sprites = new Set()
  constructor() {}
  update(delta) {}
  render(ctx) {
    this.sprites.forEach((sprite) => sprite.render(ctx))
  }
  /**
   * add Sprite
   * @param {Sprite} sprite - want to add Sprite
   * @returns {boolean} add?
   */
  add(sprite) {
    return this.sprites.add(sprite) !== null
  }
  /**
   * remove Sprite
   * @param {Sprite} sprite - want to remove Sprite
   * @returns {boolean} remove?
   */
  remove(sprite) {
    return this.sprites.delete(sprite)
  }
  clear() {
    this.sprites.clear()
  }
}
const spriteManager = new SpriteManager()
export default spriteManager
