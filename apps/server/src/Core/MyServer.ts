import { WebSocketServer, WebSocket } from 'ws'
import { Connection } from './Connection'
import EventEmitter from 'events'
import { ApiEnum } from '../Enum'

export class MyServer extends EventEmitter {
  wss: WebSocketServer
  port: number
  apiMap: Map<ApiEnum, Function> = new Map()
  connetions: Set<Connection> = new Set()
  constructor({ port }: { port: number }) {
    super()
    this.port = port
  }
  start() {
    return new Promise((resolve, reject) => {
      this.wss = new WebSocketServer({ port: this.port, host: 'localhost' })
      this.wss.on('connection', (ws: WebSocket) => {
        const connection = new Connection(this, ws)
        this.connetions.add(connection)
        connection.on('close', () => {
          // 某个玩家的连接关闭,不是服务器关闭
          this.connetions.delete(connection)
          this.emit('disconnection', connection)
        })
        this.emit('connection', connection)
      })
      this.wss.on('close', () => {
        console.log('server closed') //服务器本身关闭
        reject(false)
      })
      this.wss.on('error', () => {
        resolve(true)
      })
      this.wss.on('listening', () => {
        resolve(true)
      })
    })
  }
  // 模拟api调用(http请求转为websocket请求)
  setApi(apiName: ApiEnum, cb: (connection: Connection, data: any) => void) {
    this.apiMap.set(apiName, cb)
  }
}
