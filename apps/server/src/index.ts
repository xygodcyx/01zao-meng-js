import { PlayerManager } from './Biz/PlayerManager'
import { Connection, MyServer } from './Core'
import { ApiEnum, MsgEnum } from './Enum'

declare module './Core' {
  interface Connection {
    playerId: number
    heroName: string
  }
}

const port = 8080
const server = new MyServer({ port })

server.on('connection', (connection: Connection) => {
  console.log(`有玩家加入了,现在有${server.connetions.size}个玩家`)
})
server.on('disconnection', (connection: Connection) => {
  console.log(`有玩家${connection.heroName}离开了,现在有${server.connetions.size}个玩家`)
  PlayerManager.Instance.removePlayer(connection.playerId) /* 玩家断开连接后,从玩家管理器中移除 */
})

server.setApi(ApiEnum.ApiLogin, (connection: Connection, data: any /* 前端传来的数据 */) => {
  const { nickname, heroName, playerNumber } = data
  const player = PlayerManager.Instance.createPlayer({
    nickname,
    heroName,
    playerNumber,
    connection,
  })
  connection.playerId = player.id /* 给连接添加playerId属性 */
  connection.heroName = heroName /* 给连接添加heroName属性 */
  PlayerManager.Instance.syncPlayerLogin(player) /* 同步最新玩家信息到其他玩家 */
  return {
    /* 返回给前端的数据 */
    player: PlayerManager.Instance.getPlayerView(player) /* 生成自己 */,
    players: PlayerManager.Instance.getPlayerListExcludingSelfView(player.id) /* 生成其他玩家 */,
    playersLastState:
      PlayerManager.Instance.getPlayerListLastStateView() /* 生成其他玩家的最后状态 */,
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
