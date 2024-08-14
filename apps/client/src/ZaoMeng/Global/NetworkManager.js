class NetworkManager {
  /**
   * @typedef {Object} Item
   * @property {Function} cb  -
   * @property {any} ctx -
   */
  /**
   * websocket连接
   * @type {WebSocket} ws -
   */
  ws
  /**
   * eventDic
   * @type {Map<string,Set<Item>>} eventDic - eventDic
   */
  msgMap = new Map()
  isConnect = false
  constructor() {}
  connect() {
    return new Promise((resolve, reject) => {
      if (this.isConnect) {
        resolve(true)
        return
      }
      try {
        this.ws = new WebSocket('ws://localhost:8080')
        this.ws.onopen = () => {
          resolve(true)
          console.log('websocket连接成功')
          this.isConnect = true
        }
        this.ws.onerror = () => {
          reject(false)
          console.log('websocket连接失败')
          this.isConnect = false
        }
        this.ws.onclose = () => {
          console.log('websocket连接断开')
          this.isConnect = false
          reject(false)
        }
        this.ws.onmessage = (e) => {
          const { name, data } = JSON.parse(e.data /* e.data是string类型 */)
          this.msgMap.has(name)
            ? this.msgMap.get(name).forEach(({ cb, ctx }) => cb.call(ctx, data))
            : ''
        }
      } catch (error) {
        console.log('websocket连接失败', error)
      }
    })
  }
  // 模拟api调用(http请求转为websocket请求)
  callApi(apiName, data) {
    return new Promise((resolve, reject) => {
      try {
        const timerId = setTimeout(() => {
          const msg = {
            success: false,
            error: new Error('time out'),
          }
          resolve(msg)
          this.unlistenMsg(apiName, cb, null)
        }, 5000 /* 5秒超时 */)

        const cb = (res /* res为api返回值 */) => {
          clearTimeout(timerId)
          resolve(res) /* 是否成功由后端发来,不需要自己填写 */
          this.unlistenMsg(apiName, cb, null)
        }
        this.listenMsg(apiName, cb, null) //监听消息,有消息发来的时候调用cb然后resolve返回的消息
        this.sendMsg(apiName, data)
      } catch (error) {
        const msg = {
          success: false,
          error,
        } /* 如果发生错误,那就构造一个和后端结构一样的消息体 */
        resolve(msg)
      }
    })
  }
  sendMsg(name, data) {
    const msg = { name, data } /* 真正发送消息的地方 */
    this.ws.send(JSON.stringify(msg))
  }
  /**
   * on
   * @param {string} name  -name
   * @param {Function} cb  -cb
   * @param {any} ctx  -ctx
   */
  listenMsg(name, cb, ctx = null) {
    if (this.msgMap.has(name)) {
      this.msgMap.set(name, this.msgMap.get(name).add({ ctx, cb }))
    } else {
      this.msgMap.set(name, new Set().add({ ctx, cb }))
    }
  }
  /**
   * off
   * @param {string} name  -name
   * @param {Function} cb  -cb
   * @param {ctx} ctx  - ctx
   */
  unlistenMsg(name, cb, ctx = null) {
    this.msgMap.get(name).has(cb) ? this.msgMap.get(name).delete({ ctx, cb }) : ''
  }
}

const networkManager = new NetworkManager()

export default networkManager
