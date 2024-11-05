import { reactive } from 'vue'

export const state = reactive({
  numberOfPlayer: 6,
  playerStatus: [true, true, true, true, true, true],
  cards: [],
  stackList: [2000, 2000, 2000, 2000, 2000, 2000],
  betTotalList: [0, 0, 0, 0, 0, 0],
  pot: 0,
  communityCards: [null, null, null, null, null],
  playerAct: '',
  blindPos: null,
  smBlind: null,
  dealer: null,
  actionPos: null,
  numberOfAction: 0,
  isPlayerTurn: false,
  isGameOver: false,
  round: 0,
  canMoveToNextRound: false,
  winner: [],
  lstOfHand: [],
  gameHistory: [],
  bettingHistory: [
    {
      playerID: 0,
      preflop: [],
      flop: [],
      turn: [],
      river: [],
    },
    {
      playerID: 1,
      preflop: [],
      flop: [],
      turn: [],
      river: [],
    },
    {
      playerID: 2,
      preflop: [],
      flop: [],
      turn: [],
      river: [],
    },
    {
      playerID: 3,
      preflop: [],
      flop: [],
      turn: [],
      river: [],
    },
    {
      playerID: 4,
      preflop: [],
      flop: [],
      turn: [],
      river: [],
    },
    {
      playerID: 5,
      preflop: [],
      flop: [],
      turn: [],
      river: [],
    }
  ]
})

