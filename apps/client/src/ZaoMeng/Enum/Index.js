export const EventEnum = {
  FONT_LOADED: 'FONT_LOADED',
  ChooseHero: 'ChooseHero',
  ClientInput: 'ClientInput',
};

export const GAME_MODE = {
  Online: 'onLine',
  OffLine: 'offLine',
};

export const DomEnum = {
  selectHero: '.selectHero',
  HeroNameSelect: '#heroNameSelect',
  PlayerNumberSelect: '#playerNumberSelect',
  ConfirmHeroChoose: '.confirmHeroChoose',
  gameModeChoose: '#gameModeChoose',
};

export const InputTypeEnum = {
  PlayerMove: 'PlayerMove',
};
export const PlayerStateEnum = {
  IDLE: 'IDLE',
  WALK: 'WALK',
  RUN: 'RUN',
  ATTACK: 'ATTACK',
  JUMP_START: 'JUMP_START',
  JUMP_END: 'JUMP_END',
  DOUBLE_JUMP: 'DOUBLE_JUMP',
};

export const PlayerEnum = {
  PLAYER_1: 'PLAYER_1',
  PLAYER_2: 'PLAYER_2',
};

export const HeroNameEnum = {
  WuKong: 'wukong',
  ShaSeng: 'shaseng',
  TangSeng: 'tangseng',
  Bajie: 'bajie',
};

export const ApiEnum = {
  ApiLogin: 'ApiLogin',
  ApiPlayerList: 'ApiPlayerList',
  ApiGetRoomList: 'ApiGetRoomList',
  ApiGetRoom: 'ApiGetRoom',
  ApiPlayerJoinRoom: 'ApiPlayerJoinRoom',
  ApiPlayerReady: 'ApiPlayerReady',
  ApiStartGame: 'ApiStartGame',
  ApiEndGame: 'ApiEndGame',
};

export const MsgEnum = {
  MsgLogin: 'MsgLogin',
  MsgLogOut: 'MsgLogOut',
  MsgSyncClientInput: 'MsgSyncClientInput',
  MsgSyncServerInput: 'MsgSyncServerInput',
  MsgLastPlayerState: 'MsgLastPlayerState',
  MsgPlayerList: 'MsgPlayerList',
  MsgGetRoomList: 'MsgGetRoomList',
  MsgGetRoom: 'MsgGetRoom',
  MsgPlayerJoinRoom: 'MsgPlayerJoinRoom',
  MsgPlayerReady: 'MsgPlayerReady',
  MsgStartGame: 'MsgStartGame',
  MsgEndGame: 'MsgEndGame',
};
