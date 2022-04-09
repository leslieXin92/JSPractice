/**
    思路：
    
    1.定义一个checkedArr数组，用来保存被选中的种类，长度为选中checkbox的数量，
    当checkbox被选中时，把该类扔进checkedArr数组里，也确保密码中至少含有一个该种类
    
    2.定义一个passwordTypeArr数组，用来生成密码构成的种类，初始长度为checkedArr.length，
    若passwordTypeArr.length < len，就随机从checkedArr中选取一个元素扔进passwordTypeArr中，最终长度为len
    
    3.定义一个passwordArr数组，用来保存最终的密码，将passwordTypeArr数组每一项数据化
    
*/


// 获取元素
const bigBoxEl = document.querySelector('.bigBox')
const screenEl = document.querySelector('.screen')
const lenEl = document.querySelector('.len')

const optionsEl = document.querySelector('.options')
const rollerEl = document.querySelector('.roller')
const coverEl = document.querySelector('.cover')

const rollerInfo = rollerEl.getBoundingClientRect()
const rollerLeft = rollerInfo.left
const rollerWidth = rollerInfo.width

const checkBoxCollection = document.querySelector('input')
const checkBoxList = Array.from(checkBoxCollection)

let checkedArr = []
let len = 4
const minLen = 4
const maxLen = 16

const typeMap = {
    'number': createNumber,
    'upperCase': createUpperCase,
    'lowerCase': createLowerCase,
    'symbol': createSymbol
}

// 进度条点击
rollerEl.addEventListener('click', handleClickRoller)

function handleClickRoller (e) {
    const move = e.clientX - rollerLeft
    coverEl.style.width = `${move}px`

    const scale = move / rollerWidth
    len = minLen + Math.round((maxLen - minLen) * scale)
    lenEl.textContent = len
}

// 进度条拖动
rollerEl.addEventListener('mousedown', handleDragRoller)

function handleDragRoller () {
    document.onmousemove = function (e) {
        let move = e.clientX - rollerLeft
        move = move < 0 ? 0 : (move > rollerEl.offsetWidth ? rollerEl.offsetWidth : move)
        coverEl.style.width = `${move}px`

        const scale = move / rollerWidth
        len = minLen + Math.round((maxLen - minLen) * scale)
        lenEl.textContent = len

        document.onmouseup = function () {
            document.onmousemove = null
        }
    }
}

// // 点击复选框
// bigBoxEl.addEventListener('click', function (e) {
//     const el = e.target
//     console.log(el);
//     console.log(!el.matches('input[type=checkbox]'))
//     if (!el.matches('input[type=checkbox]')) return
//     handleChangeType(el)
// })

// // function handleClickBox (e) {
// //     const el = e.target
// //     console.log(el)
// //     if (!el.matches('input[type=checkbox]')) return
// //     handleChangeType(el)
// // }

// function handleChangeType () {
//     const checkedList = checkBoxList.filter(item => item.checked)
//     checkedArr = checkedList.map(item => item.dataset.type)
//     console.log(checkedArr)
//     createPassword()
// }
//! 绑定筛选框点击事件
bigBoxEl.addEventListener('click', function (e) {
    let el = e.target;
    if (!el.matches('input[type=checkbox]')) {
        return;
    }
    typeChangeHandler(el);
})

//! 定义筛选框点击事件
function typeChangeHandler () {
    let checkedList = checkBoxList.filter((input) => input.checked);
    checkedArr = checkedList.map((input) => input.dataset.type);
    console.log(checkedArr)
    createPassword();
}

/**
    checkedArr保存被选中的种类，也确保密码中至少含有一个被选中的种类，长度为0-4
    passwordTypeArr保存构成密码的种类，长度=len;
    passwordArr保存最终的密码，将passwordTypeArr数据化，长度=len;
 */

// 生成密码
function createPassword () {
    const buttonEl = document.querySelector('button')
    buttonEl.addEventListener('click', handleClickButton)
}

// 点击呀呼按钮
function handleClickButton () {
    const textareaEl = document.querySelector('textarea')
    let passwordTypeArr = checkedArr.slice()

    while (passwordTypeArr.length < len) {
        const temp = randNum(0, checkedArr.length - 1)
        passwordTypeArr.push(checkedArr[temp])
    }

    let passwordArr = passwordTypeArr.map(item => typeMap[item])
    textareaEl.textContent = passwordArr.join('')
}

// 取随机数
function randNum (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 创建数字
function createNumber () {
    const temp = parseInt(Math.random() * 9)
    return temp
}

// 创建大写字母
function createUpperCase () {
    const charCode = parseInt(65 + parseInt(Math.random() * 25))
    const temp = String.fromCharCode(charCode)
    return temp
}

// 创建小写字母
function createLowerCase () {
    const charCode = parseInt(97 + parseInt(Math.random() * 25))
    const temp = String.fromCharCode(charCode)
    return temp
}

// 创建符号
function createSymbol () {
    // const warehouse = '~!@#$%^&*()-_=+[{]};:'"
}
