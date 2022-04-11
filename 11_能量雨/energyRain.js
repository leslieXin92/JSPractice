/**
    game：
        el: 游戏区域元素
        scoreEl: 显示分数的元素
        ballList: 当前页面小球
        timer: 定时器指针
        height: 游戏区域高度
        score: 当前获取的分数

        start
        创建小球
        end


    ball:
        left
        top
        speedY
        color
        el
        score: 当前小球的分数

        创建小球并渲染
        移动
        检测是否移出游戏区域
        移除
        绑定事件
        事件处理方法
 */

class Game {
    constructor(el, scoreEl, time) {
        this.el = el
        this.scoreEl = scoreEl

        this.width = this.el.clientWidth
        this.height = this.el.clientHeight

        this.ballList = []
        this.score = 0
        this.timer = null
        this.time = time || null
        this.scaleList = [{
            scale: 95,
            type: Ball
        }, {
            scale: 5,
            type: BoomBall
        }]
    }

    start () {
        const newCreateBall = throttle(this.createBall.bind(this), 1000)
        const t1 = Date.now()
        this.timer = setInterval(() => {
            newCreateBall()
            this.ballList.forEach(item => { item.move() })
            const t2 = Date.now()
            if (this.time && t2 - t1 > this.time * 1000) {
                this.end()
            }
        }, 1000 / 60)
    }

    end () {
        clearInterval(this.timer)
        this.el.innerHTML = ''
        this.ballList = []
    }

    createBall () {
        const chooseBall = this.chooseBall()
        const ball = new chooseBall(this)
        this.ballList.push(ball)
    }

    chooseBall () {
        const arr = this.scaleList.map(item => item.scale)
        const typeList = this.scaleList.map(item => item.type)
        const sum = arr.reduce((pre, cur) => pre + cur)
        const num = randNumber(0, sum)
        let index = 0
        let tempSum = 0
        for (let i = 0; i < arr.length; i++) {
            tempSum += arr[i]
            if (num <= tempSum) {
                index = i
                break
            }
        }
        return typeList[index]
    }

    // 移除球球
    removeBall (ball) {
        for (let i in this.ballList) {
            const item = this.ballList[i]
            if (item === ball) {
                this.ballList.splice(i, 1)
                break
            }
        }
    }

}

class Ball {
    constructor(game) {
        this.game = game
        this.width = 60
        this.height = 60

        this.top = 0
        this.left = randNumber(0, this.game.width - this.width)
        this.speedY = randNumber(3, 4)
        this.color = 'seagreen'
        this.score = randNumber(0, 9)
        this.el = null
        this.speedA = 0.00001

        this.render() // 创建小球并渲染
        this.bindEvent() // 绑定点击事件
    }

    // 创建小球并渲染
    render () {
        const ball = document.createElement('div')
        ball.className = 'ball'
        ball.style.left = `${this.left}px`
        ball.style.top = `${this.top}px`
        ball.style.backgroundColor = `${this.color}`
        ball.textContent = this.score

        this.game.el.append(ball)
        this.el = ball
    }

    // 移动小球一步
    move () {
        this.speedY += this.speedA
        this.top += this.speedY
        this.el.style.top = `${this.top}px`

        this.checkMoveOut()
    }

    // 检测是否移出游戏区域,如果移除，直接移除
    checkMoveOut () {
        if (this.top < -this.height) {
            this.remove()
        }
    }

    // 移除小球
    remove () {
        // 删除 ball 对应的元素
        this.el.remove()

        // 删除存放在 game 对象中的 ball 对象
        this.game.removeBall(this)
    }

    // 绑定事件
    bindEvent () {
        // 注意： 绑定事件时通常需要更改 this 指向
        this.el.onclick = this.clickHandel.bind(this)
    }

    // 点击事件处理方法
    clickHandel () {
        this.game.score += this.score
        this.game.scoreEl.textContent = this.game.score

        this.remove()
    }
}

class BoomBall extends Ball {
    constructor(game) {
        super(game)
    }

    render () {
        const ball = document.createElement('div')

        ball.className = 'ball'
        ball.style.left = `${this.left}px`
        ball.style.top = `${this.top}px`
        ball.style.backgroundColor = `red`
        ball.textContent = 'boom'

        this.game.el.append(ball)
        this.el = ball
    }

    clickHandel () {
        this.game.el.innerHTML = ''
        this.game.ballList.length = 0
    }
}

// 随机数
function randNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 节流
function throttle (fn, delay) {
    let timer
    return function () {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            clearTimeout(timer)
            timer = null
        }, delay)
    }
}

const gameEl = document.querySelector('.game .content')
const scoreEl = document.querySelector('.score')
const startBtn = document.querySelector('.start')

let game = new Game(gameEl, scoreEl)

startBtn.onclick = function () {
    game.start()
}
