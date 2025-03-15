import { PlayerStateEnum } from '../Enum/Index.js';
import State from './State.js';

export class JumpStartState extends State {
  enter() {
    this.player.playAnimation('jumpStart');
    this.player.velocity.y = -2;
  }
  update() {
    if (this.player.velocity.y > 0) {
      console.log(this.player.velocity.y);
      this.stateMachine.changeState(this, this.player.jumpEndState);
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
