import { l } from "./helpers.js"

var instance = null

export default class Config {
    constructor() {
        if (!instance) {
            instance = this
            this.config_promise = this._get_configs()
        }
        return instance
    }

    _get_configs() {
        return fetch('../config.php').
        then(response => response.json())
    }

    get(name) {
        return this.config_promise.then(data => data[name])
    }

    get_all() {
        return this.config_promise
    }

    get_names() {

    }
}