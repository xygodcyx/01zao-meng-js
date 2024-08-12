class EventCenter {
  /**
   * eventDic
   * @type {Map<string,Set<Function>>} eventDic - eventDic
   */
  eventDic = new Map()
  _functions = []
  constructor() {}
  /**
   * on
   * @param {string} eventName  -eventName
   * @param {Function} eventFun  -eventFun
   * @param {any} flag  -flag
   */
  on(eventName, eventFun, flag = null) {
    if (this.eventDic.has(eventName)) {
      this.eventDic.set(
        eventName,
        this.eventDic.get(eventName).add(flag ? eventFun.bind(flag) : eventFun)
      )
    } else {
      this.eventDic.set(eventName, new Set().add(flag ? eventFun.bind(flag) : eventFun))
    }
  }
  /**
   * off
   * @param {string} eventName  -eventName
   * @param {Function} eventFun  -eventFun
   */
  off(eventName, eventFun) {
    this.eventDic.get(eventName).has(eventFun) ? this.eventDic.get(eventName).delete(eventFun) : ''
  }
  /**
   * off
   * @param {string} eventName  -eventName
   * @param {Array} param  -param
   * @param {Function} eventFun  -eventFun
   */
  emit(eventName, ...param) {
    this.eventDic.has(eventName) ? this.eventDic.get(eventName).forEach((e) => e(...param)) : ''
  }
  clear(eventName) {
    this.eventDic.get(eventName)?.clear()
  }
  clearAll() {
    this.eventDic.clear()
  }
}
const eventCenter = new EventCenter()

export default eventCenter
