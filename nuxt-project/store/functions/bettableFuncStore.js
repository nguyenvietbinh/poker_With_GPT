import { betTableState } from "../data/betTableState";
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
    let biggestBetSize = Math.max(...betTableState.betTotalList)
    if (biggestBetSize > betTableState.betTotalList[playerPos]) {
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
    let hand = `${betTableState.cards[playerPos * 2]}, ${betTableState.cards[playerPos * 2 + 1]}`
    let prompt = `
      Bạn là một AI được thiết kế để chơi poker Texas Hold'em thay cho người chơi. Bạn sẽ đưa ra quyết định dựa trên các thông tin sau:

- Lịch sử cược trong ván bài(bao gồm cả bạn, player ${playerPos} chính là bạn): Bao gồm các hành động đã diễn ra trong ván bài (call, raise, fold, check, v.v.) của tất cả người chơi từ đầu ván đến thời điểm hiện tại: ${JSON.stringify(betTableState.gameHistory)}.

- Số lượng chip còn lại của tất cả người chơi(bao gồm cả bạn): Biết được số chip hiện có của mỗi người chơi giúp bạn đánh giá khả năng cược của họ và đưa ra chiến lược phù hợp. player 0 have ${betTableState.stackList[0]}; player 1 have ${betTableState.stackList[1]}; player 2 have ${betTableState.stackList[2]}; player 3 have ${betTableState.stackList[3]}; player 4 have ${betTableState.stackList[4]}; player 5 have ${betTableState.stackList[5]}

- Số lượng người chơi: Tổng số người chơi đang tham gia ván bài, bao gồm cả bạn ${betTableState.numberOfPlayer}

- Tổng pot: Số chip hiện có trong pot (tổng cược của tất cả người chơi) ${betTableState.pot}

- Cược của từng người chơi: Số chip mà mỗi người chơi đã cược vào pot trong lượt hiện tại. player 0 have ${betTableState.betTotalList[0]}; player 1 have ${betTableState.betTotalList[1]}; player 2 have ${betTableState.betTotalList[2]}; player 3 have ${betTableState.betTotalList[3]}; player 4 have ${betTableState.betTotalList[4]}; player 5 have ${betTableState.betTotalList[5]}

- Các lá bài chung (Community Cards): Các lá bài đã được lật trên bàn, bao gồm flop, turn, và river (nếu có). ${JSON.stringify(betTableState.communityCards)}

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
        return convertChatGPTRespone(res, betTableState.actionPos)
    }
    const updateSvBetTbState = () => {
      $fetch('/api/updateBetTableState', {
        method: 'post',
        body: JSON.stringify({ message: betTableState })
      })
    }
    const closestToTheLeft = (a) => {
      if (a === null) {
        return a
      }
      if (betTableState.numberOfPlayer === 1) {
        for (let i in betTableState.playerStatus) {
          if (betTableState.playerStatus[i]) {
            return parseInt(i)
          }
        }
      } else if (betTableState.numberOfPlayer === 0) {
        return null
      }
      if (a === 5) {
          if (betTableState.playerStatus[0]) {
            return 0
          } else {
            return closestToTheLeft(0)
          }
      } else {
        if (betTableState.playerStatus[a+1]) {
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
      if (betTableState.numberOfPlayer === 1) {
        for (let i in betTableState.playerStatus) {
          if (betTableState.playerStatus[i]) {
            return parseInt(i)
          }
        }
      } else if (betTableState.numberOfPlayer === 0) {
        return null
      }
      if (a === 0) {
          if (betTableState.playerStatus[5]) {
            return 5
          } else {
            return closestToTheRight(5)
          }
      } else {
        if (betTableState.playerStatus[a-1]) {
          return a - 1
        } else {
          return closestToTheRight(a - 1)
        }
      }
    }
    const reSetAllData = () => {
      reSetData()
      betTableState.stackList = [2000, 2000, 2000, 2000, 2000, 2000]
      betTableState.numberOfGame = 1
      betTableState.blindPos = null
      betTableState.smBlind = null
      betTableState.dealer = null
      betTableState.startGame = false
      betTableState.buttonDisplay = false
    }
    const reSetData = () => {
      betTableState.cards = mixCards()
      betTableState.round = 0
      betTableState.numberOfPlayer = 6
      betTableState.betTotalList = [0, 0, 0, 0, 0, 0]
      betTableState.pot = 0
      betTableState.playerStatus = [true, true, true, true, true, true]
      betTableState.communityCards = [null, null, null, null, null]
      betTableState.actionPos = null
      betTableState.numberOfAction = 0
      betTableState.winner = []
      betTableState.lstOfHand = []
      betTableState.gameHistory = []
      betTableState.stopBetting = false
      betTableState.haveAllinCase = false
      betTableState.allin = [false, false, false, false, false, false]
      betTableState.numberOfAllinPlayer = 0
      betTableState.sidePot = [0, 0, 0, 0, 0, 0]
      betTableState.numberOfGame ++
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
    function replaceAt(string, index, replacement) {
      return string.substring(0, index) + replacement + string.substring(index + 1);
    }
    const disPlayCard = (cardNumber, card) => {
      let src = 'XX@3x.png'
      if (cardNumber[cardNumber.length - 1] === '♥') {
          src = replaceAt(src, 1, 'H')
      } else if (cardNumber[cardNumber.length - 1]=== '♦') {
          src = replaceAt(src, 1, 'D')
      } else if (cardNumber[cardNumber.length - 1] === '♣') {
          src = replaceAt(src, 1, 'C')
      } else {
          src = replaceAt(src, 1, 'S')
      }
      let n = cardNumber.slice(0, -1)
      if (n === '10') {
        n = 'T'
      }
      src = replaceAt(src, 0, n)
      src = '/img/cards/' + src
      card.src = src
      card.alt = cardNumber
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
          betTableState.gameHistory.push(`player: ${pos}, round: preflop, action: ${act}`)
          betTableState.everyGameHistory.unshift({
            stt: 'action',
            player: pos,
            round: 'preflop',
            action: act
          })
      } else if (round === 1) {
          betTableState.gameHistory.push(`player: ${pos}, round: flop, action: ${act}`)
          betTableState.everyGameHistory.unshift({
            stt: 'action',
            player: pos,
            round: 'flop',
            action: act
          })
      } else if (round === 2) {
          betTableState.gameHistory.push(`player: ${pos}, round: turn, action: ${act}`)
          betTableState.everyGameHistory.unshift({
            stt: 'action',
            player: pos,
            round: 'turn',
            action: act
          })
      } else {
          betTableState.gameHistory.push(`player: ${pos}, round: river, action: ${act}`)
          betTableState.everyGameHistory.unshift({
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
        act = betTableState.stackList[pos]
      }
      let m = (Math.max(...betTableState.betTotalList) - betTableState.betTotalList[pos]) + act
      if (m >= betTableState.stackList[pos]) {
        betTableState.botTitle[pos] = 'All in'
        betTableState.betTotalList[pos] += betTableState.stackList[pos]
        betTableState.haveAllinCase = true
        betTableState.allin[pos] = true
        betTableState.numberOfAllinPlayer ++
        betTableState.numberOfPlayer -= 1
        betTableState.playerStatus[pos] = false
        betTableState.stackList[pos] = 0
        addGameHistory(betTableState.round, 'All in', betTableState.actionPos)
        return true
      }
      addGameHistory(betTableState.round, act, betTableState.actionPos)
      return false
    }
    const addSidePot = () => {
        if (betTableState.haveAllinCase) {
            for (let i = 0; i < 6; i ++) {
                if ((betTableState.sidePot[i] === 0) && (betTableState.allin[i])) {
                    for (let j = 0; j < 6; j ++) {
                        if (betTableState.betTotalList[j] > betTableState.betTotalList[i]) {
                            betTableState.sidePot[i] += betTableState.betTotalList[i]
                        } else {
                            betTableState.sidePot[i] += betTableState.betTotalList[j]
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
        convertCards,
        replaceAt,
        updateSvBetTbState,
    };
}
