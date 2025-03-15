import { PlayerStateEnum } from '../Enum/Index.js';
import State from './State.js';

export class DoubleJumpState extends State {
  enter() {
    this.player.playAnimation('doubleJump');
  }
  update() {
    this.stateMachine.changeState(this, this.player.jumpEndState);
  }
  exit() {}
}
