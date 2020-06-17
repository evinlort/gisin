import Scene from './scene.js'
import Renderer from './renderer.js'
import { CreateElement } from './element.js'
import { l, render, rerender, randomInteger } from './helpers.js'

var renderer = new Renderer("app")
l(renderer)

export class CustScene1 extends Scene {
    body() {
        l("First")
        let button = new CreateElement("button")
        button.text("Start").addClass("btn").addClass("btn-primary").addClass("middle")
        button.click(() => this.stop())
        render(button)
    }
}

export class CustScene2 extends Scene {
    body() {
        l("Second")
        let countdown = new CreateElement("countdown")
        countdown.addClass("countdown-digits").addClass("middle")
        const cd_rerender = (e, i) => {
            l(e, i)
            e.text(i);
            render(e)
            setTimeout(() => {
                if (--i)
                    cd_rerender(e, i)
                else
                    this.stop()
            }, 1000)
        }
        cd_rerender(countdown, 1)
    }
}

export class CustScene3 extends Scene {
    body() {
        l("opa")
        l(renderer)
        let game = new CreateElement("GAME")
        let game_count = new CreateElement("game_count")
        game.addClass("middle").block()
        game_count.addClass("game-countdown").addClass("countdown-digits").setID("gamecount")
        const create_random_input = () => {
            let input = new CreateElement("input")
            input.value(randomInteger(1, 9)).addClass("show-4-digits")
            game.addElement(input)
        }
        const get_input = (i) => {
            let input = new CreateElement("input")
            input.addClass("get-4-digits").value(i)
            input.click(() => {
                l(input.getElement().value)
                game.addElement(this.build_digits_grid())
            })
            return input
        }
        let inner_div = new CreateElement("div")
        for (let i = 0; i < 4; i++)
            inner_div.addElement(get_input(i))

        for (let i = 0; i < 4; i++)
            create_random_input()
        game.addElement(inner_div)
        const cd_rerender = (gc, i) => {
            gc.text(i);

            setTimeout(() => {
                if (--i)
                    cd_rerender(gc, i)
                else
                    this.stop()
            }, 1000)
        }
        renderer.render(game, game_count)
        cd_rerender(game_count, 5)
    }

    build_digits_grid() {
        let numb = 1
        let grid = new CreateElement("grid")
        for (var i = 0; i < 3; i++) {
            let row = new CreateElement("row")
            row.addClass("row-digits")
            for (var j = 0; j < 3; j++) {
                let digit = new CreateElement("digit").text(numb++).addClass("digit")
                row.addElement(digit)
            }
            grid.addElement(row)
        }
        grid.addClass("middle").addClass("get-digits-grid")
        return grid
    }
}