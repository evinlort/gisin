import { l } from "./helpers.js"

export default class Scene {
    constructor(name) {
        this.id = null
        this.name = null
        this.status = -1
    }

    setId(id) {
        this.id = id
    }

    setName(name) {
        this.name = name
    }

    body() {
        throw new Error("Must be implemented in descendant class")
    }

    start() {
        if (this.status === 0) return false
        this.status = 1
        this.body()

    }

    stop() {
        this.status = 0
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getStatus() {
        return this.status
    }
}