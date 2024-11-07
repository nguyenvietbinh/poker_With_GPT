import axios from "axios";
import { state } from "./dataStore";
export function useMyFunction() {
  const convertChatGPTRespone = (res) => {
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
  }
  const getPrompt = (playerPos) => {
      let canFold, canCheck, round
      let biggestBetSize = Math.max(...state.betTotalList)
      if (biggestBetSize > state.betTotalList[playerPos]) {
          canCheck = false
          canFold = true
      } else {
          canCheck = true
          canFold = false
      }
      if (state.round === 0) {
        round = 'preFlop'
      } else if (state.round === 1) {
        round = 'flop'
      } else if (state.round === 2) {
        round = 'turn'
      } else {
        round = 'river'
      } 
      let hand = `${state.cards[playerPos * 2]}, ${state.cards[playerPos * 2 + 1]}`
      let gameKnowedInfor = [
        {
          player_ID: 0,
          stack: state.stackList[0],
          bet_size: state.betTotalList[0]
        },
        {
          player_ID: 1,
          stack: state.stackList[1],
          bet_size: state.betTotalList[1]
        },
        {
          player_ID: 2,
          stack: state.stackList[2],
          bet_size: state.betTotalList[2]
        },
        {
          player_ID: 3,
          stack: state.stackList[3],
          bet_size: state.betTotalList[3]
        },
        {
          player_ID: 4,
          stack: state.stackList[4],
          bet_size: state.betTotalList[4]
        },
        {
          player_ID: 5,
          stack: state.stackList[5],
          bet_size: state.betTotalList[5]
        },
      ]
      let prompt = `Help me decide my next poker move based on this game information: 
      There are 6 players on the table with IDs corresponding to sitting positions, there are 6 sitting positions from 0 to 5 clockwise

      - My hand: ${hand}.
      - My player_ID: ${playerPos}.
      - Number of player still on the table: ${state.numberOfPlayer}.
      - Community cards: ${state.communityCards}.
      - big_blind_ID: ${state.blindPos}.
      - small_blind_ID: ${state.smBlind}.
      - dealer_ID: ${state.dealer}.
      - round: ${round}.
      - Game knowed information: ${JSON.stringify(gameKnowedInfor)}.
      - Game history: ${JSON.stringify(state.gameHistory)}.

      You ${canFold ? "can" : "cannot"} Fold but ${canCheck ? "can" : "cannot"} Check.
      You need ${biggestBetSize - state.betTotalList[playerPos]}$ to call
      Raise {amount} if i having strong hand (exapmle: ["A♦","K♥",null,null,null,null,null], ["K♥","9♥","5♥","3♥","J♣","J♠","A♥"], ["K♥","10♦","Q♥","3♥","J♣","J♠","A♥"], ["A♦","A♥",null,null,null,null,null], ["K♥","Q♦","Q♥","3♥","J♣","J♠","A♥"])
      Call (if you do not need more 50$ to call) if i having good hand (example: ["A♦","J♥","J♣","K♥","9♥",null,null], ["A♥","5♥",null,null,null,null,null], ["10♥","J♠",null,null,null,null,null])
      Fold if i having week hand (example: ["3♠","K♣",null,null,null,null,null], ["Q♣","5♦",null,null,null,null,null], ["J♣","7♠",null,null,null,null,null], ["6♥","A♣",null,null,null,null,null])
      Look at game history if there are many raise {amount} actions you should call, if there are many check action you should raise {amount} to scared them
      I prefer a simple answer: 'Call,' 'Raise {amount}', 'Fold,' 'Check,' or 'All in,' with no additional information. Play as a tight-agreesive player, folding if my hand is not strong.
      `
        console.log(JSON.stringify([state.cards[playerPos * 2], state.cards[playerPos * 2 + 1]].concat(state.communityCards)), playerPos)
        return prompt
    }
    const getChatGPTResponse = async (userMessage) => {
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
            if (state.round === 0) {
                state.bettingHistory[state.actionPos].preflop.push(result.data.choices[0].message.content)
                state.gameHistory.push(`player: ${state.actionPos}, round: preflop, action: ${result.data.choices[0].message.content}`)
            } else if (state.round === 1) {
                state.bettingHistory[state.actionPos].flop.push(result.data.choices[0].message.content)
                state.gameHistory.push(`player: ${state.actionPos}. round: floFp, action: ${result.data.choices[0].message.content}`)
            } else if (state.round === 2) {
                state.bettingHistory[state.actionPos].turn.push(result.data.choices[0].message.content)
                state.gameHistory.push(`player: ${state.actionPos}, round: turn, action: ${result.data.choices[0].message.content}`)
            } else {
                state.bettingHistory[state.actionPos].river.push(result.data.choices[0].message.content)
                state.gameHistory.push(`player: ${state.actionPos}, round: river, action: ${result.data.choices[0].message.content}`)
            }
            return convertChatGPTRespone(result.data.choices[0].message.content)
        } catch (error) {
            console.error(error);
            return 'error';
        }
    };
    const closestToTheLeft = (a) => {
      if (a === null) {
        return a
      }
      if (state.numberOfPlayer === 1) {
        for (let i in state.playerStatus) {
          return null
        }
      }
      if (a === 5) {
          if (state.playerStatus[0] === true) {
            return 0
          } else {
            return closestToTheLeft(0)
          }
      } else {
        if (state.playerStatus[a+1] === true) {
          return a + 1
        } else {
          return closestToTheLeft(a + 1)
        }
      }
    }
    const closestToTheRight = (a) => {
      if (a === 0) {
          return 5
      }
      return a - 1
    }
    const reSetData = () => {
      state.cards = mixCards()
      state.round = 0
      state.numberOfPlayer = 6
      state.betTotalList = [0, 0, 0, 0, 0, 0]
      state.stackList[state.actionPos] += state.pot
      state.pot = 0
      state.playerStatus = [true, true, true, true, true, true]
      state.communityCards = [null, null, null, null, null]
      state.blindPos = closestToTheLeft(state.blindPos)
      state.smBlind = closestToTheRight(state.blindPos)
      state.dealer = closestToTheRight(state.smBlind)
      state.actionPos = null
      state.numberOfAction = 0
      state.winner = []
      state.lstOfHand = []
      state.gameHistory = []
    }
    const mixCards = () => {
      let a, c
      c = []
      while (c.length < 52) {
          a = Math.floor(Math.random() * 52)
          if (!c.includes(a)) {
              c.push(a)
          }
      }
      return convertCards(c)
    }
    const convertCards = (c) => {
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
    }
    const disPlayCard = (cardNumber, card) => {
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
    }
    return {
        getChatGPTResponse,
        closestToTheLeft,
        closestToTheRight,
        getPrompt,
        reSetData,
        mixCards,
        disPlayCard
    };
}
