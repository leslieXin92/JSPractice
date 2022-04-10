const game = {
    el: '', //父元素
    level: 0, // 游戏难度
    maxLevel: 3, // 最高难度
    blocks: 0, // 
    gameBoxWidth: 600, // 游戏区域宽度
    gameBoxHeight: 600, // 游戏区域高度
    totalCardList: [], // 所有的牌
    judgeCardList: [], // 被翻转的牌
    turned: 0, // 被翻转的牌的数
    totalCardNum: 8, // 牌的总数

    // 初始化
    init: function (options) {
        this.initData(options)
        this.render()
        this.handle()
    },

    // 初始化牌
    initData: function (options) {
        this.options = options
        this.el = options.el
        this.level = options.level > this.maxLevel ? this.maxLevel : options.level
        this.blocks = (this.level * 2) ** 2
        this.getTotalCardList()
    },

    // 获取所有牌
    getTotalCardList: function () {
        const randomCardList = this.getRandomCardList()
        const halfBlocks = this.blocks / 2
        let totalCardList = []

        for (let i = 0; i <= halfBlocks; i++) {
            const index = randomCardList[i]
            const info = {
                url: `./image/${index}.png`,
                id: index
            }
            totalCardList.push(info, info)
        }
        this.totalCardList = this.shuffle(totalCardList)
    },

    // 返回洗完的牌
    getRandomCardList: function () {
        const totalCardNum = this.totalCardNum
        let arr = []
        for (let i = 0; i < totalCardNum; i++) {
            arr.push(i + 1)
        }
        return this.shuffle(arr)
    },

    // 洗牌
    shuffle: function (arr) {
        return arr.sort(() => { return 0.5 - Math.random() })
    },

    // 渲染牌
    render: function () {
        const blocks = this.blocks
        const gameBoxHeight = this.gameBoxHeight
        const gameBoxWidth = this.gameBoxWidth
        const level = this.level

        const blocksWidth = gameBoxWidth / (level * 2)
        const blocksHeight = gameBoxHeight / (level * 2)
        const totalCardList = this.totalCardList

        for (let i = 0; i < blocks; i++) {
            const info = totalCardList[i]
            const blockEl = document.createElement('div')
            const cardEl = document.createElement('div')
            cardEl.style.background = `url(${info.url})`
            blockEl.style.width = `${blocksWidth}px`
            blockEl.style.height = `${blocksHeight}px`
            blockEl.cardId = info.id
            cardEl.setAttribute('class', 'card')
            blockEl.setAttribute('class', 'block')
            console.log(cardEl);
            console.log(blockEl);
            blockEl.appendChild(cardEl)
            this.el.appendChild(blockEl)
        }
    },

    // 监听父元素的点击事件 => 判断点击的牌是否已被点击过
    handle: function () {
        this.el.onclick = (e) => {
            const el = e.target
            const isBlock = el.classList.contains('block')
            if (isBlock) {
                this.handleBlock(el)
            }
        }
    },

    handleBlock: function (el) {
        const cardId = el.cardId
        console.log(cardId);
        let judgeCardList = this.judgeCardList;
        let judgeLength = judgeCardList.push({
            id: cardId,
            el: el
        })
        el.classList.add('on')
        if (judgeLength === 2) {
            this.judgeCard()
        }
        this.judgeWin()
    },

    // 判断被翻转的牌是否相同
    judgeCard: function () {
        const judgeCardList = this.judgeCardList;
        const isSameCard = judgeCardList[0].id === judgeCardList[1].id;
        if (isSameCard) {
            this.turned += 2
        } else {
            let cardEl1 = judgeCardList[0].el
            let cardEl2 = judgeCardList[1].el
            setTimeout(() => {
                cardEl1.classList.remove('on')
                cardEl2.classList.remove('on')
            }, 800)
        }
        judgeCardList.length = 0
    },

    judgeWin: function () {
        if (this.turned === this.blocks) {
            alert('呀呼')
        }
    }

}


game.init({
    el: document.getElementById('gameBox'),
    level: 1
})