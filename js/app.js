import { l, render, randomInteger } from './helpers.js'
import { CreateElement } from './element.js'

(() => {
    let button = new CreateElement("button")
    button.text("Start").addClass("btn").addClass("btn-primary").addClass("middle")

    let countdown = new CreateElement("countdown")
    let game_count = new CreateElement("game_count")
    game_count.addClass("game-countdown")
    let game = new CreateElement("GAME")
    const cd_rerender = (e, i) => {
        l(e, i)
        e.text(i);
        render(e)
        setTimeout(() => {
            if (--i)
                cd_rerender(e, i)
            else
                render(game_count, game)
        }, 1000)
    }
    game.addClass("middle").block()
        // game.addElement(game_count.toHTML())
    const create_random_input = () => {
        let input = new CreateElement("input")
        input.value(randomInteger(1, 9))
        game.addElement(input.toHTML())
    }

    countdown.addClass("countdown-digits").addClass("middle")

    button.click(() => cd_rerender(countdown, 2))
    for (let i = 0; i < 4; i++)
        create_random_input()

    render(button)
})()