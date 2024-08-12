import { WebSocketServer, WebSocket } from 'ws'
import { error } from 'console'
import { MsgEnum } from '../Enum'
import { MyServer } from './MyServer'
import EventEmitter from 'events'

interface Item {
  cb: Function
  ctx: any
}

export class Connection extends EventEmitter {
  private msgMap: Map<MsgEnum, Set<Item>> = new Map()
  constructor(private server: MyServer /* 获取apiMap */, private ws: WebSocket) {
    super()
    ws.onclose = () => {
      this.emit('close')
    }
    ws.onmessage = (e) => {
      try {
        const json = JSON.parse(e.data.toString())
        const { name /* 消息类型 */, data /* 消息数据 */ } = json /* 前端发来的消息 */
        if (this.server.apiMap.has(name)) {
          try {
            const res = this.server.apiMap.get(name)!.call(null, this, data)
            this.sendMsg(name, {
              success: true,
              res,
            })
          } catch (error) {
            this.sendMsg(name, {
              success: false,
              error,
            })
          }
        } else {
          // 自定义消息,监听前端发来的消息,然后触发后端listen了的回调
          try {
            if (this.msgMap.has(name)) {
              const set = this.msgMap.get(name)
              if (set) {
                set.forEach(({ cb, ctx }) => {
                  /* 遍历所有监听该消息的回调 */
                  cb.call(ctx, this, data) /* 执行回调 */
                })
              }
            }
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        console.log('json 解析失败', error)
      }
    }
  }

  sendMsg(name: MsgEnum, data: any) {
    const msg = { name, data } /* 真正发送消息的地方 */
    this.ws.send(JSON.stringify(msg))
  }
  listenMsg(name: MsgEnum, cb: Function, ctx: any = null) {
    if (this.msgMap.has(name)) {
      const set = this.msgMap.get(name)
      this.msgMap.set(name, set!.add({ cb, ctx }))
    } else {
      this.msgMap.set(name, new Set<Item>().add({ cb, ctx }))
    }
  }
  unlistenMsg(name: MsgEnum, cb: Function, ctx: any = null) {
    this.msgMap.has(name) && this.msgMap.get(name)!.delete({ cb, ctx })
  }
}
