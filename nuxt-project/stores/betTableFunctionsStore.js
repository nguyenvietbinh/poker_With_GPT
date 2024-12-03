import { betTableData } from '@/stores/betTableDataStore'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
const BetTableData = betTableData()
export const betTableFunctions = defineStore('betTableFunctions', {
    actions: {
        blabla () {
          console.log(BetTableData.numberOfPlayer)
          return BetTableData.numberOfPlayer
        },
        convertChatGPTRespone (res) {
            if ((res.includes('fold')) || (res.includes('Fold'))) {
                return 'Fold'
            } else if ((res.includes('raise')) || (res.includes('Raise'))) {
                let n = res.replace('Raise', '')
                n = n.replace('raise', '')
                return parseInt(n)
            } else if ((res.includes('call')) || (res.includes('Call'))) {
                return 'Call'
            } else if ((res.includes('check')) || (res.includes('Check'))) {
                return 'Check'
            } else if ((res.includes('all in')) || (res.includes('All in'))) {
                return 'All in'
            } else {
              return 'Fold'
            }
          },
          getPrompt (playerPos) {
              let canFold, canCheck, round
              let biggestBetSize = Math.max(...BetTableData.betTotalList)
              console.log(BetTableData.actionPos)
              if (biggestBetSize > BetTableData.betTotalList[playerPos]) {
                  canCheck = false
                  canFold = true
              } else {
                  canCheck = true
                  canFold = false
              }
              if (BetTableData.round === 0) {
                round = 'preFlop'
              } else if (BetTableData.round === 1) {
                round = 'flop'
              } else if (BetTableData.round === 2) {
                round = 'turn'
              } else {
                round = 'river'
              } 
              let hand = `${BetTableData.cards[playerPos * 2]}, ${BetTableData.cards[playerPos * 2 + 1]}`
              let gameKnowedInfor = [
                {
                  player_ID: 0,
                  stack: BetTableData.stackList[0],
                  bet_size: BetTableData.betTotalList[0]
                },
                {
                  player_ID: 1,
                  stack: BetTableData.stackList[1],
                  bet_size: BetTableData.betTotalList[1]
                },
                {
                  player_ID: 2,
                  stack: BetTableData.stackList[2],
                  bet_size: BetTableData.betTotalList[2]
                },
                {
                  player_ID: 3,
                  stack: BetTableData.stackList[3],
                  bet_size: BetTableData.betTotalList[3]
                },
                {
                  player_ID: 4,
                  stack: BetTableData.stackList[4],
                  bet_size: BetTableData.betTotalList[4]
                },
                {
                  player_ID: 5,
                  stack: BetTableData.stackList[5],
                  bet_size: BetTableData.betTotalList[5]
                },
              ]
              let prompt = `Help me decide my next poker move based on this game information: 
              There are 6 players on the table with IDs corresponding to sitting positions, there are 6 sitting positions from 0 to 5 clockwise
        
              - My hand: ${hand}.
              - My player_ID: ${playerPos}.
              - Number of player still on the table: ${BetTableData.numberOfPlayer}.
              - Community cards: ${BetTableData.communityCards}.
              - big_blind_ID: ${BetTableData.blindPos}.
              - small_blind_ID: ${BetTableData.smBlind}.
              - dealer_ID: ${BetTableData.dealer}.
              - round: ${round}.
              - Game knowed information: ${JSON.stringify(gameKnowedInfor)}.
              - Game history: ${JSON.stringify(BetTableData.gameHistory)}.
        
              You ${canFold ? "can" : "cannot"} Fold but ${canCheck ? "can" : "cannot"} Check.
              You need ${biggestBetSize - BetTableData.betTotalList[playerPos]}$ to call
              Raise {amount} if i having strong hand (exapmle: ["A♦","K♥",null,null,null,null,null], ["K♥","9♥","5♥","3♥","J♣","J♠","A♥"], ["K♥","10♦","Q♥","3♥","J♣","J♠","A♥"], ["A♦","A♥",null,null,null,null,null], ["K♥","Q♦","Q♥","3♥","J♣","J♠","A♥"])
              Call (if you do not need more 50$ to call) if i having good hand (example: ["A♦","J♥","J♣","K♥","9♥",null,null], ["A♥","5♥",null,null,null,null,null], ["10♥","J♠",null,null,null,null,null])
              Fold if i having week hand (example: ["3♠","K♣",null,null,null,null,null], ["Q♣","5♦",null,null,null,null,null], ["J♣","7♠",null,null,null,null,null], ["6♥","A♣",null,null,null,null,null])
              Look at game history if there are many raise {amount} actions you should call, if there are many check action you should raise {amount} to scared them
              I prefer a simple answer: 'Call,' 'Raise {amount}', 'Fold,' 'Check,' or 'All in,' with no additional information. Play as a tight-agreesive player, folding if my hand is not strong.
              `
                return prompt
            },
            async getChatGPTResponse(userMessage) {
                try {
                    const result = await axios.post(
                        'https://api.openai.com/v1/chat/completions',
                        {
                          model: 'gpt-4o-mini',
                          messages: [
                            { role: 'user', content: userMessage }
                          ],
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                            'Content-Type': 'application/json',
                          },
                        }
                    )
                    return this.convertChatGPTRespone(result.data.choices[0].message.content)
                } catch (error) {
                    console.error(error);
                    return 'error';
                }
            },
            closestToTheLeft (a) {
              if (a === null) {
                return a
              }
              if (BetTableData.numberOfPlayer === 1) {
                for (let i in BetTableData.playerStatus) {
                  if (BetTableData.playerStatus[i]) {
                    return parseInt(i)
                  }
                }
              } else if (BetTableData.numberOfPlayer === 0) {
                return null
              }
              if (a === 5) {
                  if (BetTableData.playerStatus[0]) {
                    return 0
                  } else {
                    return closestToTheLeft(0)
                  }
              } else {
                if (BetTableData.playerStatus[a+1]) {
                  return a + 1
                } else {
                  return closestToTheLeft(a + 1)
                }
              }
            },
            closestToTheRight (a) {
              if (a === null) {
                return a
              }
              console.log(BetTableData.numberOfPlayer)
              if (BetTableData.numberOfPlayer === 1) {
                for (let i in BetTableData.playerStatus) {
                  if (BetTableData.playerStatus[i]) {
                    return parseInt(i)
                  }
                }
              } else if (BetTableData.numberOfPlayer === 0) {
                return null
              }
              if (a === 0) {
                  if (BetTableData.playerStatus[5]) {
                    return 5
                  } else {
                    return closestToTheRight(5)
                  }
              } else {
                if (BetTableData.playerStatus[a-1]) {
                  return a - 1
                } else {
                  return closestToTheRight(a - 1)
                }
              }
            },
            reSetData () {
              BetTableData.cards = mixCards()
              BetTableData.round = 0
              BetTableData.numberOfPlayer = 6
              BetTableData.betTotalList = [0, 0, 0, 0, 0, 0]
              BetTableData.pot = 0
              BetTableData.playerStatus = [true, true, true, true, true, true]
              BetTableData.communityCards = [null, null, null, null, null]
              BetTableData.actionPos = null
              BetTableData.numberOfAction = 0
              BetTableData.winner = []
              BetTableData.lstOfHand = []
              BetTableData.gameHistory = []
              BetTableData.stopBetting = false
              BetTableData.haveAllinCase = false
              BetTableData.allin = [false, false, false, false, false, false]
              BetTableData.numberOfAllinPlayer = 0
              BetTableData.sidePot = [0, 0, 0, 0, 0, 0]
            },
            mixCards () {
              let a, c
              c = []
              while (c.length < 52) {
                  a = Math.floor(Math.random() * 52)
                  if (!c.includes(a)) {
                      c.push(a)
                  }
              }
              return this.convertCards(c)
            },
            convertCards (c) {
              let ans = [] 
              for (let i of c) {
                let cardType = ''
                if (i%4 === 0) {
                    cardType = '♥'
                } else if (i%4 === 1) {
                    cardType = '♦'
                } else if (i%4 === 2) {
                    cardType = '♣'
                } else {
                    cardType = '♠'
                }
                i = parseInt(i / 4) + 1
                if (i === 1) {
                    i = "A"
                } else if (i === 11) {
                    i = "J"
                } else if (i === 12) {
                    i = "Q"
                } else if (i === 13) {
                    i = "K"
                }
                ans.push(i+cardType)
              }
              return ans
            },
            disPlayCard (cardNumber, card) {
              let cardColor
              if (cardNumber[cardNumber.length - 1] === '♥') {
                  cardColor = 'red'
              } else if (cardNumber[cardNumber.length - 1]=== '♦') {
                  cardColor = 'orange'
              } else if (cardNumber[cardNumber.length - 1] === '♣') {
                  cardColor = 'green'
              } else {
                  cardColor = 'black'
              }
              card.innerHTML = cardNumber.slice(0, -1)
              card.style.backgroundColor = cardColor
              card.style.color = 'white'
            },
            addGameHistory (round, act, pos) {
              if (round === 0) {
                  BetTableData.gameHistory.push(`player: ${pos}, round: preflop, action: ${act}`)
              } else if (round === 1) {
                  BetTableData.gameHistory.push(`player: ${pos}, round: flop, action: ${act}`)
              } else if (round === 2) {
                  BetTableData.gameHistory.push(`player: ${pos}, round: turn, action: ${act}`)
              } else {
                  BetTableData.gameHistory.push(`player: ${pos}, round: river, action: ${act}`)
              }
            },
            isOverBet (act, pos) {
              if (act === 'Call') {
                act = 0
              } else if (act === 'All in') {
                act = BetTableData.stackList[pos]
              }
              let m = (Math.max(...BetTableData.betTotalList) - BetTableData.betTotalList[pos]) + act
              if (m >= BetTableData.stackList[pos]) {
                BetTableData.betTotalList[pos] += BetTableData.stackList[pos]
                BetTableData.haveAllinCase = true
                BetTableData.allin[pos] = true
                BetTableData.numberOfAllinPlayer ++
                BetTableData.numberOfPlayer -= 1
                BetTableData.playerStatus[pos] = false
                BetTableData.stackList[pos] = 0
                this.addGameHistory(BetTableData.round, 'All in', BetTableData.actionPos)
                return true
              }
              this.addGameHistory(BetTableData.round, act, BetTableData.actionPos)
              return false
            },
            addSidePot () {
                if (BetTableData.haveAllinCase) {
                    for (let i = 0; i < 6; i ++) {
                        if ((BetTableData.sidePot[i] === 0) && (BetTableData.allin[i])) {
                            for (let j = 0; j < 6; j ++) {
                                if (BetTableData.betTotalList[j] > BetTableData.betTotalList[i]) {
                                    BetTableData.sidePot[i] += BetTableData.betTotalList[i]
                                } else {
                                    BetTableData.sidePot[i] += BetTableData.betTotalList[j]
                                }
                            }
                        }
                    }
                }
            }
    }
})
  
