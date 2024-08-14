export enum PlayerEnum {
  PLAYER_1 = 'PLAYER_1',
  PLAYER_2 = 'PLAYER_2',
}

export enum ApiEnum {
  ApiLogin = 'ApiLogin',
  ApiPlayerList = 'ApiPlayerList',
  ApiGetRoomList = 'ApiGetRoomList',
  ApiGetRoom = 'ApiGetRoom',
  ApiPlayerJoinRoom = 'ApiPlayerJoinRoom',
  ApiPlayerReady = 'ApiPlayerReady',
  ApiStartGame = 'ApiStartGame',
  ApiEndGame = 'ApiEndGame',
}

export enum MsgEnum {
  MsgLogin = 'MsgLogin',
  MsgLogOut = 'MsgLogOut',
  MsgSyncClientInput = 'MsgSyncClientInput',
  MsgSyncServerInput = 'MsgSyncServerInput',
  MsgLastPlayerState = 'MsgLastPlayerState',
  MsgPlayerList = 'MsgPlayerList',
  MsgPlayerSyncInGame = 'MsgPlayerSyncInGame',
  MsgGetRoomList = 'MsgGetRoomList',
  MsgGetRoom = 'MsgGetRoom',
  MsgPlayerReady = 'MsgPlayerReady',
  MsgStartGame = 'MsgStartGame',
  MsgEndGame = 'MsgEndGame',
}
