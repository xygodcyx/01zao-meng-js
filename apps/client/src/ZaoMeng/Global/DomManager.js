import dom from '../../../utils/dom.js'
import { DomEnum, EventEnum, GAME_MODE } from '../Enum/Index.js'
import eventCenter from '../EventCenter/EventCenter.js'
import dataManager from './DataManager.js'

class DomManager {
  _chooseHeroValue = 'wukong'
  _playerNumberValue = 'PLAYER_1'
  constructor() {
    dom.getDom(DomEnum.ConfirmHeroChoose).addEventListener('click', (e) => {
      this._chooseHeroValue = dom.getDom(DomEnum.HeroNameSelect).value
      this._playerNumberValue = dom.getDom(DomEnum.PlayerNumberSelect).value
      eventCenter.emit(EventEnum.ChooseHero, {
        heroName: this._chooseHeroValue,
        playerNumber: this._playerNumberValue,
      })
      dom.getDom(DomEnum.selectHero).style.display = 'none'
    })
  }
}

const domManager = new DomManager()
export default domManager
