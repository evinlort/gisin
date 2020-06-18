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
        let game = new CreateElement("GAME")
        let game_count = new CreateElement("game_count")
        let grid = this.build_digits_grid()
        game.addClass("middle").block()
        game_count.addClass("game-countdown").addClass("countdown-digits").setID("gamecount")
        let get_digit_div = new CreateElement("get_digit_div").block()
        for (let i = 0; i < 4; i++)
            get_digit_div.addElement(this.create_get_input(grid, i))

        for (let i = 0; i < 4; i++)
            game.addElement(this.create_random_input())
        game.addElement(get_digit_div)
        renderer.render(game, game_count, grid)
        this.cd_rerender(game_count, 5)
    }

    create_random_input() {
        let input = new CreateElement("input")
        input.value(randomInteger(1, 9)).addClass("show-4-digits")
        return input
    }

    create_get_input(grid, i) {
        let input = new CreateElement("input")
        input.addClass("get-4-digits").value(i)
        input.click(() => {
            l(input.getElement().value)
            grid.getElement().style.display = 'block'
        })
        return input
    }

    cd_rerender(gc, i) {
        gc.text(i);

        setTimeout(() => {
            if (--i)
                this.cd_rerender(gc, i)
            else
                this.stop()
        }, 1000)
    }

    build_digits_grid() {
        let numb = 1
        let grid = new CreateElement("grid")
        for (var i = 0; i < 3; i++) {
            let row = new CreateElement("row")
            row.addClass("grid-row")
            for (var j = 0; j < 3; j++) {
                let digit = new CreateElement("digit").text(numb++).addClass("grid-digit")
                digit.click((e) => {
                    e.target.parentElement.parentElement.style.display = 'none'
                })
                row.addElement(digit)
            }
            grid.addElement(row)
        }
        grid.addClass("grid")
        return grid
    }
}