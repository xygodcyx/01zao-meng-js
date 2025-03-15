import dom from '../../utils/dom.js';
import { PlayerEnum } from './Enum/Index.js';
import eventCenter from './EventCenter/EventCenter.js';
const leftArrow = dom.getDom('.leftArrow');
const rightArrow = dom.getDom('.rightArrow');
export default class Input {
  activeInputs = [];
  key = {}; /* 动态生成 */
  keyMap = {
    Left: [
      {
        who: PlayerEnum.PLAYER_1,
        key: 'a',
      },
      {
        who: PlayerEnum.PLAYER_2,
        key: 'ArrowLeft',
      },
    ],
    Right: [
      {
        who: PlayerEnum.PLAYER_1,
        key: 'd',
      },
      {
        who: PlayerEnum.PLAYER_2,
        key: 'ArrowRight',
      },
    ],
    Attack: [
      {
        who: PlayerEnum.PLAYER_1,
        key: 'j',
      },
      {
        who: PlayerEnum.PLAYER_2,
        key: '1',
      },
    ],
    Jump: [
      {
        who: PlayerEnum.PLAYER_1,
        key: 'k',
      },
      {
        who: PlayerEnum.PLAYER_2,
        key: '2',
      },
    ],
  };
  constructor() {
    // leftArrow?.addEventListener('mouseenter', () => {
    //   this.addKey(this.key.Left)
    //   eventCenter.emit('keydown')
    // })
    // leftArrow?.addEventListener('mouseleave', () => {
    //   this.removeKey(this.key.Left)
    //   eventCenter.emit('keyup')
    // })
    // rightArrow?.addEventListener('mouseenter', () => {
    //   this.addKey(this.key.Right)
    //   eventCenter.emit('keydown')
    // })
    // rightArrow?.addEventListener('mouseleave', () => {
    //   this.removeKey(this.key.Right)
    //   eventCenter.emit('keyup')
    // })
    for (const key in this.keyMap) {
      if (Object.prototype.hasOwnProperty.call(this.keyMap, key)) {
        this.key[key] = key;
      }
    }
    console.log(this.key);
    window.addEventListener('keydown', (e) => {
      this.checkAddKey(e);
      eventCenter.emit('keydown');
    });
    window.addEventListener('keyup', (e) => {
      this.checkRemoveKey(e);
      eventCenter.emit('keyup');
    });
    window.addEventListener('blur', () => {
      this.clear();
      eventCenter.emit('keyup');
    });
  }
  clear() {
    this.activeInputs = [];
  }
  checkAddKey(e) {
    for (const key in this.key) {
      if (Object.prototype.hasOwnProperty.call(this.key, key)) {
        this.addKey(key, e.key);
      }
    }
  }

  checkRemoveKey(e) {
    for (const key in this.key) {
      if (Object.prototype.hasOwnProperty.call(this.key, key)) {
        this.removeKey(key, e.key);
      }
    }
  }
  addKey(wantAddKey, key = this.keyMap[wantAddKey][0].key) {
    if (!this.judgmentExistMap(wantAddKey, key)) return;
    if (!this.judgmentExist(key)) {
      this.activeInputs.push(key);
    }
  }
  removeKey(wantRemoveKey, key = this.keyMap[wantRemoveKey][0].key) {
    if (!this.judgmentExistMap(wantRemoveKey, key)) return;
    if (this.judgmentExist(key)) {
      this.activeInputs.splice(this.getKeyIndex(key), 1);
    }
  }
  getKeyIndex(key) {
    return this.activeInputs.findIndex((k) => k === key);
  }
  judgmentExist(key) {
    return this.getKeyIndex(key) !== -1 ? true : false;
  }
  judgmentExistMap(mapKey, judgmentKey) {
    return this.keyMap[mapKey].findIndex((k) => k.key === judgmentKey) !== -1
      ? true
      : false;
  }

  hasKey(key, playerNumber) {
    return this.keyMap[key]
      .filter((k) => k.who === playerNumber)
      .map((k) => k.key)
      .some((v) => this.judgmentExist(v));
    // for (let i = 0; i < keys.length; i++) {
    //   if (this.judgmentExist(keys[i], playerNumber)) {
    //     return true
    //   }
    // }
    // return false
  }
}
