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

    block() {
        this.el.style = "display: block;"
        return this
    }

    addElement(element) {
        if (element.hasOwnProperty("toHTML"))
            this.el.append(element.toHTML())
        else
            this.el.append(element)
        return this
    }

    value(val) {
        this.el.value = val
        return this
    }

    toHTML() {
        return this.el
    }
}