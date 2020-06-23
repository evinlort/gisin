import { l } from "./helpers.js"

export class Queue {
    constructor() {
        this.queue = Array()
    }

    is_empty() {
        return this.queue.length
    }

    add(...scenes) {
        var i = 0
        for (var scene of scenes) {
            if (scene === undefined)
                continue
            if (this.queue.indexOf(scene) === 0) {
                scene.setId(i++)
                this.queue.push(scene)
            }
            else {
                scene.setId(i++)
                this.queue.push(this.clone(scene))
            }
        }
    }

    clone(obj) {
        return Object.create(
            Object.getPrototypeOf(obj),
            Object.getOwnPropertyDescriptors(obj)
        )
    }

    remove(id) {
        this.queue.forEach((scene, index) => {
            if (scene.getId() == id) {
                this.queue.splice(index, 1)
                return true
            }
        })
    }

    run(callback=null) {
        (function sceneLoop(i, that) {
            setTimeout(function () {
                if (that.queue[i].getStatus() === -1) {
                    that.queue[i].start()
                }
                if (that.queue[i].getStatus() !== 0) {
                    sceneLoop(i, that)
                }
                else {
                    i++
                    if (i < that.queue.length) {
                        sceneLoop(i, that)
                    }
                    else {
                        if(callback)
                            callback()
                    }
                }
            }, 50)
        })(0, this)
    }
}