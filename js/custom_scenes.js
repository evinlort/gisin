import Scene from './scene.js'
import Storage from './storage.js'
import Renderer from './renderer.js'
import Calculator from './calculator.js'
import { Queue } from './queue.js'
import { CreateElement } from './element.js'
import { l, render, randomInteger } from './helpers.js'

var renderer = new Renderer("app")

export class CustScene1 extends Scene {
    body() {
        let button = new CreateElement("button")
        button.text("Start").addClass("btn").addClass("btn-primary").addClass("middle")
        button.click(() => this.stop())
        renderer.render(button)
    }
}

export class CustScene2 extends Scene {
    constructor() {
        super()
    }

    body() {
        let countdown = new CreateElement("countdown")
        countdown.addClass("countdown-digits").addClass("middle")
        const cd_rerender = (e, i) => {
            e.text(i);
            renderer.render(e)
            setTimeout(() => {
                if (--i)
                    cd_rerender(e, i)
                else {
                    this.stop()
                }
            }, 1000)
        }
        this.config.then(data => {
            cd_rerender(countdown, data["wait_before_start"])
        })
    }
}


export class CustScene3 extends Scene {
    constructor() {
        super()
        this.number_of_repeats = 5
        this.number_of_digits = 4
    }

    body() {
        this.config.then(conf => {
            var queue = new Queue()
            var show_get = this.get_show_get(conf["number_of_repeats"])
            queue.add(show_get)
            queue.run(
                () => this.stop()
            )
        })
    }

    get_show_get(numb) {
        var sg_array = Array()
        var char_numb = 65
        sg_array.push(new ShowDigits(String.fromCharCode(char_numb)))
        for (var i = 2; i <= numb; i++) {
            sg_array.push(new ShowDigits(String.fromCharCode(char_numb + i - 1)))
            sg_array.push(new GetDigits(String.fromCharCode(char_numb + i - 2)))
        }
        sg_array.push(new GetDigits(String.fromCharCode(char_numb + i - 2)))
        return sg_array
    }

    create_random_input() {
        let input = new CreateElement("input")
        input.value(randomInteger(1, 9)).addClass("show-4-digits")
        return input
    }

    create_get_input(grid, i) {
        let input = new CreateElement("input")
        input.setAttr("id", "getInp-" + i).addClass("get-4-digits").value("").setAttr("onfocus", "this.blur();")
        input.click((e) => {
            e.stopPropagation()
            grid.setAttr("data-input_id", i)
            CreateElement.getSiblings(input).forEach(elem => {
                elem.classList.remove("selected-input")
            })
            input.addClass("selected-input")
        })
        if (i == 0) {
            input.addClass("selected-input")
            input.getElement().dispatchEvent(new Event("click"))
        }
        return input
    }

    cd_rerender(gc, i, callback = null) {
        gc.text(i);

        setTimeout(() => {
            if (--i > 0)
                this.cd_rerender(gc, i, callback)
            else {
                if (callback) {
                    if (callback())
                        this.stop()
                }
                else
                    this.stop()
            }
        }, 1000)
    }

    build_digits_grid() {
        let numb = 1
        let grid = new CreateElement("grid")
        for (var j = 0; j < 9; j++) {
            let digit = new CreateElement("digit").text(numb++).addClass("grid-digit")
            digit.click((e) => {
                let inp = document.getElementById("getInp-" + e.target.parentElement.dataset.input_id)
                inp.value = digit.getElement().textContent
                if (inp.nextSibling != null)
                    inp.nextSibling.dispatchEvent(new Event("click"))
                else
                    inp.parentNode.firstChild.dispatchEvent(new Event("click"))

            })
            grid.addElement(digit)
        }
        grid.addClass("grid")
        return grid
    }
}

export class CustSceneEnd extends Scene {
    constructor() {
        super()
        this.storage = new Storage()
        this.calculator = new Calculator(this.storage)
    }

    body() {
        let end = new CreateElement("end")
        // let end_message = new CreateElement("span")
        end.addClass("middle-top-width").block()
        let result = new CreateElement("result")
        result.html(this.calculator.get_result())
        end.addElement(result)
        renderer.render(end)
        this.stop()
    }
}

class ShowDigits extends CustScene3 {
    constructor(numb) {
        super()
        this.numb = numb
        this.wait_to_show = 3
        this.storage = new Storage()
    }

    body() {
        let game = new CreateElement("GAME")
        let h1 = new CreateElement("h1")
        let game_count = new CreateElement("game_count")
        game.addClass("middle-width").block()
        h1.text(this.numb)
        game_count.addClass("game-countdown").addClass("countdown-digits").setID("gamecount")
        game.addElement(h1)
        var digits_to_store = Array()
        this.config.then(conf => {
            for (let i = 0; i < conf["number_of_digits"]; i++) {
                let input = this.create_random_input()
                digits_to_store.push(parseInt(input.getElement().value))
                game.addElement(input)
            }
        })
        this.storage.add({ "name": "show", "data": { [this.numb]: digits_to_store } })
        renderer.render(game, game_count)
        this.config.then(conf => {
            this.cd_rerender(game_count, conf["wait_to_show"])
        })
    }
}

class GetDigits extends CustScene3 {
    constructor(numb) {
        super()
        this.numb = numb
        this.wait_for_get = 5
        this.storage = new Storage()
    }

    body() {
        let game = new CreateElement("GAME")
        let h1 = new CreateElement("h1")
        let game_count = new CreateElement("game_count")
        let grid = this.build_digits_grid()
        game.addClass("middle-width").block()
        h1.text(this.numb)
        game_count.addClass("game-countdown").addClass("countdown-digits").setID("gamecount")
        game.addElement(h1)
        let get_digit_div = new CreateElement("get_digit_div").block()
        this.config.then(conf => {
            for (let i = 0; i < conf["number_of_digits"]; i++)
                get_digit_div.addElement(this.create_get_input(grid, i))
        })
        game.addElement(get_digit_div)
        game.addElement(grid)
        renderer.render(game, game_count)
        this.config.then(conf => {
        this.cd_rerender(game_count, conf["wait_for_get"], () => {
            var digits_to_store = this.get_get_digits(get_digit_div)
            this.storage.add({ "name": "get", "data": { [this.numb]: digits_to_store } })
            return true
        })
    })
    }

    get_get_digits(get_digit_div) {
        var digits = Array()
        get_digit_div.getElement().childNodes.forEach(node => {
            let val = parseInt(node.value)
            digits.push(val ? val : 0)
        })
        return digits
    }
}
