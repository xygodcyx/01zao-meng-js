import { PlayerStateEnum } from '../Enum/Index.js'
import State from './State.js'

export class IdleState extends State {
  enter() {
    this.player.playAnimation('idle')
  }
  update() {
    if (this.player.hasLeft || this.player.hasRight) {
      this.player.dir = -1
      this.player.nowDir = -1
      this.player.setFlipX(false)
      this.stateMachine.changeState(this.player.idleState, this.player.runState)
    }
  }
  exit() {}
}
