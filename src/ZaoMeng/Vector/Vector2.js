export default class Vector2 {
  x = 0
  y = 0
  static zero = new Vector2(0, 0)
  static one = new Vector2(1, 1)
  static up = new Vector2(0, 1)
  static down = new Vector2(0, -1)
  static left = new Vector2(-1, 0)
  static right = new Vector2(1, 0)
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  /**
   * set x,y
   * @param {number} x - x
   * @param {number} y - y
   * @returns {Vector2}
   */
  set(x, y) {
    this.x = x
    this.y = y
    return this
  }

  /**
   * distance to v2 , slower than distancePow , but more precision
   * @param {Vector2} v2 - other v2
   * @returns {number} cur distance
   */
  distance(v2) {
    return Math.sqrt(Math.pow(Math.abs(this.x - v2.x), 2) + Math.pow(Math.abs(this.y - v2.y), 2))
  }

  /**
   * distance to v2 with pow , faster than distance
   * @param {Vector2} v2 - other v2
   * @returns {number} cur distance with pow
   */
  distancePow(v2) {
    return Math.pow(Math.abs(this.x - v2.x), 2) + Math.pow(Math.abs(this.y - v2.y), 2)
  }
  /**
   * add to v2
   * @param {Vector2} v2 - other v2
   * @returns {Vector2} cur Vector2
   */
  addV2(v2 = Vector2.zero) {
    this.x += v2.x
    this.y += v2.y
    return this
  }
}
