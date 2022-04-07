// 获取元素
const navEl = document.querySelector('nav')
const tipEl = document.querySelector('.tip')
const liCollection = document.querySelectorAll('li')

// 定义导航栏和返回顶部是否显示
window.onscroll = function () {
    const topDistance = document.documentElement.scrollTop
    topDistance < 180 ? navEl.style.display = 'none' : navEl.style.display = 'block'
    topDistance < 180 ? tipEl.style.display = 'none' : tipEl.style.display = 'block'

    for (let i = 0; i < liCollection.length; i++) {
        if (topDistance >= 180 + i * 520 && topDistance < 180 + (i + 1) * 520) {
            liCollection[i].style.background = 'skyblue'
        } else {
            liCollection[i].style.background = 'crimson'
        }
    }
}

// 定义点击nav定向滚动
for (let i = 0; i < liCollection.length; i++) {
    liCollection[i].onclick = function () {
        window.scrollTo({
            top: 180 + 520 * i,
            behavior: 'smooth'
        })
    }
}

// 返回顶部
tipEl.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}