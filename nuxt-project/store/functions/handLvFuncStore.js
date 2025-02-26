import { state } from "../data/dataStore";
export function useMyHandLvFunc() {
    const getAllInWinRate = (hands, communityCards) => {
        let win = 0
        for (let i = 0; i < 1000; i ++) {
            let winner = handRanking(genRandomAllInCase(hands, communityCards))
            for (let j = 0; j < winner.length; j ++) {
                if (winner[j].includes(hands[0][0])) {
                    win ++
                }
            }
        }
        return Math.round(win/10)
    }
    const genRandomAllInCase = (hands, communityCards) => {
        let copyCards = [...state.cards]
        let copyCommunityCards = [...communityCards]
        let allInCards = [...hands]
        let Hands = []
        if ((!state.playerStatus[0]) && (!state.allin[0])) {
            return 0
        }
        for (let i = 0; i < allInCards.length; i ++) {
            copyCards.filter(card => card !== allInCards[i][0])
            copyCards.filter(card => card !== allInCards[i][1])
        }
        for (let i = 0; i < copyCommunityCards.length; i ++) {
            if (copyCommunityCards[i] === null) {
                let a = getRandomCard(copyCards)
                copyCommunityCards[i] = a[0]
                copyCards = a[1]
            }
        }
        for (let i = 0; i < allInCards.length; i ++) {
            Hands.push(allInCards[i].concat(copyCommunityCards))
        }
        return Hands
    }
    const getPlayerWinRate = async (req) => {
        const res = await $fetch('/worker/winrate', {
            method: 'post',
            body: JSON.stringify({ message: req })
          })
          return res
    }
    const genRandomCase = (hand, communityCards, n) => {
        let copyHand = [...hand]
        let copyCommunityCards = [...communityCards]
        let copyCards = [...state.cards]
        copyCards = copyCards.filter(card => card !== copyHand[0])
        copyCards = copyCards.filter(card => card !== copyHand[1])
        let ans = []
        for (let i = 0; i < 5; i ++) {
            if (copyCommunityCards[i] === null) {
                let a = getRandomCard(copyCards)
                copyCommunityCards[i] = a[0]
                copyCards = a[1]
            } else {
                copyCards = copyCards.filter(card => card !== copyCommunityCards[i])
            }
        }
        for (let i = 0; i < n; i ++) {
            if (i === 0) {
                ans.push(copyHand.concat(copyCommunityCards))
            } else {
                let fakeHand = []
                for (let j = 0; j < 2; j ++) {
                    let a = getRandomCard(copyCards)
                    fakeHand.push(a[0])
                    copyCards = a[1]
                }
                ans.push(fakeHand.concat(copyCommunityCards))
            }
        }
        return ans
    }
    const getRandomCard = (cards) => {
        let copyCards = [...cards]
        let a = Math.floor(Math.random() * copyCards.length)
        return [cards[a], copyCards.filter(card => card !== cards[a])]
    }
    const searchWinner = (winnerHands) => {
        let winners = []
        for (let i = 0; i < winnerHands.length; i ++) {
            for (let j = 0; j < 6; j ++) {
                if (winnerHands[i][0] === state.cards[2 * j]) {
                    winners.push(j)
                }
            }
        }
        return winners
    }
    const handRanking = (hands) => {
        let copyHands = [...hands]
        copyHands = sortHands(copyHands)
        let winner = [copyHands[0]]
        for (let i = 0; i < copyHands.length - 1; i ++) {
            if (isHand1GreaterHand2([copyHands[i], copyHands[i + 1]]) === '=') {
                winner.push(copyHands[i + 1])
            } else {
                return winner
            }
        }
        return winner
    }
    const sortHands = (hands) => {
        let copyHands = [...hands]
        let a
        for (let i = 0; i < copyHands.length; i ++) {
            for (let j = 0; j < (copyHands.length - i - 1); j ++) {
                if (!isHand1GreaterHand2([copyHands[j], copyHands[j + 1]])) {
                    a = copyHands[j + 1]
                    copyHands[j + 1] = copyHands[j]
                    copyHands[j] = a
                }
            }
        }
        return copyHands
    }
    const isAllHandEqual = (hands) => {
        let copyHands = [...hands]
        for(let i = 0; i < copyHands.length - 1; i ++) {
            for (let j = i + 1; j < copyHands.length; j ++) {
                if (isHand1GreaterHand2([copyHands[i], copyHands[j]]) !== '=') {
                    return false
                }
            }
        }
        return true
    }
    const isHand1GreaterHand2 = (hands) => {
        let copyHand1 = [...hands[0]]
        let copyHand2 = [...hands[1]]
        let handLevel1 = getHightestLevel(copyHand1)[0]
        let handLevel2 = getHightestLevel(copyHand2)[0]
        let d1 = getHightestLevel(copyHand1)[1]
        let d2 = getHightestLevel(copyHand2)[1]
        if (handLevel1 > handLevel2) {
            return true
        } else if (handLevel1 === handLevel2) {
            for (let i = 0; i < d1.length; i ++) {
                if (d1[i] > d2[i]) {
                    return true
                } else if (d1[i] < d2[i]) {
                    return false
                }
            }
            return '='
        } else {
            return false
        }
    }
    const getHightestLevel = (hand) => {
        let copyHand = [...hand]
        let h = bubbleSort(copyHand.map(card => cardRanking(card)))
        let levelPoint
        let d
        if (isStraightFlush(copyHand)[0]) {
            levelPoint = 8
            d = isStraightFlush(copyHand)
        } else if (isFourOfAKind(copyHand)[0]) {
            levelPoint = 7
            d = isFourOfAKind(copyHand)
        } else if (isFullHouse(copyHand)[0]) {
            levelPoint = 6
            d = isFullHouse(copyHand)
        } else if (isFlush(copyHand)[0]) {
            levelPoint = 5
            d = isFlush(copyHand)
        } else if (isStraight(copyHand)[0]) {
            levelPoint = 4
            d = isStraight(copyHand)
        } else if (isThreeOfAKind(copyHand)[0]) {
            levelPoint = 3
            d = isThreeOfAKind(copyHand)
        } else if (isTwoPair(copyHand)[0]) {
            levelPoint = 2
            d = isTwoPair(copyHand)
        } else if (isOnePair(copyHand)[0]) {
            levelPoint = 1
            d = isOnePair(copyHand)
        } else{
            levelPoint = 0
            d = [h[0], h[1], h[2], h[3], h[4]]
        }
        return [levelPoint, d]
    }
    const isOnePair = (hand) => {
        let copyHand = [...hand]
        let h = copyHand.map(card => cardRanking(card))
        let pairPoint
        for (let i = 0; i < copyHand.length - 1; i ++) {
            for (let j = i + 1; j < copyHand.length; j ++) {
                if (h[i] === h[j]) {
                    pairPoint = h[i]
                    h[i] = 0
                    h[j] = 0
                    h = bubbleSort(h)
                    return [true, pairPoint, h[0], h[1], h[2]]
                }
            }
        }
        return [false, 0, 0]
    }
    const isTwoPair = (hand) => {
        let copyHand = [...hand]
        let h = copyHand.map(card => cardRanking(card))
        let d = isOnePair(copyHand)
        let pairLst = [d[1]]
        if (d[0]) {
            for (let i = 0; i < copyHand.length; i ++) {
                if (h[i] === d[1]) {
                    copyHand[i] = null
                }
            }
            copyHand = copyHand.filter(element => element !== null)
            let d2 = isOnePair(copyHand)
            if (d2[0]) {
                pairLst.push(d2[1])
                for (let j in copyHand) {
                    if (cardRanking(copyHand[j]) === d2[1]) {
                        copyHand[j] = null
                    }
                }
                copyHand = copyHand.filter(element => element !== null)
                if (isOnePair(copyHand)[0]) {
                    let d3 = isOnePair(copyHand)
                    pairLst.push(isOnePair(copyHand)[1])
                    for (let j in copyHand) {
                        if (cardRanking(copyHand[j]) === d3[1]) {
                            copyHand[j] = null
                        }
                    }
                    copyHand = copyHand.filter(element => element !== null)
                }
                pairLst = bubbleSort(pairLst)
                let kickerCard = getHightestCard(copyHand)
                if (pairLst.length === 3) {
                    if (pairLst[2] > cardRanking(copyHand[0])) {
                        kickerCard = pairLst[2]
                    } else {
                        kickerCard = cardRanking(copyHand[0])
                    }
                }
                return [true, pairLst[0], pairLst[1], kickerCard]
            }
        }
        return [false, 0, 0]
    }
    const isThreeOfAKind = (hand) => {
        let copyHand = [...hand]
        let h = copyHand.map(card => cardRanking(card))
        let sameLst = []
        let threeOfAKindPoint
        for (let i = 0; i < copyHand.length - 1; i ++) {
            sameLst = [i]
            for (let j = i + 1; j < copyHand.length; j ++) {
                if (h[i] === h[j]) {
                    sameLst.push(j)
                }
                if (sameLst.length === 3) {
                    threeOfAKindPoint = h[i]
                    for (let q in h) {
                        if (h[q] === threeOfAKindPoint) {
                            h[q] = 0
                        }
                    }
                    h = bubbleSort(h)
                    return [true, threeOfAKindPoint, h[0], h[1]]
                }
            }
        }
        return [false, 0, 0]
    }
    const isStraight = (hand) => {
        let copyHand = [...hand]
        let lstSorted =  [...new Set(bubbleSort(copyHand.map(card => cardRanking(card))))]
        for (let i in lstSorted) {
            if (lstSorted[i] === 14) {
                lstSorted.push(1)
            }
        }
        for (let i = 0; i < lstSorted.length - 4; i ++) {
            if (lstSorted[i] - lstSorted[i + 4] === 4) {
                return [true, lstSorted[i]]
            }
        }
        return [false, 0]
    }
    const isFlush = (hand) => {
        let copyHand = [...hand]
        let count, commonColor
        for (let i = 0; i < copyHand.length; i ++) {
            count = 0
            for (let j = 0; j < copyHand.length; j ++) {
                if (copyHand[i][copyHand[i].length - 1] === copyHand[j][copyHand[j].length - 1]) {
                    count ++
                }
                if (count === 5) {
                    commonColor = copyHand[i][copyHand[i].length - 1]
                    copyHand = copyHand.filter(element => element[element.length - 1] === commonColor)
                    let h = bubbleSort(copyHand.map(card => cardRanking(card)))
                    return [true, h[0], h[1], h[2], h[3], h[4]]
                }
            }
        }
        return [false, 0]
    }
    const isFullHouse = (hand) => {
        let copyHand = [...hand]
        let h = copyHand.map(card => cardRanking(card))
        let threeOfAKindPoint
        if (isThreeOfAKind(copyHand)[0]) {
            threeOfAKindPoint = isThreeOfAKind(copyHand)[1]
            copyHand = copyHand.filter(element => cardRanking(element) !== threeOfAKindPoint)
            if (isOnePair(copyHand)[0]) {
                return [true, threeOfAKindPoint, isOnePair(copyHand)[1]]
            }
        }
        return [false, 0]
    }
    const isFourOfAKind = (hand) => {
        let copyHand = [...hand]
        let h = copyHand.map(card => cardRanking(card))
        let count
        for (let i = 0; i < copyHand.length; i ++) {
            count = 0
            for (let j = 0; j < copyHand.length; j ++) {
                if (h[i] === h[j]) {
                    count ++
                }
                if (count === 4) {
                    copyHand = copyHand.filter(element => cardRanking(element) !== h[i])

                    return [true, h[i], getHightestCard(copyHand)]
                }
            }
        }
        return [false, 0]
    }
    const isStraightFlush = (hand) => {
        let copyHand = [...hand]
        let h = copyHand.map(card => cardRanking(card))
        let flushArray
        if (isFlush(copyHand)[0]) {
            flushArray = isFlush(copyHand).slice(1, 6)
            if (flushArray[0] - flushArray[4] === 4) {
                return [true, flushArray[0]]
            }
        }
        return [false, 0]
    }
    const cardRanking = (card) => {
        card = card.slice(0, -1)
        if (!isNaN(card)) {
            return parseInt(card)
        } else {
            if (card === 'J') {
                return 11
            } else if (card === 'Q') {
                return 12
            } else if (card === 'K') {
                return 13
            } else if (card === 'A') {
                return 14
            }
        }
    }
    const getHightestCard = (hand) => {
        let copyHand = [...hand]
        copyHand = copyHand.filter(element => element !== null)
        return bubbleSort(copyHand.map(card => cardRanking(card)))[0]
    }
    const bubbleSort = (lst) => {
        let a
        for (let i = 0; i < lst.length; i ++) {
            for (let j = 0; j < (lst.length - i - 1); j ++) {
                if (lst[j] < lst[j + 1]) {
                    a = lst[j + 1]
                    lst[j + 1] = lst[j]
                    lst[j] = a
                }
            }
        }
        return lst
    }
    return {
        searchWinner,
        handRanking,
        getPlayerWinRate,
        getAllInWinRate,
        genRandomCase,
    }
}