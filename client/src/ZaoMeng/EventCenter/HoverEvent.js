import Vector2 from '../Vector/Vector2.js'
import eventCenter from './EventCenter.js'

export class HoverEvent {
  clickInfo = {
    /**
     * position
     * @type {Vector2} position - position
     */
    position: new Vector2(),
  }
  constructor() {
    window.addEventListener('mousemove', (event) => {
      this.clickInfo.position = new Vector2(event.clientX, event.clientY - 60)
      eventCenter.emit('hover', this)
    })
  }
}

const hoverEvent = new HoverEvent()
export default hoverEvent
