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
        window.addEventListener("click", () => {
            if (document.querySelector("grid") !== null)
                document.querySelector("grid").style.display = "none"
        })

    }

    render(...elements) {
        this.app.innerHTML = null
        for (var element of elements) {
            this.app.append(element.getElement())
        }
    }

    rerender(element) {
        let el = element.getElement()
        if (!el.hasAttribute("id")) {
            throw new Error("Can't remove element without id")
        }
        let existed_element = this.app.querySelector("#" + el.id)
        let parent = existed_element.parentNode
        l(parent.insertBefore(el, existed_element))
        throw new Error()
        existed_element.remove()
    }
}