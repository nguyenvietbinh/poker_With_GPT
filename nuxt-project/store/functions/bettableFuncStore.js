import { state } from "../data/dataStore";
export function useMyBettbFunc() {
  const convertChatGPTRespone = (res, playerPos) => {
    let ans
    if ((res.includes('fold')) || (res.includes('Fold'))) {
        ans = 'Fold'
    } else if ((res.includes('raise')) || (res.includes('Raise'))) {
        let n = res.replace('Raise', '')
        n = n.replace('raise', '')
        ans = parseInt(n)
    } else if ((res.includes('call')) || (res.includes('Call'))) {
        ans = 'Call'
    } else if ((res.includes('check')) || (res.includes('Check'))) {
        ans = 'Check'
    } else if ((res.includes('all in')) || (res.includes('All in'))) {
        ans = 'All in'
    } else {
      ans = 'Fold'
    }
    let biggestBetSize = Math.max(...state.betTotalList)
    if (biggestBetSize > state.betTotalList[playerPos]) {
      if (ans === 'Check') {
        ans = 'Fold'
      }
    } else {
      if ((ans === 'Fold') || (ans === 'Call')) {
        ans = 'Check'
      }
    }
    return ans
  }
  const getPrompt = (playerPos) => {
    let hand = `${state.cards[playerPos * 2]}, ${state.cards[playerPos * 2 + 1]}`
    let prompt = `
      Bạn là một AI được thiết kế để chơi poker Texas Hold'em thay cho người chơi. Bạn sẽ đưa ra quyết định dựa trên các thông tin sau:

- Lịch sử cược trong ván bài(bao gồm cả bạn, player ${playerPos} chính là bạn): Bao gồm các hành động đã diễn ra trong ván bài (call, raise, fold, check, v.v.) của tất cả người chơi từ đầu ván đến thời điểm hiện tại: ${JSON.stringify(state.gameHistory)}.

- Số lượng chip còn lại của tất cả người chơi(bao gồm cả bạn): Biết được số chip hiện có của mỗi người chơi giúp bạn đánh giá khả năng cược của họ và đưa ra chiến lược phù hợp. player 0 have ${state.stackList[0]}; player 1 have ${state.stackList[1]}; player 2 have ${state.stackList[2]}; player 3 have ${state.stackList[3]}; player 4 have ${state.stackList[4]}; player 5 have ${state.stackList[5]}

- Số lượng người chơi: Tổng số người chơi đang tham gia ván bài, bao gồm cả bạn ${state.numberOfPlayer}

- Tổng pot: Số chip hiện có trong pot (tổng cược của tất cả người chơi) ${state.pot}

- Cược của từng người chơi: Số chip mà mỗi người chơi đã cược vào pot trong lượt hiện tại. player 0 have ${state.betTotalList[0]}; player 1 have ${state.betTotalList[1]}; player 2 have ${state.betTotalList[2]}; player 3 have ${state.betTotalList[3]}; player 4 have ${state.betTotalList[4]}; player 5 have ${state.betTotalList[5]}

- Các lá bài chung (Community Cards): Các lá bài đã được lật trên bàn, bao gồm flop, turn, và river (nếu có). ${JSON.stringify(state.communityCards)}

- hai lá bài riêng của người chơi: Hai lá bài mà bạn đang nắm giữ, chỉ bạn biết. ${hand}

    Nhiệm vụ của bạn:

- Play as a tight player, if your hand is stronge play as a aggressive player, fold if your hand is not good.

- Phân tích tình huống hiện tại dựa trên các thông tin trên.

- Đưa ra quyết định hành động (call, raise, fold, check) một cách hợp lý, giống như một người chơi poker có kinh nghiệm.

- Cân nhắc các yếu tố như xác suất thắng, chiến lược cược, và tâm lý của đối thủ.

- Đảm bảo rằng quyết định của bạn phù hợp với số chip hiện có và tình hình chung của ván bài.

- Tôi muốn câu trả lời ở dạng tối dản ví dụ: 'Call,' 'Raise {amount}', 'Fold,' 'Check,' or 'All in,'. With no additional information.

- Nếu lịch sử cược có quá nhiều lệnh raise trong 1 round hay call để sang round khác.

Đánh giá bài của bạn:

- Xác định sức mạnh của 2 lá bài riêng kết hợp với các lá bài chung.

- Tính toán xác suất cải thiện bài của bạn (nếu còn lá bài chung chưa được lật).

- Phân tích hành động của đối thủ:

- Dựa vào lịch sử cược, đánh giá xu hướng chơi của từng đối thủ (aggressive, conservative, bluffing, v.v.).

- Xem xét số chip còn lại của đối thủ để đoán khả năng họ sẽ cược hoặc fold.

Tính toán pot odds:

- So sánh số chip bạn cần bỏ ra để call với tổng số chip trong pot.

- Quyết định xem liệu việc call có mang lại lợi nhuận dài hạn hay không.

Chiến lược cược:

- Nếu bài của bạn mạnh, cân nhắc raise để tăng giá trị pot hoặc loại bỏ đối thủ.

- Nếu bài của bạn yếu hoặc không chắc chắn, có thể fold để bảo toàn chip.

- Nếu bài của bạn có tiềm năng (draw), cân nhắc call hoặc raise nhỏ để theo bài.

Tâm lý và bluffing:

- Đôi khi, bạn có thể bluff (đánh lừa đối thủ) nếu tình huống cho phép, đặc biệt khi bạn nhận thấy đối thủ có xu hướng fold dễ dàng.

- Ngược lại, nếu đối thủ có vẻ mạnh, hãy cân nhắc fold để tránh mất nhiều chip.

Ví dụ minh họa:

- Tình huống: Bạn đang có 2 lá bài riêng là A♠ K♠. Các lá bài chung là 7♠ 8♠ 2♦. Pot hiện tại là 1000 chip. Đối thủ đã raise 300 chip, và bạn cần quyết định hành động tiếp theo.

- Phân tích:

Bài của bạn có tiềm năng thùng (flush) nếu lá bài chung tiếp theo là bất kỳ lá bài nào có chất ♠.

Pot odds là 300 chip để call vào pot 1300 chip (1000 + 300), tức là bạn cần tỷ lệ thắng khoảng 23% để call có lợi.

Xác suất bạn có thùng ở vòng turn là khoảng 19%, nhưng nếu tính cả river thì xác suất tăng lên khoảng 35%.

Đối thủ có thể đang có bài mạnh, nhưng cũng có thể đang bluff.

Quyết định: Call để theo bài, vì xác suất cải thiện bài của bạn khá cao và pot odds hợp lý.

Lưu ý: Bạn cần liên tục cập nhật thông tin và điều chỉnh chiến lược dựa trên diễn biến của ván bài. Hãy chơi một cách thông minh và linh hoạt để tối đa hóa lợi nhuận và giảm thiểu rủi ro.
    `
      return prompt
    }
    const sendReq = async (req) => {
        const res = await $fetch('/api/chatgpt', {
          method: 'post',
          body: JSON.stringify({ message: req })
        })
        return convertChatGPTRespone(res, state.actionPos)
    }
    const closestToTheLeft = (a) => {
      if (a === null) {
        return a
      }
      if (state.numberOfPlayer === 1) {
        for (let i in state.playerStatus) {
          if (state.playerStatus[i]) {
            return parseInt(i)
          }
        }
      } else if (state.numberOfPlayer === 0) {
        return null
      }
      if (a === 5) {
          if (state.playerStatus[0]) {
            return 0
          } else {
            return closestToTheLeft(0)
          }
      } else {
        if (state.playerStatus[a+1]) {
          return a + 1
        } else {
          return closestToTheLeft(a + 1)
        }
      }
    }
    const closestToTheRight = (a) => {
      if (a === null) {
        return a
      }
      if (state.numberOfPlayer === 1) {
        for (let i in state.playerStatus) {
          if (state.playerStatus[i]) {
            return parseInt(i)
          }
        }
      } else if (state.numberOfPlayer === 0) {
        return null
      }
      if (a === 0) {
          if (state.playerStatus[5]) {
            return 5
          } else {
            return closestToTheRight(5)
          }
      } else {
        if (state.playerStatus[a-1]) {
          return a - 1
        } else {
          return closestToTheRight(a - 1)
        }
      }
    }
    const reSetAllData = () => {
      reSetData()
      state.stackList = [2000, 2000, 2000, 2000, 2000, 2000]
      state.numberOfGame = 1
      state.blindPos = null
      state.smBlind = null
      state.dealer = null
      state.startGame = false
      state.buttonDisplay = false
    }
    const reSetData = () => {
      state.cards = mixCards()
      state.round = 0
      state.numberOfPlayer = 6
      state.betTotalList = [0, 0, 0, 0, 0, 0]
      state.pot = 0
      state.playerStatus = [true, true, true, true, true, true]
      state.communityCards = [null, null, null, null, null]
      state.actionPos = null
      state.numberOfAction = 0
      state.winner = []
      state.lstOfHand = []
      state.gameHistory = []
      state.stopBetting = false
      state.haveAllinCase = false
      state.allin = [false, false, false, false, false, false]
      state.numberOfAllinPlayer = 0
      state.sidePot = [0, 0, 0, 0, 0, 0]
      state.numberOfGame ++
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
    const addGameHistory = (round, act, pos) => {
      if (!isNaN(act)) {
        if (act === 0) {
          act = 'Call'
        } else {
          act = `Raise: ${act}`
        }
      }
      if (round === 0) {
          state.gameHistory.push(`player: ${pos}, round: preflop, action: ${act}`)
          state.everyGameHistory.unshift({
            stt: 'action',
            player: pos,
            round: 'preflop',
            action: act
          })
      } else if (round === 1) {
          state.gameHistory.push(`player: ${pos}, round: flop, action: ${act}`)
          state.everyGameHistory.unshift({
            stt: 'action',
            player: pos,
            round: 'flop',
            action: act
          })
      } else if (round === 2) {
          state.gameHistory.push(`player: ${pos}, round: turn, action: ${act}`)
          state.everyGameHistory.unshift({
            stt: 'action',
            player: pos,
            round: 'turn',
            action: act
          })
      } else {
          state.gameHistory.push(`player: ${pos}, round: river, action: ${act}`)
          state.everyGameHistory.unshift({
            stt: 'action',
            player: pos,
            round: 'river',
            action: act
          })
      }
      
    }
    const isOverBet = (act, pos) => {
      if (act === 'Call') {
        act = 0
      } else if (act === 'All in') {
        act = state.stackList[pos]
      }
      let m = (Math.max(...state.betTotalList) - state.betTotalList[pos]) + act
      if (m >= state.stackList[pos]) {
        state.botTitle[pos] = 'All in'
        state.betTotalList[pos] += state.stackList[pos]
        state.haveAllinCase = true
        state.allin[pos] = true
        state.numberOfAllinPlayer ++
        state.numberOfPlayer -= 1
        state.playerStatus[pos] = false
        state.stackList[pos] = 0
        addGameHistory(state.round, 'All in', state.actionPos)
        return true
      }
      addGameHistory(state.round, act, state.actionPos)
      return false
    }
    const addSidePot = () => {
        if (state.haveAllinCase) {
            for (let i = 0; i < 6; i ++) {
                if ((state.sidePot[i] === 0) && (state.allin[i])) {
                    for (let j = 0; j < 6; j ++) {
                        if (state.betTotalList[j] > state.betTotalList[i]) {
                            state.sidePot[i] += state.betTotalList[i]
                        } else {
                            state.sidePot[i] += state.betTotalList[j]
                        }
                    }
                }
            }
        }
    }
    return {
        sendReq,
        closestToTheLeft,
        closestToTheRight,
        getPrompt,
        reSetAllData,
        reSetData,
        mixCards,
        disPlayCard,
        addGameHistory,
        isOverBet,
        addSidePot,
        sendReq,
    };
}
