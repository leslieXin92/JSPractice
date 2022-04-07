// 定义商品数组
const goodsList = [{
    goodsName: 'JavaScript',
    goodsNum: '3',
    goodsImg: './image/JS.png',
    goodsPrice: '500'
}, {
    goodsName: 'TypeScript',
    goodsNum: '1',
    goodsImg: './image/TS.png',
    goodsPrice: '200'
}, {
    goodsName: 'Vue',
    goodsNum: '2',
    goodsImg: './image/Vue.png',
    goodsPrice: '200'
}, {
    goodsName: 'React',
    goodsNum: '1',
    goodsImg: './image/React.png',
    goodsPrice: '200'
}, {
    goodsName: 'Angular',
    goodsNum: '1',
    goodsImg: './image/Angular.png',
    goodsPrice: '200'
}, {
    goodsName: 'webpack',
    goodsNum: '1',
    goodsImg: './image/webpack.png',
    goodsPrice: '100'
}, {
    goodsName: 'Vite',
    goodsNum: '1',
    goodsImg: './image/Vite.png',
    goodsPrice: '100'
}]

// 商品操作

// 渲染商品
const ulEl = document.querySelector('ul')

goodsList.map((item) => {
    const goodsEl = createGoods(item)
    ulEl.append(goodsEl)
})

function createGoods (goods) {
    const liEl = document.createElement('li')
    liEl.innerHTML = `
            <div class="checkBox">
                <input type="checkbox" />
            </div>
            <div class="pic">
                <img src="${goods.goodsImg}" />
            </div>
            <div class="goodsName"> ${goods.goodsName} </div>
            <div class="numberBox">
                <div class="decrement"> - </div>
                <div>
                    <input type="text" class="goodsNum" value="${goods.goodsNum}" />
                </div>
                <div class="increment"> + </div>
            </div>
            <div class="unitPrice"> ${goods.goodsPrice} </div>
            <div class="totalPrice"> ${goods.goodsPrice * goods.goodsNum} </div>
            <div class="delete"> 删除 </div>
        `
    return liEl
}

// 【全选】被勾选，【所有的item】自动被勾选
const checkboxList = document.querySelectorAll('input[type=checkbox]')

checkboxList[0].onclick = function () {
    if (this.checked) {
        for (let i = 1; i < checkboxList.length; i++) {
            checkboxList[i].checked = 'checked'
        }
    } else {
        for (let i = 1; i < checkboxList.length; i++) {
            checkboxList[i].checked = ''
        }
    }
    showOptionsInfo()
}

// 【所有的item】都被勾选，【全选】自动被选勾选
for (let i = 1; i < checkboxList.length; i++) {
    checkboxList[i].onclick = function () {
        if (checkboxList[1].checked === true &&
            checkboxList[2].checked === true &&
            checkboxList[3].checked === true &&
            checkboxList[4].checked === true &&
            checkboxList[5].checked === true &&
            checkboxList[6].checked === true &&
            checkboxList[7].checked === true) {
            checkboxList[0].checked = 'checked'
        } else {
            checkboxList[0].checked = ''
        }
        showOptionsInfo()
    }
}

// 点击加
const unitPriceCollection = document.querySelectorAll('.unitPrice')
const totalPriceCollection = document.querySelectorAll('.totalPrice')
const goodsSumCollection = document.querySelectorAll('.goodsNum')
const incrementCollection = document.querySelectorAll('.increment')

for (let i = 0; i < incrementCollection.length; i++) {
    incrementCollection[i].onclick = function () {
        const curGoodsNum = goodsSumCollection[i].value - 0
        const newGoodsNum = curGoodsNum + 1
        goodsSumCollection[i].value = newGoodsNum
        totalPriceCollection[i].textContent = newGoodsNum * unitPriceCollection[i].textContent
        showOptionsInfo()
    }
}

// 点击减
const decrementCollection = document.querySelectorAll('.decrement')

for (let i = 0; i < decrementCollection.length; i++) {
    decrementCollection[i].onclick = function () {
        const curGoodsNum = goodsSumCollection[i].value - 0
        const newGoodsNum = curGoodsNum - 1 < 0 ? 0 : curGoodsNum - 1
        goodsSumCollection[i].value = newGoodsNum
        totalPriceCollection[i].textContent = newGoodsNum * unitPriceCollection[i].textContent
        showOptionsInfo()
    }
}

// 删除
const deleteCollection = document.querySelectorAll('.delete')

for (let i = 0; i < deleteCollection.length; i++) {
    deleteCollection[i].onclick = function (e) {
        const ancestorEl = e.target.closest('li')
        ancestorEl.remove()
        showOptionsInfo()
    }
}


// 底部操作

// 删除选中商品
const delChooseEl = document.querySelector('.delChoose')

delChooseEl.onclick = function () {
    for (let i = 1; i < checkboxList.length; i++) {
        if (checkboxList[i].checked === true) {
            checkboxList[i].parentElement.parentElement.remove()
        }
    }
    showOptionsInfo()
}

// 清空购物车
const delAllEl = document.querySelector('.delAll')

delAllEl.onclick = function () {
    for (let i = 1; i < checkboxList.length; i++) {
        checkboxList[i].parentElement.parentElement.remove()
    }
    showOptionsInfo()
}

// 底部数据展示（物品数量 + 总价）
function showOptionsInfo () {
    const payEl = document.querySelector('.pay')
    const goodsSumEl = document.querySelector('.goodsSum')
    const curCheckboxList = document.querySelectorAll('input[type=checkbox]')
    const curGoodsSumCollection = document.querySelectorAll('.goodsNum')
    const curUnitPriceCollection = document.querySelectorAll('.unitPrice')

    let pay = 0
    let selected = 0

    for (let i = 1; i < curCheckboxList.length; i++) {
        if (curCheckboxList[i].checked) {
            selected += 1
            pay += curGoodsSumCollection[i - 1].value * curUnitPriceCollection[i - 1].textContent
        }
    }

    payEl.textContent = pay
    goodsSumEl.textContent = selected
}
