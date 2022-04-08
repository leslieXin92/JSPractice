// 获取元素
const bigBoxEl = document.querySelector('.bigBox')
const imgBoxEl = document.querySelector('.imgBox')
const dotBoxEl = document.querySelector('.dotBox')
const toLeftEl = document.querySelector('.toLeft')
const toRightEl = document.querySelector('.toRight')

let index = 0
const len = imgBoxEl.children.length

// 自动轮播
let autoChangeTimer = setInterval(() => {
    return turnRight()
}, 3000)

// 绑定点击向左向右事件
toLeftEl.onclick = turnLeft
toRightEl.onclick = turnRight

// 定义向左事件
function turnLeft (e) {
    clear()
    e.preventDefault()
    if (index === 0) {
        imgBoxEl.children[len - 1].classList.add('show')
        dotBoxEl.children[len - 1].classList.add('active')
        index = len - 1
    } else {
        imgBoxEl.children[index - 1].classList.add('show')
        dotBoxEl.children[index - 1].classList.add('active')
        index--
    }
    autoChangeTimer = setInterval(() => {
        return turnRight()
    }, 3000)
}

// 定义向右事件
function turnRight () {
    clear()
    if (index === 3) {
        imgBoxEl.children[0].classList.add('show')
        dotBoxEl.children[0].classList.add('active')
        index = 0
    } else {
        imgBoxEl.children[index + 1].classList.add('show')
        dotBoxEl.children[index + 1].classList.add('active')
        index++
    }
    autoChangeTimer = setInterval(() => {
        return turnRight()
    }, 3000)
}

// dot点击事件
for (let i = 0; i < len; i++) {
    dotBoxEl.children[i].onclick = function () {
        clear()
        imgBoxEl.children[i].classList.add('show')
        dotBoxEl.children[i].classList.add('active')
        index = i
        autoChangeTimer = setInterval(() => {
            return turnRight()
        }, 3000)
    }
}

// 清除定时器
function clear () {
    if (autoChangeTimer) {
        clearInterval(autoChangeTimer)
    }
    for (let i = 0; i < len; i++) {
        if (imgBoxEl.children[i].classList.contains('show')) {
            imgBoxEl.children[i].classList.remove('show')
        }
        if (dotBoxEl.children[i].classList.contains('active')) {
            dotBoxEl.children[i].classList.remove('active')
        }
    }
}