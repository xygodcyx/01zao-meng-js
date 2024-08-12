import Singleton from '../Base/Singleton'
import { Player } from './Player'

export class PlayerManager extends Singleton {
  players: Set<Player> = new Set()
  idMapPlayer: Map<number, Player> = new Map()
  nextId: number = 1
  static get Instance() {
    return super.GetInstance<PlayerManager>()
  }
  createPlayer({ nickname, connection }: Pick<Player, 'nickname' | 'connection'>) {
    const id = this.nextId++
    const player = new Player({ id, nickname, connection })
    this.players.add(player)
    this.idMapPlayer.set(id, player)
    return player
  }
  getPlayerView(player: Player) {
    return {
      id: player.id,
      nickname: player.nickname,
    }
  }
}
