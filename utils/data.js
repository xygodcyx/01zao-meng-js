class Data {
  topNav = ['知识卡片', '知识博客', '开源精品', '自录教程']
  // width = window.innerWidth
  width = 1440
  height = 690
  floorHeight = 95
  /**
   * ctx
   * @type {CanvasRenderingContext2D} ctx - ctx
   */
  ctx
  constructor() {
    window.addEventListener('resize', () => {
      // this.width = window.innerWidth
    })
  }
}

export default new Data()
