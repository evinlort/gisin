const development = false
// const development = true
const l = (...message) => {
    if (development)
        console.log(...message)
}

const getById = id => document.getElementById(id)
const getByClass = class_name => document.getElementsByClassName(class_name)
const create = name => document.createElement(name)

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const app_div = getById("app")

const render = (...elements) => {
    app_div.innerHTML = null
    for (var elem of elements) {
        app_div.append(elem.toHTML())
    }
}

export { l, getById, getByClass, create, render, randomInteger }