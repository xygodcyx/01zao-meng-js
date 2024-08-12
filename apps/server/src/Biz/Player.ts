import { Connection } from '../Core'

export class Player {
  id: number
  connection: Connection
  nickname: string = ''
  isReady: boolean = false
  isHost: boolean = false
  constructor({ id, nickname, connection }: Pick<Player, 'id' | 'nickname' | 'connection'>) {
    this.id = id
    this.nickname = nickname
    this.connection = connection
  }
  ready() {
    this.isReady = true
  }

  unready() {
    this.isReady = false
  }
}
