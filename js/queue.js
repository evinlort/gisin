import { l } from "./helpers.js"

export class Queue {
    constructor() {
        this.queue = Array()
    }

    add(...scenes) {
        var i = 0
        for (var scene of scenes) {
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
            if (scene.getId == id) {
                this.queue.splice(index, 1)
                return true
            }
        })
        throw new Error("Scene with ID: " + id + " not found")
    }

    run() {
        (function sceneLoop(i, queue) {
            setTimeout(function () {
                if (queue[i].getStatus() === -1) {
                    queue[i].start()
                }
                if (queue[i].getStatus() !== 0) {
                    sceneLoop(i, queue)
                }
                else {
                    i++
                    if (i < queue.length) {
                        sceneLoop(i, queue)
                    }
                }
            }, 10)
        })(0, this.queue);
    }
}