import { PlayerManager } from './Biz/PlayerManager'
import { Connection, MyServer } from './Core'
import { ApiEnum } from './Enum'

declare module './Core' {
  interface Connection {
    playerId: number
  }
}

const port = 8080
const server = new MyServer({ port })

server.on('connection', (connection: Connection) => {
  console.log(`有玩家加入了,现在有${server.connetions.size}个玩家`)
})
server.on('disconnection', (connection: Connection) => {
  console.log(`有玩家离开了,现在有${server.connetions.size}个玩家`)
})

server.setApi(ApiEnum.ApiLogin, (connection: Connection, data: any /* 前端传来的数据 */) => {
  const { nickname } = data
  const player = PlayerManager.Instance.createPlayer({ nickname, connection })
  return {
    /* 返回给前端的数据 */
    player: PlayerManager.Instance.getPlayerView(player),
  } /* 只返回需要的数据就行,不需要success等字段,这些在connection中会处理,因为最终是通过connection示例里的ws的send方法发送给前端的 */
})

server
  .start()
  .then(() => {
    console.log(`服务启动成功`)
  })
  .catch(() => {
    console.error('服务启动失败')
  })
