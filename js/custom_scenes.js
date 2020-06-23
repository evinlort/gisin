import Scene from './scene.js'
import Renderer from './renderer.js'
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
    body() {
        l("Scene 2")
        let countdown = new CreateElement("countdown")
        countdown.addClass("countdown-digits").addClass("middle")
        const cd_rerender = (e, i) => {
            e.text(i);
            renderer.render(e)
            setTimeout(() => {
                l("-1 sec")
                if (--i)
                    cd_rerender(e, i)
                else {
                    l("STOP")
                    this.stop()
                }
            }, 1000)
        }
        cd_rerender(countdown, 1)
    }
}


export class CustScene3 extends Scene {
    dev = false
    body() {
        var queue = new Queue()
        // eval("evg = 12") // creates variable `evg` with value of 12
        var show, show2, show3, get, get2, get3
        if (!this.dev) {
            var show = new ShowDigits()
            var show2 = new ShowDigits()
            var get = new GetDigits()
            var show3 = new ShowDigits()
            var get2 = new GetDigits()
        }
        var get3 = new GetDigits()

        queue.add(show, show2, get, show3, get2, get3)
        queue.run(
            () => this.stop()
        )
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

    cd_rerender(gc, i) {
        gc.text(i);

        setTimeout(() => {
            if (--i > 0)
                this.cd_rerender(gc, i)
            else
                this.stop()
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
    body() {
        let end = new CreateElement("end")
        end.text("The End").addClass("middle")
        renderer.render(end)
        this.stop()
    }
}

class ShowDigits extends CustScene3 {
    body() {
        let game = new CreateElement("GAME")
        let game_count = new CreateElement("game_count")
        game.addClass("middle-width").block()
        game_count.addClass("game-countdown").addClass("countdown-digits").setID("gamecount")
        for (let i = 0; i < 4; i++)
            game.addElement(this.create_random_input())
        renderer.render(game, game_count)
        this.cd_rerender(game_count, 3)
    }
}

class GetDigits extends CustScene3 {
    body() {
        let game = new CreateElement("GAME")
        let game_count = new CreateElement("game_count")
        let grid = this.build_digits_grid()
        game.addClass("middle-width").block()
        game_count.addClass("game-countdown").addClass("countdown-digits").setID("gamecount")
        let get_digit_div = new CreateElement("get_digit_div").block()
        for (let i = 0; i < 4; i++)
            get_digit_div.addElement(this.create_get_input(grid, i))
        game.addElement(get_digit_div)
        game.addElement(grid)
        renderer.render(game, game_count)
        this.cd_rerender(game_count, 6)
    }
}
