import { create, l } from './helpers.js'

export class CreateElement {
    constructor(name) {
        this.el = create(name)
    }

    text(text) {
        this.el.textContent = text
        return this
    }

    html(html) {
        this.el.innerHTML = html
        return this
    }

    listener(event, callback) {
        this.el.addEventListener(event, callback)
        return this
    }

    click(callback) {
        return this.listener("click", callback)
    }

    addClass(class_name) {
        this.el.classList.add(class_name)
        return this
    }

    setID(id) {
        this.setAttr("id", id)
        return this
    }

    block() {
        this.el.style = "display: block;"
        return this
    }

    addElement(element) {
        this.el.append(element.getElement())
        return this
    }

    removeElement(element) {
        return this
    }

    setAttr(name, value) {
        this.el.setAttribute(name, value)
        return this
    }

    value(val) {
        this.el.value = val
        return this
    }

    getElement() {
        return this.el
    }
}