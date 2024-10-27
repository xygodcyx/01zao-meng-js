import { PlayerStateEnum } from '../Enum/Index.js'
import State from './State.js'

export class RunState extends State {
  enter() {
    this.player.playAnimation('run')
  }
  update() {
    if (this.player.hasLeft && this.player.hasRight) {
      this.player.dir = 0
    } else if (this.player.hasLeft) {
      this.player.dir = -1
      this.player.nowDir = -1
      this.player.setFlipX(false)
    } else if (this.player.hasRight) {
      this.player.dir = 1
      this.player.nowDir = 1
      this.player.setFlipX(true)
    } else {
      this.stateMachine.changeState(this.player.runState, this.player.idleState)
      this.player.dir = 0
    }
    if (this.player.dir === 1) {
      this.player.setFlipX(true)
    } else if (this.player.dir === -1) {
      this.player.setFlipX(false)
    }
  }
  exit() {}
}
