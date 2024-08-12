import { Connection } from '../Core'

export class Player {
  id: number
  connection: Connection
  nickname: string = ''
  heroName: string = ''
  isReady: boolean = false
  isHost: boolean = false
  constructor({
    id,
    nickname,
    heroName,
    connection,
  }: Pick<Player, 'id' | 'nickname' | 'heroName' | 'connection'>) {
    this.id = id
    this.heroName = heroName
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
