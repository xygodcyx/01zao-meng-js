import { Connection } from '../Core'
import { MsgEnum } from '../Enum'
import { PlayerManager } from './PlayerManager'

export class Player {
  id: number
  connection: Connection
  nickname: string = ''
  heroName: string = ''
  playerNumber: string = ''
  isReady: boolean = false
  isHost: boolean = false
  constructor({
    id,
    nickname,
    heroName,
    playerNumber,
    connection,
  }: Pick<Player, 'id' | 'nickname' | 'heroName' | 'playerNumber' | 'connection'>) {
    this.id = id
    this.heroName = heroName
    this.nickname = nickname
    this.playerNumber = playerNumber
    this.connection = connection
  }
  ready() {
    this.isReady = true
  }

  unready() {
    this.isReady = false
  }

  sync() {
    this.connection.sendMsg(MsgEnum.MsgPlayerSyncInGame, PlayerManager.Instance.getPlayerView(this))
  }
}
