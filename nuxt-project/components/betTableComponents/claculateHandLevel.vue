<template>

</template>

<script>

export default {
    setup() {
        const BetTableFunctions = betTableFunctions()
        const BetTableData = betTableData()
        return {
            BetTableData,
            BetTableFunctions
        }
    },
    data () {
        return {
            cards: null,
            communityCards: null,
            hands: null,
            hand1: null,
            hand2: null,
            hand3: null,
            hand4: null,
            count: 0
        }
    },
    mounted() {
        watch(() => this.BetTableData.lstOfHand, (newval, oldval) => {
            if (this.BetTableData.lstOfHand.length === (this.BetTableData.numberOfPlayer + this.BetTableData.numberOfAllinPlayer)) {
                if ((this.BetTableData.numberOfPlayer + this.BetTableData.numberOfAllinPlayer) > 1) {
                    this.BetTableData.winner = this.searchWinner(this.handRanking(this.BetTableData.lstOfHand))
                }
            }
        }, { deep: true })
    },
    methods: {
        searchWinner(winnerHands) {
            let winners = []
            for (let i = 0; i < winnerHands.length; i ++) {
                for (let j = 0; j < 6; j ++) {
                    if (winnerHands[i][0] === this.BetTableData.cards[2 * j]) {
                        winners.push(j)
                    }
                }
            }
            return winners
        },
        handRanking(hands) {
            let copyHands = [...hands]
            copyHands = this.sortHands(copyHands)
            let winner = [copyHands[0]]
            for (let i = 0; i < copyHands.length - 1; i ++) {
                if (this.isHand1GreaterHand2([copyHands[i], copyHands[i + 1]]) === '=') {
                    winner.push(copyHands[i + 1])
                } else {
                    return winner
                }
            }
            return winner
        },
        sortHands(hands) {
            let copyHands = [...hands]
            let a
            for (let i = 0; i < copyHands.length; i ++) {
                for (let j = 0; j < (copyHands.length - i - 1); j ++) {
                    if (!this.isHand1GreaterHand2([copyHands[j], copyHands[j + 1]])) {
                        a = copyHands[j + 1]
                        copyHands[j + 1] = copyHands[j]
                        copyHands[j] = a
                    }
                }
            }
            return copyHands
        },
        isAllHandEqual(hands) {
            let copyHands = [...hands]
            for(let i = 0; i < copyHands.length - 1; i ++) {
                for (let j = i + 1; j < copyHands.length; j ++) {
                    if (this.isHand1GreaterHand2([copyHands[i], copyHands[j]]) !== '=') {
                        return false
                    }
                }
            }
            return true
        },
        isHand1GreaterHand2(hands) {
            let copyHand1 = [...hands[0]]
            let copyHand2 = [...hands[1]]
            let handLevel1 = this.getHightestLevel(copyHand1)[0]
            let handLevel2 = this.getHightestLevel(copyHand2)[0]
            let d1 = this.getHightestLevel(copyHand1)[1]
            let d2 = this.getHightestLevel(copyHand2)[1]
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
        },
        getHightestLevel(hand) {
            let copyHand = [...hand]
            let h = this.bubbleSort(copyHand.map(card => this.cardRanking(card)))
            let levelPoint
            let d
            if (this.isStraightFlush(copyHand)[0]) {
                levelPoint = 8
                d = this.isStraightFlush(copyHand)
            } else if (this.isFourOfAKind(copyHand)[0]) {
                levelPoint = 7
                d = this.isFourOfAKind(copyHand)
            } else if (this.isFullHouse(copyHand)[0]) {
                levelPoint = 6
                d = this.isFullHouse(copyHand)
            } else if (this.isFlush(copyHand)[0]) {
                levelPoint = 5
                d = this.isFlush(copyHand)
            } else if (this.isStraight(copyHand)[0]) {
                levelPoint = 4
                d = this.isStraight(copyHand)
            } else if (this.isThreeOfAKind(copyHand)[0]) {
                levelPoint = 3
                d = this.isThreeOfAKind(copyHand)
            } else if (this.isTwoPair(copyHand)[0]) {
                levelPoint = 2
                d = this.isTwoPair(copyHand)
            } else if (this.isOnePair(copyHand)[0]) {
                levelPoint = 1
                d = this.isOnePair(copyHand)
            } else{
                levelPoint = 0
                d = [h[0], h[1], h[2], h[3], h[4]]
            }
            return [levelPoint, d]
        },
        isOnePair(hand) {
            let copyHand = [...hand]
            let h = copyHand.map(card => this.cardRanking(card))
            let pairPoint
            for (let i = 0; i < copyHand.length - 1; i ++) {
                for (let j = i + 1; j < copyHand.length; j ++) {
                    if (h[i] === h[j]) {
                        pairPoint = h[i]
                        h[i] = 0
                        h[j] = 0
                        h = this.bubbleSort(h)
                        return [true, pairPoint, h[0], h[1], h[2]]
                    }
                }
            }
            return [false, 0, 0]
        },
        isTwoPair(hand) {
            let copyHand = [...hand]
            let h = copyHand.map(card => this.cardRanking(card))
            let d = this.isOnePair(copyHand)
            let pairLst = [d[1]]
            if (d[0]) {
                for (let i = 0; i < copyHand.length; i ++) {
                    if (h[i] === d[1]) {
                        copyHand[i] = null
                    }
                }
                copyHand = copyHand.filter(element => element !== null)
                let d2 = this.isOnePair(copyHand)
                if (d2[0]) {
                    pairLst.push(d2[1])
                    for (let j in copyHand) {
                        if (this.cardRanking(copyHand[j]) === d2[1]) {
                            copyHand[j] = null
                        }
                    }
                    copyHand = copyHand.filter(element => element !== null)
                    if (this.isOnePair(copyHand)[0]) {
                        let d3 = this.isOnePair(copyHand)
                        pairLst.push(this.isOnePair(copyHand)[1])
                        for (let j in copyHand) {
                            if (this.cardRanking(copyHand[j]) === d3[1]) {
                                copyHand[j] = null
                            }
                        }
                        copyHand = copyHand.filter(element => element !== null)
                    }
                    pairLst = this.bubbleSort(pairLst)
                    let kickerCard = this.getHightestCard(copyHand)
                    if (pairLst.length === 3) {
                        if (pairLst[2] > this.cardRanking(copyHand[0])) {
                            kickerCard = pairLst[2]
                        } else {
                            kickerCard = this.cardRanking(copyHand[0])
                        }
                    }
                    return [true, pairLst[0], pairLst[1], kickerCard]
                }
            }
            return [false, 0, 0]
        },
        isThreeOfAKind(hand) {
            let copyHand = [...hand]
            let h = copyHand.map(card => this.cardRanking(card))
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
                        h = this.bubbleSort(h)
                        return [true, threeOfAKindPoint, h[0], h[1]]
                    }
                }
            }
            return [false, 0, 0]
        },
        isStraight(hand) {
            let copyHand = [...hand]
            let lstSorted =  [...new Set(this.bubbleSort(copyHand.map(card => this.cardRanking(card))))]
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
        },
        isFlush(hand) {
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
                        let h = this.bubbleSort(copyHand.map(card => this.cardRanking(card)))
                        return [true, h[0], h[1], h[2], h[3], h[4]]
                    }
                }
            }
            return [false, 0]
        },
        isFullHouse(hand) {
            let copyHand = [...hand]
            let h = copyHand.map(card => this.cardRanking(card))
            let threeOfAKindPoint
            if (this.isThreeOfAKind(copyHand)[0]) {
                threeOfAKindPoint = this.isThreeOfAKind(copyHand)[1]
                copyHand = copyHand.filter(element => this.cardRanking(element) !== threeOfAKindPoint)
                if (this.isOnePair(copyHand)[0]) {
                    return [true, threeOfAKindPoint, this.isOnePair(copyHand)[1]]
                }
            }
            return [false, 0]
        },
        isFourOfAKind(hand) {
            let copyHand = [...hand]
            let h = copyHand.map(card => this.cardRanking(card))
            let count
            for (let i = 0; i < copyHand.length; i ++) {
                count = 0
                for (let j = 0; j < copyHand.length; j ++) {
                    if (h[i] === h[j]) {
                        count ++
                    }
                    if (count === 4) {
                        copyHand = copyHand.filter(element => this.cardRanking(element) !== h[i])

                        return [true, h[i], this.getHightestCard(copyHand)]
                    }
                }
            }
            return [false, 0]
        },
        isStraightFlush(hand) {
            let copyHand = [...hand]
            let h = copyHand.map(card => this.cardRanking(card))
            let flushArray
            if (this.isFlush(copyHand)[0]) {
                flushArray = this.isFlush(copyHand).slice(1, 6)
                if (flushArray[0] - flushArray[4] === 4) {
                    return [true, flushArray[0]]
                }
            }
            return [false, 0]
        },
        cardRanking(card) {
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
        },
        getHightestCard(hand) {
            let copyHand = [...hand]
            copyHand = copyHand.filter(element => element !== null)
            return this.bubbleSort(copyHand.map(card => this.cardRanking(card)))[0]
        },
        bubbleSort(lst) {
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
    },
}
</script>