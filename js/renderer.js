import { l } from "./helpers.js"

export default class Renderer {
    constructor(app_element) {
        if (app_element === undefined) {
            if (!(this.app = document.getElementById("app")))
                throw new Error("No default start ID is found")
        }
        else
            this.app = document.getElementById(app_element)
        this.app.innerHTML = null
    }

    render(...elements) {
        l("in render start")
        l(this.app)
        this.app.innerHTML = null
        l(this.app)
        for (var element of elements) {
            l(element)
            this.app.append(element.getElement())
        }
        l("in render end")
        l(this.app)
    }

    rerender(element) {
        l("in rerender")
        l(this.app)
        let el = element.getElement()
        if(!el.hasAttribute("id")) {
            throw new Error("Can't remove element without id")
        }
        let existed_element = this.app.querySelector("#"+el.id)
        l(existed_element)
        let parent = existed_element.parentNode
        l(parent)
        l(parent.insertBefore(el, existed_element))
        throw new Error()
        existed_element.remove()
    }
}