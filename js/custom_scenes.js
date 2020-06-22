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
    body() {
        var queue = new Queue()
        var sub1 = new Sub1Scene3()
        var sub2 = new Sub2Scene3()
        queue.add(sub1, sub2)
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
        input.setAttr("id", "getInp-"+i).addClass("get-4-digits").value("").setAttr("onfocus", "this.blur();")
        input.click((e) => {
            grid.setAttr("data-input_id", i)
            grid.getElement().style.display = 'block'
        })
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
        for (var i = 0; i < 3; i++) {
            let row = new CreateElement("row")
            row.addClass("grid-row")
            for (var j = 0; j < 3; j++) {
                let digit = new CreateElement("digit").text(numb++).addClass("grid-digit")
                digit.click((e) => {
                    let inp = document.getElementById("getInp-"+e.target.parentElement.parentElement.dataset.input_id)
                    l(digit)
                    inp.value = digit.getElement().textContent
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

export class CustSceneEnd extends Scene{
    body() {
        let end = new CreateElement("end")
        end.text("The End").addClass("middle")
        renderer.render(end)
        this.stop()
    }
}

class Sub1Scene3 extends CustScene3 {
    body() {
        let game = new CreateElement("GAME")
        let game_count = new CreateElement("game_count")
        game.addClass("middle").block()
        game_count.addClass("game-countdown").addClass("countdown-digits").setID("gamecount")
        for (let i = 0; i < 4; i++)
            game.addElement(this.create_random_input())
        renderer.render(game, game_count)
        this.cd_rerender(game_count, 0)
    }
}

class Sub2Scene3 extends CustScene3 {
    body() {
        let game = new CreateElement("GAME")
        let game_count = new CreateElement("game_count")
        let grid = this.build_digits_grid()
        game.addClass("middle").block()
        game_count.addClass("game-countdown").addClass("countdown-digits").setID("gamecount")
        let get_digit_div = new CreateElement("get_digit_div").block()
        for (let i = 0; i < 4; i++)
            get_digit_div.addElement(this.create_get_input(grid, i))
        game.addElement(get_digit_div)
        renderer.render(game, game_count, grid)
        // this.cd_rerender(game_count, 5)
    }
}
