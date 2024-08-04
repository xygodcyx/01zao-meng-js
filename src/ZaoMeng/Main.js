import data from '../../utils/data.js'
import Game from './Game.js'
import { createCanvasAndCtx } from '../../utils/tool.js'
import GameManager from './Singleton/GameManager.js'
const { canvas, ctx } = createCanvasAndCtx()
const { canvas: playerClothCanvas, ctx: playerClothCtx } = createCanvasAndCtx('#playerCloth')
const { canvas: playerWeaponCanvas, ctx: playerWeaponCtx } = createCanvasAndCtx('#playerWeapon')
export default class Main {
  delta = 0.2
  gameLastTime = 0
  constructor() {
    this.game = new Game()
  }
  renderLoop = (gameTime = 0) => {
    ctx.clearRect(0, 0, data.width, data.height)
    // this.clearPlayerClothCanvas()
    // this.clearPlayerWeaponCanvas()
    // ctx.save()
    // ctx.fillStyle = '#fff'
    // ctx.fillRect(0, data.height - data.floorHeight, data.width, 2)
    // ctx.restore()
    requestAnimationFrame(this.renderLoop)
    this.delta = gameTime - this.gameLastTime
    this.gameLastTime = gameTime
    this.game.update(this.delta / 1000)
    this.game.render(ctx, { playerClothCtx, playerWeaponCtx })
  }
  clearPlayerClothCanvas = () => {
    playerClothCtx.clearRect(0, 0, data.width, data.height)
  }
  clearPlayerWeaponCanvas = () => {
    playerWeaponCtx.clearRect(0, 0, data.width, data.height)
  }
  startGame() {
    this.renderLoop()
  }
}
