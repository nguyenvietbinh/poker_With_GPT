

export const betTableData = defineStore('betTableData', {
  state: () => ({
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
    haveAllinCase: false,
    allin: [false, false, false, false, false, false],
    numberOfAllinPlayer: 0,
    sidePot: [0, 0, 0, 0, 0, 0],
    stopBetting: false
  }),
})
