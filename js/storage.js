import { l } from "./helpers.js"

var instance = null

export default class Storage{
    constructor(){
        if(!instance) {
            instance = this
        }
        this.storage = {}
        return instance
    }

    add(data) {
        this.storage[data["name"]] = data["data"]
    }

    get(name) {
        return this.storage[name]
    }

    get_all() {
        return this.storage
    }
}