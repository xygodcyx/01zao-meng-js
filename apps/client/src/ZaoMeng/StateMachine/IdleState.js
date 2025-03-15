import { PlayerStateEnum } from '../Enum/Index.js';
import State from './State.js';

export class IdleState extends State {
  enter() {
    this.player.playAnimation('idle');
  }
  update(dt) {
    if (this.player.hasLeftKey || this.player.hasRightKey) {
      this.player.dir = -1;
      this.player.nowDir = -1;
      this.player.setFlipX(false);
      this.stateMachine.changeState(this, this.player.runState);
    } else if (this.player.hasJumpKey) {
      this.player.velocity.y = -1.5;
      this.stateMachine.changeState(this, this.player.jumpStartState);
    }
  }
  exit() {}
}
