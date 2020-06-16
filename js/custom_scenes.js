import Scene from './scene.js'
import { CreateElement } from './element.js'
import { l, render, randomInteger } from './helpers.js'


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
        cd_rerender(countdown, 3)
    }
}

export class CustScene3 extends Scene {
    body() {
        l("Third")
        let game_count = new CreateElement("game_count")
        game_count.addClass("game-countdown").addClass("countdown-digits")
        let game = new CreateElement("GAME")
        game.addClass("middle").block()
        const create_random_input = () => {
            let input = new CreateElement("input")
            input.value(randomInteger(1, 9))
            game.addElement(input.toHTML())
        }
        for (let i = 0; i < 4; i++)
            create_random_input()
        render(game_count, game)
    }
}