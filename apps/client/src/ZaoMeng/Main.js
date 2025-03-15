import data from '../../utils/data.js'
import Game from './Game.js'
import { createCanvasAndCtx } from '../../utils/tool.js'
const { canvas, ctx } = createCanvasAndCtx()
export default class Main {
  delta = 0.2
  gameLastTime = 0
  isLoaded = false
  isStarted = false
  isDestroyed = false

  constructor() {
    this.game = new Game()
    window.addEventListener('load', () => {
      this.onload()
      this.start()
    })
    window.onbeforeunload = () => {
      console.log('beforeunload')
      this.destroy()
    }
  }
  onload() {
    this.game.onload()
    this.isLoaded = true
  }
  start() {
    this.game.start()
    this.isStarted = true
  }
  destroy() {
    this.game.destroy()
    this.isDestroyed = true
  }
  renderLoop = (gameTime = 0) => {
    ctx.clearRect(0, 0, data.width, data.height)
    this.delta = gameTime - this.gameLastTime
    // if (!this.isLoaded || !this.isStarted || this.isDestroyed) return
    this.game.update(this.delta)
    requestAnimationFrame(this.renderLoop)
    this.game.render(ctx)
    this.gameLastTime = gameTime
  }
  startGame() {
    this.renderLoop()
  }
}
