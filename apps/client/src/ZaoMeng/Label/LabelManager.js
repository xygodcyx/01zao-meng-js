import Label from './Label.js'
import JumpLabel from './JumpLabel.js'
class LabelManager {
  /**
   * labels
   * @type {Set<Label>} labels - labels
   */
  labels = new Set()
  constructor() {}
  update(delta) {
    this.labels.forEach((label) => label.update(delta))
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    this.labels.forEach((label) => label.render(ctx))
  }
  /**
   * add label
   * @param {label} label - want to add label
   * @returns {boolean} add?
   */
  add(label) {
    return this.labels.add(label) !== null
  }
  /**
   * remove label
   * @param {label} label - want to remove label
   * @returns {boolean} remove?
   */
  remove(label) {
    return this.labels.delete(label)
  }
  clear() {
    this.labels.clear()
  }
}

const labelManger = new LabelManager()
export default labelManger
