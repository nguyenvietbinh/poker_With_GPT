<template>

<div class="h-[2.5vw] md:h-[2vh] w-[94%] rounded-full border-solid border-white border-[0.2vh] absolute left-[50%] translate-x-[-50%] bottom-0">
    <div :style="{ width: this.process + '%'}" class="processBar h-full bg-white rounded-l-full absolute left-0"></div>
    <p v-if="this.process >= 5" class="text-black whitespace-nowrap text-[2vw] md:text-[1.5vh] font-semibold absolute top-[50%] translate-y-[-50%] left-[2%]">{{ this.process }}%</p>
</div>
</template>


<script>
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import { state } from '~/store/data/dataStore';
export default {
    setup() {
        const { convertCards } = useMyBettbFunc()
        const { replaceAt } = useMyBettbFunc()
        return {
            convertCards,
            replaceAt,
            state
        }
    },
    data() {
        return {
            process: 0,
            count: 0,
            processBar: null,
            imgToLoad: ['/img/cards/back.png', '/img/avt4.png', '/img/mute.png', '/img/unmute.png'],
        }
    }, 
    mounted() {
        this.processBar = document.querySelector('.processBar')
        this.getImgToLoad()
        watch(() => this.process, (newval, oldval) => {
            if (this.process === 100) {
                this.processBar.style.borderRadius = '9999px'
            } else {
                this.processBar.style.borderTopRightRadius = '0px'
                this.processBar.style.borderBottomRightRadius = '0px'
                this.processBar.style.borderTopLeftRadius = '9999px';
                this.processBar.style.borderBottomLeftRadius = '9999px';
            }
        })
        Promise.all(this.imgToLoad.map(this.loadingImg))
        .then(() => {
            state.loadingDone = true
        })
        .catch((error) => {
            console.error('Lỗi khi tải ảnh:', error);
            alert('Có lỗi xảy ra khi tải ảnh. Vui lòng thử lại.');
        });
    },
    methods: {
        getImgToLoad() {
            let c = []
            for (let i = 0; i < 52; i ++) {
                c.push(i)
            }
            let cards = this.convertCards(c)
            for (let i = 0; i < 52; i ++) {
                this.imgToLoad.push(this.convertToUrl(cards[i]))
            }
        },
        convertToUrl(cardNumber) {
            let src = 'XX@3x.png'
            if (cardNumber[cardNumber.length - 1] === '♥') {
                src = this.replaceAt(src, 1, 'H')
            } else if (cardNumber[cardNumber.length - 1]=== '♦') {
                src = this.replaceAt(src, 1, 'D')
            } else if (cardNumber[cardNumber.length - 1] === '♣') {
                src = this.replaceAt(src, 1, 'C')
            } else {
                src = this.replaceAt(src, 1, 'S')
            }
            let n = cardNumber.slice(0, -1)
            if (n === '10') {
                n = 'T'
            }
            src = this.replaceAt(src, 0, n)
            src = '/img/cards/' + src 
            return src
        },
        loadingImg(url) {
            return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this.count++;
                this.process = Math.floor((this.count / this.imgToLoad.length) * 100)
                resolve();
            };
            img.onerror = reject;
        });

        }
    }
}

</script>