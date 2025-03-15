import { PlayerStateEnum } from '../Enum/Index.js';
import State from './State.js';

export class JumpEndState extends State {
  enter() {
    this.player.playAnimation('jumpEnd');
  }
  update() {
    if (this.player.position.y >= 442.5) {
      this.player.position.y = 442.5;
      this.player.velocity.y = 0;
      this.stateMachine.changeState(this, this.player.idleState);
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
    }
  }
  exit() {}
}
