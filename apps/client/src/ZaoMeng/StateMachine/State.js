import { PlayerStateEnum } from '../Enum/Index.js'
import Player from '../Player.js'
import StateMachine from './StateMachine.js'

export default class State {
  /**
   * @type {StateMachine}
   */
  stateMachine = null
  /**
   * @type {Player}
   */
  player = null
  name = PlayerStateEnum.IDLE
  constructor(stateMachine, player, name) {
    this.stateMachine = stateMachine
    this.player = player
    this.name = name
  }
  enter() {
    this.currentState.enter()
  }
  update(dt) {
    this.currentState.update(dt)
  }
  exit() {
    this.currentState.exited()
  }
}
