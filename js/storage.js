import { l } from "./helpers.js"

var instance = null

export default class Storage {
    constructor() {
        if (!instance) {
            instance = this
        }
        this.storage = {}
        return instance
    }

    add(data) {
        if (!(data["name"] in this.storage)) {
            this.storage[data["name"]] = Array()
        }
        this.storage[data["name"]].push(data["data"])
    }

    get(name) {
        return this.storage[name]
    }

    get_all() {
        return this.storage
    }
}