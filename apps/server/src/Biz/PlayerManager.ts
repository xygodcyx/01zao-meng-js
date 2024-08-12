import Singleton from '../Base/Singleton'
import { Player } from './Player'

export class PlayerManager extends Singleton {
  players: Set<Player> = new Set()
  idMapPlayer: Map<number, Player> = new Map()
  nextId: number = 1
  static get Instance() {
    return super.GetInstance<PlayerManager>()
  }
  createPlayer({
    nickname,
    heroName,
    connection,
  }: Pick<Player, 'nickname' | 'heroName' | 'connection'>) {
    const id = this.nextId++
    const player = new Player({ id, nickname, heroName, connection })
    this.players.add(player)
    this.idMapPlayer.set(id, player)
    return player
  }
  getPlayerView(player: Player) {
    return {
      id: player.id,
      heroName: player.heroName,
      nickname: player.nickname,
    }
  }
}
