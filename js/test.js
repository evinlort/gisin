import { l } from './helpers.js'

l("TEST")

function aa(numb) {
    var a = Array()

    for (var i = 0; i < numb; i++) {
        a.push(i)
    }
    return a
}

function pp(...arr) {
    l(arr)
    l(typeof arr)
    if (arr.length == 1 && Array.isArray(arr)) {
        arr = arr[0]
    }
    for (var ar of arr) {
        l(ar)
    }
}

pp(1,2,3)
pp(aa(3))
pp(aa(3), aa(4))