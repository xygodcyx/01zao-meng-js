import dom from '../../utils/dom.js'
import eventCenter from './EventCenter/EventCenter.js'
const leftArrow = dom.getDom('.leftArrow')
const rightArrow = dom.getDom('.rightArrow')
export default class Input {
  activeInputs = []
  key = {
    Left: 'Left',
    Right: 'Right',
  }
  keyMap = {
    Left: ['a', 'ArrowLeft', 'w'],
    Right: ['d', 'ArrowRight', 's'],
  }
  constructor() {
    leftArrow?.addEventListener('mouseenter', () => {
      this.addKey(this.key.Left)
      eventCenter.emit('keydown')
    })
    leftArrow?.addEventListener('mouseleave', () => {
      this.removeKey(this.key.Left)
      eventCenter.emit('keyup')
    })
    rightArrow?.addEventListener('mouseenter', () => {
      this.addKey(this.key.Right)
      eventCenter.emit('keydown')
    })
    rightArrow?.addEventListener('mouseleave', () => {
      this.removeKey(this.key.Right)
      eventCenter.emit('keyup')
    })
    window.addEventListener('keydown', (e) => {
      this.addKey(this.key.Left, e.key)
      this.addKey(this.key.Right, e.key)
      eventCenter.emit('keydown')
    })
    window.addEventListener('keyup', (e) => {
      this.removeKey(this.key.Left, e.key)
      this.removeKey(this.key.Right, e.key)
      eventCenter.emit('keyup')
    })
  }
  addKey(wantAddKey, key = this.keyMap[wantAddKey][0]) {
    if (!this.judgmentExistMap(wantAddKey, key)) return
    if (!this.judgmentExist(key)) {
      this.activeInputs.push(key)
    }
  }
  removeKey(wantRemoveKey, key = this.keyMap[wantRemoveKey][0]) {
    if (!this.judgmentExistMap(wantRemoveKey, key)) return
    if (this.judgmentExist(key)) {
      this.activeInputs.splice(this.getKey(key), 1)
    }
  }
  getKey(key) {
    return this.activeInputs.findIndex((k) => k === key)
  }
  judgmentExist(key) {
    return this.getKey(key) !== -1 ? true : false
  }
  judgmentExistMap(mapKey, judgmentKey) {
    return this.keyMap[mapKey].findIndex((k) => k === judgmentKey) !== -1 ? true : false
  }

  hasKey(key) {
    const keys = this.keyMap[key]
    for (let i = 0; i < keys.length; i++) {
      if (this.judgmentExist(keys[i])) {
        return true
      }
    }
    return false
  }
}