import { PlayerStateEnum } from '../Enum/Index.js';
import State from './State.js';

export class RunState extends State {
  enter() {
    this.player.playAnimation('run');
  }
  update() {
    if (this.player.hasJumpKey) {
      this.stateMachine.changeState(this, this.player.jumpStartState);
    }
    if (this.player.hasLeftKey && this.player.hasRightKey) {
      this.player.dir = 0;
    } else if (this.player.hasLeftKey) {
      this.player.dir = -1;
      this.player.nowDir = -1;
      this.player.setFlipX(false);
    } else if (this.player.hasRightKey) {
      this.player.dir = 1;
      this.player.nowDir = 1;
      this.player.setFlipX(true);
    } else {
      this.stateMachine.changeState(this, this.player.idleState);
      this.player.dir = 0;
    }
    if (this.player.dir === 1) {
      this.player.setFlipX(true);
    } else if (this.player.dir === -1) {
      this.player.setFlipX(false);
    }
  }
  exit() {}
}
