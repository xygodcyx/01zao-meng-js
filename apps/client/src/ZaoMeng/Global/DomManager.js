import dom from '../../../utils/dom.js'
import { DomEnum, EventEnum } from '../Enum/Index.js'
import eventCenter from '../EventCenter/EventCenter.js'

class DomManager {
  _chooseHeroValue = ''
  constructor() {
    dom.getDom(DomEnum.ConfirmHeroChoose).addEventListener('click', (e) => {
      this._chooseHeroValue = dom.getDom(DomEnum.HeroSelect).value
      eventCenter.emit(EventEnum.ChooseHero, this._chooseHeroValue)
      dom.getDom(DomEnum.HeroSelect).style.display = 'none'
      dom.getDom(DomEnum.ConfirmHeroChoose).style.display = 'none'
    })
  }
}

const domManager = new DomManager()
export default domManager
