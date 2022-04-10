class Game {
    constructor(className, ballList) {
        className = className || 'containerLeft' || 'containerRight'
        this.el = document.querySelector(className)
        this.width = this.el.clientWidth
        this.height = this.el.clientHeight
        this.ballList = ballList || []
        this.timer = null
        this.createBalls()
        this.start()
    }

    createBalls () {
        for (let i = 0; i < 3; i++) {
            const num = randNumber(40, 60)
            const attr = {
                width: num,
                height: num,
                speedX: randNumber(-3, 5),
                speedY: randNumber(-3, 5),
                top: randNumber(0, 400),
                left: randNumber(0, 400),
                color: `rgb(${randNumber(0, 255)}, ${randNumber(0, 255)}, ${randNumber(0, 255)}`
            }
            const ball = new Ball(attr)
            this.ballList.push(ball)
        }
        this.ballList.map(item => {
            const el = item.createBall()
            this.el.append(el)
        })
    }

    start () {
        this.timer = setInterval(() => {
            this.ballList.map(item => {
                item.move(this.width, this.height)
            })
            for (let i = 0; i < this.ballList.length - 1; i++) {
                for (let j = 0; j < this.ballList.length; j++) {
                    this.crashDetection(this.ballList[i], this.ballList[j])
                }
            }
        }, 1000 / 60)
    }

    crashDetection (ball1, ball2) {
        const ball1X = ball1.left + ball1.width / 2
        const ball1Y = ball1.top + ball1.height / 2
        const ball2X = ball2.left + ball2.width / 2
        const ball2Y = ball2.top + ball2.height / 2

        if ((ball1X - ball2X) ** 2 + (ball1Y - ball2Y) ** 2 <= (ball1.width / 2 + ball2.width / 2) ** 2) {
            ball1.reverseX()
            ball1.reverseY()
            ball2.reverseX()
            ball2.reverseY()
        }
    }

    end () {
        clearInterval(this.timer)
        this.timer = null
    }
}

class Ball {
    constructor(obj = {}) {
        this.width = obj.width || 50
        this.height = obj.height || 50
        this.speedX = obj.speedX || 3
        this.speedY = obj.speedY || 3
        this.top = obj.top || 0
        this.left = obj.left || 0
        this.color = obj.color || 'black'
        this.el = null
    }

    createBall () {
        const divEl = document.createElement('div')
        divEl.className = 'ball'
        divEl.style.width = `${this.width}px`
        divEl.style.height = `${this.height}px`
        divEl.style.top = `${this.top}px`
        divEl.style.left = `${this.left}px`
        divEl.style.backgroundColor = `${this.color}`
        this.el = divEl
        return divEl
    }

    move (width, height) {
        this.top += this.speedY
        this.left += this.speedX
        this.crashDetection(width, height)
        this.el.style.top = `${this.top}px`
        this.el.style.left = `${this.left}px`
    }

    reverseX () {
        this.speedX = -this.speedX
    }

    reverseY () {
        this.speedY = -this.speedY
    }

    crashDetection (width, height) {
        const left = this.left
        const top = this.top

        if (left < 0) {
            this.left = 0
            this.reverseX()
        }

        if (left > width - this.width) {
            this.left = width - this.width
            this.reverseX()
        }

        if (top < 0) {
            this.top = 0
            this.reverseY()
        }
        if (top > height - this.height) {
            this.top = height - this.height
            this.reverseY()
        }
    }
}

function randNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const left = new Game('.containerLeft')
const right = new Game('.containerRight')
