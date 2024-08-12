import Vector2 from '../Vector/Vector2.js'
import eventCenter from './EventCenter.js'

export class ClickEvent {
  clickInfo = {
    /**
     * position
     * @type {Vector2} position - position
     */
    position: new Vector2(),
  }
  constructor() {
    window.addEventListener('click', (event) => {
      this.clickInfo.position = new Vector2(event.clientX, event.clientY - 60)
      eventCenter.emit('click', this)
    })
  }
}

const clickEvent = new ClickEvent()
export default clickEvent
