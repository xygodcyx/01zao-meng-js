import State from './State.js'

export default class StateMachine {
  /**
   * 当前的状态
   * @type {State}
   */
  currentState = null
  constructor() {
    this.currentState = null
  }
  enter() {
    this.currentState.enter()
  }
  update(dt) {
    this.currentState.update(dt)
  }
  exited() {
    this.currentState.exit()
  }
  /**
   * @param {State} oldState 之前的状态
   * @param {State} newState 新的状态
   */
  changeState(oldState, newState) {
    console.log(oldState, newState)
    if (this.currentState.name !== oldState.name) {
      return
    }
    this.currentState.exit()
    this.currentState = newState
    this.currentState.enter()
  }
}
