export class Scene {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.status = undefined
    }

    body() {
        throw new Error("Must be implemented in descendant class")
    }

    start() {
        if (this.status == 0) return false
        this.status = 1
        this.body()
    }

    stop() {
        this.status = 0
    }

    getId()  {
        return this.id
    }

    getName() {
        return this.name
    }

}