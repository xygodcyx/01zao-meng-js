import Singleton from '../Base/Singleton'
import { Connection } from '../Core'
import { MsgEnum } from '../Enum'
import { Player } from './Player'

export class PlayerManager extends Singleton {
  players: Set<Player> = new Set()
  idMapPlayer: Map<number, Player> = new Map()
  nextId: number = 1
  inputs = []
  hasStarted: boolean = false
  lastStatePlayerMap: Map<number, any> = new Map()
  static get Instance() {
    return super.GetInstance<PlayerManager>()
  }
  createPlayer({
    nickname,
    heroName,
    playerNumber,
    connection,
  }: Pick<Player, 'nickname' | 'heroName' | 'playerNumber' | 'connection'>) {
    const id = this.nextId++
    const player = new Player({ id, nickname, heroName, playerNumber, connection })
    this.players.add(player)
    this.idMapPlayer.set(id, player)
    player.connection.listenMsg(MsgEnum.MsgSyncClientInput, this.handleSyncClientInput, this)
    player.connection.listenMsg(MsgEnum.MsgLastPlayerState, this.handleLastPlayerState, this)
    if (!this.hasStarted) {
      const id = setInterval(() => {
        this.sendServerInput()
      }, 100)
    }
    this.hasStarted = true
    return player
  }
  handleSyncClientInput(connection: Connection, msg) {
    const { lastFrame, input } = msg
    this.inputs.push(input)
  }
  sendServerInput() {
    const inputs = this.inputs
    this.inputs = []
    this.players.forEach((p) => {
      p.connection.sendMsg(MsgEnum.MsgSyncServerInput, { inputs, lastFrame: 0 })
    })
  }
  handleLastPlayerState(connection: Connection, msg) {
    const { position, nowDir } = msg
    this.lastStatePlayerMap.set(connection.playerId, { position, nowDir })
  }
  removePlayer(id: number) {
    const player = this.idMapPlayer.get(id)
    this.lastStatePlayerMap.delete(id)
    if (player) {
      this.players.delete(player)
      this.idMapPlayer.delete(id)
    }
    for (const player of this.players) {
      player.connection.sendMsg(MsgEnum.MsgLogOut, { id })
    }
  }
  // syncPlayersInRoom() {}
  syncPlayerLogin(newPlayer: Player) {
    for (const player of this.players) {
      if (player.id === newPlayer.id) continue
      player.connection.sendMsg(MsgEnum.MsgLogin, this.getPlayerView(newPlayer))
    }
  }
  getPlayerListLastStateView() {
    const res = []
    this.lastStatePlayerMap.forEach((value) => {
      res.push(value)
    })
    return res
  }

  getPlayerListView() {
    return Array.from(this.players).map((player) => this.getPlayerView(player))
  }

  getPlayerListExcludingSelfView(selfId: number) {
    return Array.from(this.players)
      .filter((player) => player.id !== selfId)
      .map((player) => this.getPlayerView(player))
  }
  getPlayerView(player: Player) {
    return {
      id: player.id,
      heroName: player.heroName,
      nickname: player.nickname,
      playerNumber: player.playerNumber,
    }
  }
}
