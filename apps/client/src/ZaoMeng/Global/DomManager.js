import dom from '../../../utils/dom.js'
import { DomEnum, EventEnum } from '../Enum/Index.js'
import eventCenter from '../EventCenter/EventCenter.js'

class DomManager {
  _chooseHeroValue = ''
  _playerNumberValue = ''
  constructor() {
    dom.getDom(DomEnum.ConfirmHeroChoose).addEventListener('click', (e) => {
      this._chooseHeroValue = dom.getDom(DomEnum.HeroNameSelect).value
      this._playerNumberValue = dom.getDom(DomEnum.PlayerNumberSelect).value
      eventCenter.emit(EventEnum.ChooseHero, {
        heroName: this._chooseHeroValue,
        playerNumber: this._playerNumberValue,
      })
      dom.getDom(DomEnum.HeroNameSelect).style.display = 'none'
      dom.getDom(DomEnum.PlayerNumberSelect).style.display = 'none'
      dom.getDom(DomEnum.ConfirmHeroChoose).style.display = 'none'
    })
  }
}

const domManager = new DomManager()
export default domManager
