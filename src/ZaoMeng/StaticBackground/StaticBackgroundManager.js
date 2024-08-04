import Floor from './Floor.js'
class StaticBackgroundManager {
  /**
   * staticBackgrounds
   * @type {Set<staticBackground>} staticBackgrounds - staticBackgrounds
   */
  staticBackgrounds = new Set()
  constructor() {}
  update(delta) {
    this.staticBackgrounds.forEach((staticBackground) => staticBackground.update(delta))
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    this.staticBackgrounds.forEach((staticBackground) => staticBackground.render(ctx))
  }
  /**
   * add staticBackground
   * @param {staticBackground} staticBackground - want to add staticBackground
   * @returns {boolean} add?
   */
  add(staticBackground) {
    return this.staticBackgrounds.add(staticBackground) !== null
  }
  /**
   * remove staticBackground
   * @param {staticBackground} staticBackground - want to remove staticBackground
   * @returns {boolean} remove?
   */
  remove(staticBackground) {
    return this.staticBackgrounds.delete(staticBackground)
  }
  clear() {
    this.staticBackgrounds.clear()
  }
}

const staticBackgroundManger = new StaticBackgroundManager()
export default staticBackgroundManger
