export class Queue {
    constructor() {
        this.queue = Array()
    }

    add(scene) {
        this.queue.push(scene)
    }

    remove(id) {
        this.queue.forEach((scene, index) => {
            if(scene.getId == id) {
                this.queue.splice(index, 1)
                return true
            }
        })
        throw new Error("Scene with ID: " + id + " not found")
    }

    run() {
        this.queue.forEach((scene) => {
            scene.start()
        })
    }
}