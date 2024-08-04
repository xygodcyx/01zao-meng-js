import ArmFace from './ArmFace.js'
class ArmFaceManager {
  /**
   * armFaces
   * @type {Set<ArmFace>} armFaces - armFaces
   */
  armFaces = new Set()
  constructor() {}
  update(delta) {
    this.armFaces.forEach((armFace) => armFace.update(delta))
  }
  /**
   * render
   * @param {CanvasRenderingContext2D} ctx - ctx
   */
  render(ctx) {
    this.armFaces.forEach((armFace) => armFace.render(ctx))
  }
  /**
   * add armFace
   * @param {armFace} armFace - want to add armFace
   * @returns {boolean} add?
   */
  add(armFace) {
    return this.armFaces.add(armFace) !== null
  }
  /**
   * remove armFace
   * @param {armFace} armFace - want to remove armFace
   * @returns {boolean} remove?
   */
  remove(armFace) {
    return this.armFaces.delete(armFace)
  }
  clear() {
    this.armFaces.clear()
  }
}

const armFaceManger = new ArmFaceManager()
export default armFaceManger
